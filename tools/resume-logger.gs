/**
 * Résumé open logger — Google Apps Script backend for /resume/.
 *
 * Paste this into a Google Sheet's Apps Script editor and deploy it as a web
 * app. The résumé viewer beacons here; you get one row per open.
 *
 * Design note: one row per *open*, not per event. The viewer sends a "view"
 * when the page loads, which creates the row, then updates the same row as the
 * reader keeps reading. So the Seconds column climbs while they are on the
 * page and settles when they leave. If the browser is killed before it can
 * send a close event, the last engagement milestone is already recorded — you
 * lose precision, never the row.
 *
 * Setup is in the repo README under "Résumé tracking".
 */

var SHEET_NAME = 'Opens';
var HEADERS = [
  'Opened', 'Link', 'Seconds', 'Visit #', 'Returning',
  'Downloaded', 'Came from', 'Device', 'Visitor', 'Session',
];

/** Health check — visiting the deployed URL in a browser should say "ok". */
function doGet() {
  return ContentService.createTextOutput('ok');
}

function doPost(e) {
  // Beacons can land at the same millisecond; without a lock two opens can
  // race and write over each other's row.
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (err) {
    return ContentService.createTextOutput('busy');
  }

  try {
    var d = JSON.parse(e.postData.contents);
    var sh = getSheet_();

    if (d.event === 'view') {
      sh.appendRow([
        new Date(),
        d.link || 'direct',
        0,
        d.visit || 1,
        d.returning ? 'yes' : 'no',
        'no',
        d.ref || 'direct',
        d.device || '',
        d.visitor || '',
        d.session || '',
      ]);
      return ContentService.createTextOutput('ok');
    }

    // Every later event updates the row this session already created.
    var row = findSession_(sh, d.session);
    if (!row) return ContentService.createTextOutput('no-row');

    if (typeof d.seconds === 'number') {
      var current = Number(sh.getRange(row, 3).getValue()) || 0;
      // Monotonic: a late-arriving beacon must not lower the count.
      if (d.seconds > current) sh.getRange(row, 3).setValue(d.seconds);
    }
    if (d.event === 'download') sh.getRange(row, 6).setValue('yes');

    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error');
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sh.setFrozenRows(1);
    sh.hideColumns(10); // session id is plumbing, not something to read
  }
  return sh;
}

/** Newest first — a session that just started is near the bottom. */
function findSession_(sh, session) {
  if (!session) return null;
  var last = sh.getLastRow();
  if (last < 2) return null;
  var from = Math.max(2, last - 500);
  var ids = sh.getRange(from, 10, last - from + 1, 1).getValues();
  for (var i = ids.length - 1; i >= 0; i--) {
    if (ids[i][0] === session) return from + i;
  }
  return null;
}
