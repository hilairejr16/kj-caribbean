# K&J Caribbean Market & Restaurant — Project Documentation

> Living document. Updated by Claude every session.  
> **Last updated:** April 28, 2026

---

## 1. Business Information

| Field | Value |
|---|---|
| Business Name | K&J Caribbean Market and Restaurant |
| Address | 7629 N 56th Street, Tampa FL 33617 |
| Phone | 813-443-0164 |
| Email (placeholder) | info@kjcaribbean.com |
| Hours | Mon–Sat 9AM–8PM · Sunday 10AM–6PM |
| Languages | English · Français · Kreyòl Ayisyen · Español |

---

## 2. Accounts & Keys

### GitHub
- **Account:** hilairejr16
- **Repo name:** `kj-caribbean`
- **Repo URL:** https://github.com/hilairejr16/kj-caribbean *(to be created)*
- **Pages URL:** https://hilairejr16.github.io/kj-caribbean *(after GitHub Pages enabled)*
- **Branch:** `main`

### Cloudflare
- **Account email:** hilaire16@gmail.com
- **Dashboard:** https://dash.cloudflare.com
- **Domain target:** `kjcaribbean.com` *(to be purchased via Cloudflare Registrar)*
- **Live URL (after setup):** https://kjcaribbean.com

### Formspree (Contact Form)
- **URL:** https://formspree.io
- **Plan:** Free (50 submissions/month)
- **Status:** ⚠️ NOT YET SET UP — needs account creation + form ID
- **Where to update:** `contact.html` line with `YOUR_FORM_ID`

### Social Media *(pending — links are # placeholders)*
- Instagram: *(not yet linked)*
- Facebook: *(not yet linked)*
- Twitter/X: *(not yet linked)*

---

## 3. Deployment Architecture

```
Local files (OneDrive/Desktop)
        │
        ▼ git push
GitHub repo: hilairejr16/kj-caribbean (branch: main)
        │
        ▼ GitHub Pages serves the files
https://hilairejr16.github.io/kj-caribbean
        │
        ▼ Cloudflare proxies with CDN + SSL
https://kjcaribbean.com  ← what visitors see
```

### How GitHub Pages Works
- Any file pushed to the `main` branch is automatically live within ~1 minute
- No build step needed — pure HTML/CSS/JS served directly
- HTTPS is enforced automatically by Cloudflare

### Cloudflare DNS Records Required
```
Type   Name   Content                  Proxied
A      @      185.199.108.153          ✅
A      @      185.199.109.153          ✅
A      @      185.199.110.153          ✅
A      @      185.199.111.153          ✅
CNAME  www    hilairejr16.github.io    ✅
```

---

## 4. Deployment Workflow (How Claude Pushes Changes Live)

Every time a change is made, Claude runs:

```bash
# 1. Stage changes
git add <specific-files>

# 2. Commit with descriptive message
git commit -m "Brief description of what changed"

# 3. Push to GitHub → auto-deploys via GitHub Pages
git push origin main
```

**Time from push → live:** ~30–60 seconds  
**To verify live:** visit https://kjcaribbean.com (or GitHub Pages URL)

### First-Time Remote Setup (one-time, done once)
```bash
git remote add origin https://github.com/hilairejr16/kj-caribbean.git
git branch -M main
git push -u origin main
```

---

## 5. File Structure & What Each File Does

```
kj-caribbean/
├── index.html          Homepage
│                       Sections: Hero, Features (Market/Restaurant/Catering),
│                       About preview, Menu tabs (4 categories), Location + Map, Footer
│
├── menu.html           Full menu page
│                       Tabs: Hot Food (8 items), Market (6 items),
│                       Drinks (6 items), Catering (4 items)
│
├── about.html          About page
│                       Sections: Story, Values (6), Languages (4), CTA
│
├── contact.html        Contact page
│                       Sections: Form (Formspree), Info card, Google Maps embed
│
├── flyer.html          Printable advertising flyer
│                       Features: QR code (via qrcode.js CDN), 4 language versions,
│                       Print button, auto-detects saved language preference
│
├── 404.html            Custom 404 error page
│
├── CNAME               Tells GitHub Pages to use kjcaribbean.com as the domain
│
├── css/
│   └── style.css       Single complete stylesheet
│                       Design tokens → Reset → Typography → Components →
│                       Navbar → Hero → Features → About → Menu → Location →
│                       Contact → Flyer → Footer → Animations → Responsive
│
├── js/
│   ├── i18n.js         Translation engine + all text in 4 languages
│   │                   Contains: translations object (en/fr/ht/es),
│   │                   t(key) function, applyTranslations(), setLang(),
│   │                   persists choice in localStorage('kj_lang')
│   │
│   └── main.js         All interactivity
│                       - Navbar scroll effect (.scrolled class)
│                       - Mobile hamburger menu toggle
│                       - Active nav link detection
│                       - Language dropdown open/close
│                       - Menu tabs (show/hide .menu-panel)
│                       - Scroll-to-top button
│                       - Scroll reveal animations (IntersectionObserver)
│                       - Contact form submit (Formspree async fetch)
│                       - Smooth anchor scrolling
│
└── logo/
    ├── logo.svg        Main brand logo (500×500 viewBox)
    │                   Circular badge, teal gradient, gold rings,
    │                   palm trees, waves, "K&J" text, arc text
    │
    ├── logo-ig.svg     Instagram profile (1080×1080 viewBox)
    ├── logo-fb.svg     Facebook profile (800×800 viewBox)
    └── logo-twitter.svg Twitter/X profile (400×400 viewBox)
```

---

## 6. Design System

### Color Palette
| Variable | Hex | Use |
|---|---|---|
| `--teal` | `#0A6E6E` | Primary brand color |
| `--teal-light` | `#0D9B9B` | Hover states |
| `--teal-dark` | `#074A4A` | Dark sections, headings |
| `--orange` | `#E05A1F` | CTA buttons, accents |
| `--orange-light` | `#F07848` | Button hover |
| `--gold` | `#D4A017` | Logo borders, highlights |
| `--gold-light` | `#E8C040` | Text on dark backgrounds |
| `--cream` | `#FFF5E6` | Page background |
| `--cream-dark` | `#F0E0C8` | Card backgrounds, borders |
| `--navy` | `#1C2951` | Footer background |
| `--text` | `#1A1A2E` | Body text |
| `--text-muted` | `#5A5A7A` | Secondary text |

### Typography (Google Fonts)
| Variable | Font | Use |
|---|---|---|
| `--font-head` | Playfair Display | All headings (h1–h4) |
| `--font-body` | Poppins | All body text, buttons |
| `--font-accent` | Dancing Script | Flyer tagline only |

### Breakpoints
| Width | Behavior |
|---|---|
| > 1024px | Full desktop layout |
| 769–1024px | Tablet: 2-column grids |
| ≤ 768px | Mobile: hamburger menu appears |
| ≤ 640px | Single column, stacked layouts |

---

## 7. Multilingual System

**Files:** `js/i18n.js`

### How It Works
1. Every text element has a `data-i18n="key"` attribute
2. On page load, `applyTranslations()` replaces innerHTML of all `[data-i18n]` elements
3. User's language choice saved in `localStorage('kj_lang')`
4. Persists across all pages and sessions

### Adding/Editing Translations
Open `js/i18n.js` → find the language object (`en`, `fr`, `ht`, `es`) → edit the value for the key.

### Adding a New Key
1. Add `data-i18n="my_new_key"` to the HTML element
2. Add `my_new_key: "text here"` to all 4 language objects in `i18n.js`

---

## 8. Menu Items (Current)

### Hot Food
| Item | EN Name | Price |
|---|---|---|
| hf1 | Griot | $12 |
| hf2 | Diri ak Pwa | $5 |
| hf3 | Bouillon | $10 |
| hf4 | Jerk Chicken | $12 |
| hf5 | Oxtail | $15 |
| hf6 | Curry Goat | $14 |
| hf7 | Fried Plantains | $4 |
| hf8 | Soup Joumou | $10 |

### Market Produce
Plantains, Malanga/Taro, Yuca, Breadfruit, Scotch Bonnet Peppers, Caribbean Spice Blends

### Drinks
Akasan, Jus Tamarin, Coconut Water, Tropical Sodas, Jus Corossol, Kremas

### Catering
Party Platters, Full Package, Custom Menu, Delivery Available

**To add/change menu items:** Edit the relevant `hf#`, `mk#`, `dr#`, `cat#` keys in `i18n.js` AND add the HTML card in `index.html` and `menu.html`.

---

## 9. Google Maps Embed

Used in `index.html` (location section) and `contact.html`:
```html
<iframe src="https://maps.google.com/maps?q=7629+N+56th+Street+Tampa+FL+33617&t=&z=15&ie=UTF8&iwloc=&output=embed" ...>
```
No API key required. Free, static embed.

---

## 10. QR Code (flyer.html)

**Library:** qrcode.js via CDN  
`https://cdn.jsdelivr.net/npm/qrcode@1.5.4/build/qrcode.min.js`

**Current URL encoded in QR:** `https://kjcaribbean.com`  
**To update:** Change `const SITE_URL = 'https://kjcaribbean.com';` in `flyer.html`

---

## 11. Contact Form Setup (Formspree)

1. Go to https://formspree.io → Sign Up (free)
2. Create new form → copy the Form ID (e.g. `xpzgkqbn`)
3. In `contact.html`, find:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
4. Replace `YOUR_FORM_ID` with your actual ID
5. Commit + push → live in 60 seconds

---

## 12. Changelog

### Session 1 — April 28, 2026
**Status:** Initial build complete, git initialized, first commit made. NOT yet pushed to GitHub (remote not yet created).

**Built:**
- All 5 HTML pages (index, menu, about, contact, flyer)
- Complete CSS design system
- i18n engine with full EN/FR/HT/ES translations
- Main JS (nav, tabs, form, scroll reveal, lang switcher)
- 4 SVG logos (web, IG, FB, Twitter)
- CNAME, 404, .gitignore, .gitattributes
- README.md (deployment guide)
- DOCS.md (this file)

**Pending before site is live:**
1. ⬜ Owner creates GitHub repo `kj-caribbean` at github.com/hilairejr16
2. ⬜ Run: `git remote add origin https://github.com/hilairejr16/kj-caribbean.git && git push -u origin main`
3. ⬜ Enable GitHub Pages in repo settings (Source: main branch)
4. ⬜ Purchase domain `kjcaribbean.com` via Cloudflare (hilaire16@gmail.com)
5. ⬜ Add DNS A-records + CNAME in Cloudflare dashboard
6. ⬜ Set up Formspree account + update form ID in contact.html
7. ⬜ Update social media links (IG/FB/Twitter) in all pages
8. ⬜ Update QR code URL in flyer.html once domain is live
9. ⬜ Add real photos of food/restaurant (currently no photos, design uses emojis + SVG)

---

*This document is maintained by Claude. Update the changelog every session.*
