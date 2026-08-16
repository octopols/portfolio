/**
 * Tailwind is compiled to a static stylesheet at build time.
 *
 * The site previously loaded the Play CDN (cdn.tailwindcss.com) from <head>,
 * which is 120KB gzipped of JavaScript that has to execute and generate the
 * stylesheet before anything paints. Tailwind documents that build as
 * development-only. Only these three pages use utilities; the article and
 * project pages are self-contained.
 */
module.exports = {
  content: ["./index.html", "./photography.html", "./writing/index.html"],
  theme: { extend: {} },
  plugins: [],
};
