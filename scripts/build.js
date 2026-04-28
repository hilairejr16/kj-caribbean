#!/usr/bin/env node
/**
 * K&J Caribbean — Build Script
 * Run after every change: node scripts/build.js
 *
 * What it does:
 *  1. Stamps a new ?v=TIMESTAMP on all CSS/JS <link>/<script> tags in HTML files
 *  2. Updates CACHE_NAME version in sw.js
 *  3. Reports file list & sizes
 */
'use strict';
const fs   = require('fs');
const path = require('path');

const VERSION = Date.now();
const SHORT_V = Math.floor(VERSION / 1000); // seconds-level, shorter string

/* ── HTML files to process ──────────────────────────────── */
const HTML_FILES = [
  'index.html',
  'menu.html',
  'about.html',
  'contact.html',
  'flyer.html',
  '404.html',
];

/* ── Bump ?v= on css/js hrefs & srcs ────────────────────── */
let updated = 0;
HTML_FILES.forEach(file => {
  if (!fs.existsSync(file)) return;
  let src = fs.readFileSync(file, 'utf8');
  const before = src;
  // replace existing ?v=xxxx OR add ?v=xxxx before closing quote
  src = src.replace(
    /(href|src)="((?:css|js|data)[^"]+?)(?:\?v=\d+)?"/g,
    (_, attr, url) => `${attr}="${url}?v=${VERSION}"`
  );
  if (src !== before) {
    fs.writeFileSync(file, src, 'utf8');
    updated++;
    console.log(`  ✓ ${file}`);
  }
});
console.log(`\nCache-busted ${updated} HTML file(s) — v=${VERSION}\n`);

/* ── Update sw.js CACHE_NAME ────────────────────────────── */
const SW = 'sw.js';
if (fs.existsSync(SW)) {
  let sw = fs.readFileSync(SW, 'utf8');
  sw = sw.replace(/const CACHE_NAME = 'kj-v[\d.]+';/, `const CACHE_NAME = 'kj-v${SHORT_V}';`);
  fs.writeFileSync(SW, sw, 'utf8');
  console.log(`  ✓ sw.js CACHE_NAME → kj-v${SHORT_V}`);
}

/* ── Report image assets ─────────────────────────────────── */
const mktDir = 'images/market';
if (fs.existsSync(mktDir)) {
  const imgs = fs.readdirSync(mktDir).filter(f => /\.(jpe?g|png|webp|gif|mp4|webm)$/i.test(f));
  console.log(`\n  Market gallery: ${imgs.length} media file(s) in ${mktDir}/`);
  imgs.forEach(f => {
    const size = (fs.statSync(path.join(mktDir, f)).size / 1024).toFixed(0);
    console.log(`    ${f}  (${size} KB)`);
  });
}

console.log('\nBuild complete ✓\n');
