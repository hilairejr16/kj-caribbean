#!/usr/bin/env node
/**
 * K&J Caribbean — Monthly Maintenance Checklist
 * Run: node scripts/maintain.js
 *
 * Checks:
 *  1. All HTML files exist and have content
 *  2. All images referenced in gallery.js exist on disk
 *  3. No placeholder strings left (YOUR_FORM_ID, href="#")
 *  4. Service worker CACHE_NAME is up to date
 *  5. Reports file sizes for any images > 500 KB (re-compress candidates)
 *  6. Prints a maintenance action checklist
 */
'use strict';
const fs   = require('fs');
const path = require('path');

let warnings = 0;
let passes   = 0;

function pass(msg)    { console.log(`  ✅ ${msg}`); passes++; }
function warn(msg)    { console.log(`  ⚠️  ${msg}`); warnings++; }
function section(msg) { console.log(`\n── ${msg} ─────────────────────────`); }

console.log('\n═══════════════════════════════════════════');
console.log('  K&J Caribbean — Monthly Maintenance Check');
console.log(`  ${new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}`);
console.log('═══════════════════════════════════════════');

/* ── 1. HTML files exist ──────────────────────────────── */
section('HTML Files');
const HTML = ['index.html','menu.html','about.html','contact.html','flyer.html','404.html'];
HTML.forEach(f => {
  if (!fs.existsSync(f)) return warn(`MISSING: ${f}`);
  const size = fs.statSync(f).size;
  if (size < 500) return warn(`Suspiciously small: ${f} (${size} bytes)`);
  pass(`${f} (${(size/1024).toFixed(0)} KB)`);
});

/* ── 2. Gallery images exist ──────────────────────────── */
section('Gallery Images');
// Strip block comments before scanning so commented-out future sections are ignored
const galleryData = fs.readFileSync('data/gallery.js','utf8').replace(/\/\*[\s\S]*?\*\//g,'');
const fileMatches = [...galleryData.matchAll(/file:\s*"([^"]+)"/g)];
fileMatches.forEach(m => {
  const imgPath = m[1];
  if (!fs.existsSync(imgPath)) return warn(`MISSING IMAGE: ${imgPath}`);
  const kb = (fs.statSync(imgPath).size / 1024).toFixed(0);
  if (kb > 500) warn(`Large image (${kb} KB) — consider re-compressing: ${imgPath}`);
  else pass(`${imgPath} (${kb} KB)`);
});

/* ── 3. Placeholder strings ───────────────────────────── */
section('Placeholder Check');
const placeholders = [
  { pattern: /YOUR_FORM_ID/, label: 'Formspree form ID not set' },
  { pattern: /href="#"/, label: 'Unresolved href="#" links' },
  { pattern: /kjcaribbeantampa/, label: 'Social media placeholders (update with real handles)' },
];
HTML.forEach(file => {
  if (!fs.existsSync(file)) return;
  const src = fs.readFileSync(file,'utf8');
  placeholders.forEach(({ pattern, label }) => {
    if (pattern.test(src)) warn(`${file}: ${label}`);
  });
});
if (warnings === 0) pass('No placeholder strings found');

/* ── 4. SW cache version ──────────────────────────────── */
section('Service Worker');
const sw = fs.readFileSync('sw.js','utf8');
const cacheMatch = sw.match(/CACHE_NAME = 'kj-v(\d+)'/);
if (!cacheMatch) {
  warn('Could not read CACHE_NAME from sw.js');
} else {
  const cacheTs = parseInt(cacheMatch[1]);
  const ageHours = (Date.now()/1000 - cacheTs) / 3600;
  if (ageHours > 24 * 35) warn(`SW cache is ${Math.floor(ageHours/24)} days old — run node scripts/build.js to refresh`);
  else pass(`CACHE_NAME: kj-v${cacheMatch[1]} (${Math.floor(ageHours/24)} days old)`);
}

/* ── 5. Large media files ─────────────────────────────── */
section('Media File Sizes');
const mediaDir = 'images/market';
if (fs.existsSync(mediaDir)) {
  fs.readdirSync(mediaDir)
    .filter(f => /\.(jpe?g|png|webp|mp4|webm)$/i.test(f))
    .forEach(f => {
      const kb = (fs.statSync(path.join(mediaDir,f)).size/1024).toFixed(0);
      if (kb > 500) warn(`${f} is ${kb} KB — consider re-compressing`);
      else pass(`${f} — ${kb} KB ✓`);
    });
}

/* ── 6. Summary + Action Checklist ───────────────────── */
console.log('\n═══════════════════════════════════════════');
console.log(`  Results: ${passes} passed, ${warnings} warning(s)`);
console.log('═══════════════════════════════════════════');

console.log(`
📋 MONTHLY MAINTENANCE CHECKLIST
─────────────────────────────────
□ Run this script: node scripts/maintain.js
□ Check Google Search Console for crawl errors
□ Test contact form (send a test message)
□ Verify phone number works: 813-443-4557
□ Update gallery photos if new inventory/dishes
□ Check that hours are still accurate
□ Test site on mobile (iPhone + Android)
□ Review Formspree inbox for missed messages
□ Check site speed: https://pagespeed.web.dev
□ Verify Google Maps listing is current
□ Update social media profile links if changed
□ Run build after any changes: node scripts/build.js
□ Commit & push all changes to GitHub

🔐 SECURITY CHECKLIST
──────────────────────
□ Cloudflare security headers set (see _headers file)
□ Cloudflare SSL mode: Full (strict)
□ Cloudflare Bot Fight Mode: ON
□ No sensitive data exposed in browser console
□ Formspree form receiving only real messages
□ Review any new GitHub Actions / Pages warnings
`);

if (warnings > 0) {
  console.log(`⚠️  Fix ${warnings} warning(s) above, then run: node scripts/build.js && git add -A && git commit -m "Monthly maintenance" && git push origin main\n`);
} else {
  console.log(`🎉 All checks passed! Site is healthy.\n`);
}
