// Shared support footer (Ko-fi link) added to every page of every release.
// The release script calls injectSupportFooter() for each route after copying its build output, so new
// games and materials get the link without changes in their own repositories. Markup only: the look comes
// from css/support-footer.css at the site root (no inline styles, so strict CSPs with style-src 'self' hold).
// Identical copies live in lernspiele.aufner.org and lernmaterial.aufner.org (scripts/support-footer.mjs).

import { gzipSync } from 'node:zlib';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export const SUPPORT_URL = 'https://ko-fi.com/prof_aufner';
export const SUPPORT_STYLESHEET = '/css/support-footer.css';
export const SUPPORT_LOGO = '/img/kofi_logo.svg'; // official Ko-fi logo (brand asset kit v2), unmodified
const MARKER = 'data-support-footer';
const SUPPORT_LOGO_TAG = `<img src="${SUPPORT_LOGO}" class="support-logo" width="80" height="22" alt="Prof. Aufner auf Ko-fi (externe Seite, öffnet in neuem Tab)">`;
const SITE_FOOTER = '<footer class="footer">';

const supportLine = `Kostenlos und ohne Werbung. Für Erwachsene, die das Projekt unterstützen möchten:
<a href="${SUPPORT_URL}" class="support-link" target="_blank" rel="noopener noreferrer">${SUPPORT_LOGO_TAG}</a>`;

/** Standalone band for pages without the shared site footer. */
export const supportFooterHtml = `<footer class="support-footer" ${MARKER}>
<p>${supportLine}</p>
</footer>`;

/** Extra line for pages that use the shared site shell footer (<footer class="footer">). */
export const supportLineHtml = `<p class="footer__text footer__support" ${MARKER}>
${supportLine}
</p>`;

const stylesheetTag = `<link rel="stylesheet" href="${SUPPORT_STYLESHEET}" ${MARKER}>`;

/**
 * Adds the support link to one HTML document: inside the shared site footer when the page has one,
 * otherwise as a band at the end of the body. Returns the document unchanged when it has no head and body
 * or already carries the link.
 */
export function addSupportFooter(html) {
    if (html.includes(MARKER)) return html;
    const lower = html.toLowerCase();
    const headEnd = lower.indexOf('</head>');
    const bodyEnd = lower.lastIndexOf('</body>');
    if (headEnd === -1 || bodyEnd === -1 || headEnd > bodyEnd) return html;
    const siteFooter = html.indexOf(SITE_FOOTER, headEnd);
    const siteFooterEnd = siteFooter === -1 ? -1 : lower.indexOf('</footer>', siteFooter);
    const [at, snippet] = siteFooterEnd !== -1 && siteFooterEnd < bodyEnd
        ? [siteFooterEnd, `    ${supportLineHtml}\n    `]
        : [bodyEnd, `${supportFooterHtml}\n`];
    return `${html.slice(0, headEnd)}${stylesheetTag}\n${html.slice(headEnd, at)}${snippet}${html.slice(at)}`;
}

/**
 * Adds the footer to the HTML pages directly inside routeDir (not nested folders, which hold vendored
 * demos and assets). A precompressed copy (page.html.gz) is rewritten so gzip_static serves the same page.
 * Returns the number of pages changed.
 */
export function injectSupportFooter(routeDir) {
    let changed = 0;
    for (const entry of readdirSync(routeDir, { withFileTypes: true })) {
        if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
        const path = join(routeDir, entry.name);
        const before = readFileSync(path, 'utf8');
        const after = addSupportFooter(before);
        if (after === before) continue;
        writeFileSync(path, after);
        if (existsSync(`${path}.gz`)) writeFileSync(`${path}.gz`, gzipSync(after, { level: 9 }));
        changed += 1;
    }
    return changed;
}

/** Throws when a route entry page lacks the footer, so a release can never ship without it. */
export function assertSupportFooter(pagePath) {
    const html = readFileSync(pagePath, 'utf8');
    if (!html.includes(MARKER) || !html.includes(SUPPORT_URL)) {
        throw new Error(`Support footer missing in ${pagePath}`);
    }
}
