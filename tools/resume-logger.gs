/**
 * Site + résumé tracking — Google Apps Script backend.
 *
 * Two tabs:
 *   Sessions — one row per visit to the site, upserted as the visit unfolds.
 *              Carries the journey (pages in order), where they came from,
 *              device, coarse location, and whether they reached the résumé.
 *   Opens    — one row per résumé open, with reading time.
 *
 * Everything is upsert-by-id rather than append-per-event, so a visit that
 * spans six pages is six cells changing on one row, not six rows to reconcile.
 *
 * Setup and redeploy steps are in the repo README under "Résumé tracking".
 */

var SESSIONS = 'Sessions';
var OPENS = 'Opens';

var SESSION_COLS = [
  'Started', 'Last seen', 'Source', 'Campaign', 'Landed on', 'Journey',
  'Pages', 'Seconds', 'Reached résumé', 'Résumé secs', 'Link',
  'Device', 'Browser', 'OS', 'Screen', 'Country', 'City', 'Org', 'IP',
  'Visit #', 'Returning', 'Visitor', 'Session',
];
var OPEN_COLS = [
  'Opened', 'Link', 'Seconds', 'Visit #', 'Returning', 'Downloaded',
  'Came from', 'Device', 'Country', 'Org', 'Visitor', 'Session',
];

/** Column indexes (1-based) used for in-place updates. */
var S = {
  lastSeen: 2, journey: 6, pages: 7, seconds: 8, reached: 9,
  resumeSecs: 10, link: 11, country: 16, city: 17, org: 18, ip: 19,
  id: 23,
};
var O = { seconds: 3, downloaded: 6, country: 9, org: 10, id: 12 };

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(25000);
  } catch (err) {
    return text('busy');
  }
  try {
    var d = JSON.parse(e.postData.contents);
    // A single beacon may carry several queued events — see the retry queue in
    // js/track.js. Anything that failed to send earlier arrives here later.
    var batch = d.batch || [d];
    for (var i = 0; i < batch.length; i++) handle_(batch[i]);
    return text('ok');
  } catch (err) {
    return text('error: ' + err);
  } finally {
    lock.releaseLock();
  }
}

function handle_(d) {
  if (!d || !d.session) return;
  if (d.event === 'resume_open' || d.event === 'resume_update') return resume_(d);
  return session_(d);
}

/* ------------------------------------------------------------------ */
/* Sessions                                                            */
/* ------------------------------------------------------------------ */
function session_(d) {
  var sh = tab_(SESSIONS, SESSION_COLS);
  var row = find_(sh, S.id, d.session);

  if (!row) {
    sh.appendRow([
      new Date(), new Date(),
      d.source || 'direct', d.campaign || '', d.landed || '', d.journey || '',
      d.pages || 1, d.seconds || 0, 'no', '', d.link || '',
      d.device || '', d.browser || '', d.os || '', d.screen || '',
      d.country || '', d.city || '', d.org || '', d.ip || '',
      d.visit || 1, d.returning ? 'yes' : 'no', d.visitor || '', d.session,
    ]);
    return;
  }

  sh.getRange(row, S.lastSeen).setValue(new Date());
  if (d.journey) sh.getRange(row, S.journey).setValue(d.journey);
  if (d.pages) sh.getRange(row, S.pages).setValue(d.pages);
  // Seconds is cumulative across the visit, so it only ever climbs.
  bump_(sh, row, S.seconds, d.seconds);
  if (d.link) sh.getRange(row, S.link).setValue(d.link);
  // Geo arrives asynchronously and may land after the first page view.
  ['country', 'city', 'org', 'ip'].forEach(function (k) {
    if (d[k] && !sh.getRange(row, S[k]).getValue()) sh.getRange(row, S[k]).setValue(d[k]);
  });
}

/* ------------------------------------------------------------------ */
/* Résumé opens                                                        */
/* ------------------------------------------------------------------ */
function resume_(d) {
  var sh = tab_(OPENS, OPEN_COLS);
  var row = find_(sh, O.id, d.session + '|' + (d.open || '1'));

  if (!row) {
    sh.appendRow([
      new Date(), d.link || 'direct', d.seconds || 0, d.visit || 1,
      d.returning ? 'yes' : 'no', 'no', d.source || 'direct',
      d.device || '', d.country || '', d.org || '',
      d.visitor || '', d.session + '|' + (d.open || '1'),
    ]);
  } else {
    bump_(sh, row, O.seconds, d.seconds);
    if (d.downloaded) sh.getRange(row, O.downloaded).setValue('yes');
    ['country', 'org'].forEach(function (k) {
      if (d[k] && !sh.getRange(row, O[k]).getValue()) sh.getRange(row, O[k]).setValue(d[k]);
    });
  }

  // Mirror the outcome onto the session row, so one view answers
  // "did this visit end at the résumé, and for how long".
  var ss = tab_(SESSIONS, SESSION_COLS);
  var srow = find_(ss, S.id, d.session);
  if (srow) {
    ss.getRange(srow, S.reached).setValue('yes');
    bump_(ss, srow, S.resumeSecs, d.seconds);
    if (d.link) ss.getRange(srow, S.link).setValue(d.link);
  }
}

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */
function bump_(sh, row, col, val) {
  if (typeof val !== 'number') return;
  var cur = Number(sh.getRange(row, col).getValue()) || 0;
  if (val > cur) sh.getRange(row, col).setValue(val);
}

function tab_(name, cols) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(cols);
    sh.getRange(1, 1, 1, cols.length).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

/** Search bottom-up: an active session is always near the end. */
function find_(sh, col, id) {
  if (!id) return null;
  var last = sh.getLastRow();
  if (last < 2) return null;
  var from = Math.max(2, last - 800);
  var ids = sh.getRange(from, col, last - from + 1, 1).getValues();
  for (var i = ids.length - 1; i >= 0; i--) {
    if (String(ids[i][0]) === String(id)) return from + i;
  }
  return null;
}

function text(t) {
  return ContentService.createTextOutput(t).setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Health check. Open the deployed URL in a browser: it reports which
 * spreadsheet it writes to and the most recent activity, so "nothing is being
 * logged" is answerable without opening the sheet.
 */
function doGet() {
  var out;
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      return text('NOT BOUND TO A SPREADSHEET\n\n' +
        'This script is a standalone project. Delete it, open your Sheet, and\n' +
        'use Extensions > Apps Script so the script belongs to the sheet.');
    }
    var se = tab_(SESSIONS, SESSION_COLS), op = tab_(OPENS, OPEN_COLS);
    var ns = Math.max(0, se.getLastRow() - 1), no = Math.max(0, op.getLastRow() - 1);
    out = 'ok\n\nspreadsheet : ' + ss.getName() +
          '\nsessions    : ' + ns + '\nrésumé opens: ' + no + '\n';
    if (ns > 0) {
      var from = Math.max(2, se.getLastRow() - 7);
      var rows = se.getRange(from, 1, se.getLastRow() - from + 1, 19).getValues();
      out += '\nrecent visits:\n';
      for (var i = rows.length - 1; i >= 0; i--) {
        var r = rows[i];
        out += '  ' + Utilities.formatDate(new Date(r[0]), Session.getScriptTimeZone(), 'dd MMM HH:mm') +
               '  ' + pad_(r[2], 22) + pad_(r[15] + (r[17] ? ' / ' + r[17] : ''), 30) +
               r[7] + 's  ' + r[6] + 'p' + (r[8] === 'yes' ? '  RESUME ' + r[9] + 's' : '') + '\n';
      }
    }
  } catch (err) {
    out = 'error: ' + err;
  }
  return text(out);
}

function pad_(v, n) {
  v = String(v == null ? '' : v);
  if (v.length > n - 1) v = v.slice(0, n - 2) + '…';
  while (v.length < n) v += ' ';
  return v;
}
