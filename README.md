# K&J Caribbean Market & Restaurant Website

**Address:** 7629 N 56th Street, Tampa FL 33617  
**Phone:** 813-443-0164  
**Languages:** English · Français · Kreyòl Ayisyen · Español

---

## Stack (100% Free)

| Layer | Tool | Cost |
|---|---|---|
| Hosting | GitHub Pages | Free |
| CDN + SSL | Cloudflare (free plan) | Free |
| Domain | Cloudflare Registrar | ~$10/yr |
| Contact form | Formspree (50/mo free) | Free |
| QR code | qrcode.js CDN | Free |

---

## Step-by-Step Deployment

### 1. Create GitHub Repository

1. Go to https://github.com/hilairejr16
2. Click **New** → Repository name: `kj-caribbean`
3. Set to **Public**, click **Create repository**
4. Upload all files from this folder to the repo

**Quick upload via Git (terminal):**
```bash
git init
git add .
git commit -m "Initial K&J Caribbean website"
git branch -M main
git remote add origin https://github.com/hilairejr16/kj-caribbean.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Source: **Deploy from a branch** → Branch: **main** → Folder: **/ (root)**
3. Click **Save**
4. Your site will be live at: `https://hilairejr16.github.io/kj-caribbean`

### 3. Buy a Domain (Cloudflare Registrar — cheapest option)

1. Log in to Cloudflare at https://dash.cloudflare.com (use hilaire16@gmail.com)
2. Go to **Domain Registration** → **Register Domains**
3. Search for `kjcaribbean.com` (or similar) — typically ~$9-11/yr
4. Purchase the domain

### 4. Connect Domain to GitHub Pages via Cloudflare

**In GitHub (repo Settings → Pages):**
1. Under "Custom domain" enter: `kjcaribbean.com`
2. Click **Save** — this creates a `CNAME` file in your repo

**In Cloudflare DNS (your domain → DNS → Records):**

Add these 4 A records (GitHub Pages IPs):
```
Type: A  Name: @  Content: 185.199.108.153  Proxy: ✅
Type: A  Name: @  Content: 185.199.109.153  Proxy: ✅
Type: A  Name: @  Content: 185.199.110.153  Proxy: ✅
Type: A  Name: @  Content: 185.199.111.153  Proxy: ✅
```

Add 1 CNAME record:
```
Type: CNAME  Name: www  Content: hilairejr16.github.io  Proxy: ✅
```

**In GitHub Pages settings:**
- Check **"Enforce HTTPS"** (available after DNS propagates ~10min)

### 5. Set Up Contact Form (Formspree — Free)

1. Sign up at https://formspree.io (free: 50 submissions/month)
2. Create a new form → copy your **Form ID** (looks like `xpzgkqbn`)
3. In `contact.html`, find this line:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID"
   ```
4. Replace `YOUR_FORM_ID` with your actual ID

### 6. Update Social Media Links

In all HTML files, find the social media links and update them:
```html
<!-- Replace # with your actual social media URLs -->
<a href="https://instagram.com/YOURHANDLE" ...>Instagram</a>
<a href="https://facebook.com/YOURPAGE" ...>Facebook</a>
<a href="https://twitter.com/YOURHANDLE" ...>Twitter</a>
```

### 7. Update QR Code URL

In `flyer.html`, find and update:
```javascript
const SITE_URL = 'https://kjcaribbean.com';
```
Replace with your actual domain once it's live.

---

## File Structure

```
kj-caribbean/
├── index.html          ← Homepage
├── menu.html           ← Full menu (4 tabs)
├── about.html          ← About + values
├── contact.html        ← Contact form + map
├── flyer.html          ← Printable advertising flyer
├── 404.html            ← Error page
├── CNAME               ← Custom domain config
├── css/
│   └── style.css       ← Complete stylesheet
├── js/
│   ├── i18n.js         ← All translations (EN/FR/HT/ES)
│   └── main.js         ← Navigation, forms, animations
└── logo/
    ├── logo.svg        ← Main logo (website)
    ├── logo-ig.svg     ← Instagram (1080×1080)
    ├── logo-fb.svg     ← Facebook (800×800)
    └── logo-twitter.svg ← Twitter/X (400×400)
```

---

## Monthly Maintenance Checklist

Claude will handle these tasks — just ping me monthly:

- [ ] Review and respond to any contact form submissions
- [ ] Update menu prices if changed
- [ ] Add/remove menu items as needed
- [ ] Update business hours if changed
- [ ] Check that Google Maps embed still works
- [ ] Verify contact form (Formspree) is still active
- [ ] Review any new social media handles to link
- [ ] Check site loads fast on mobile (Google PageSpeed)
- [ ] Renew domain ($10/yr via Cloudflare — auto-renew recommended)

---

## Adding Photos (When Ready)

To add real photos of the restaurant/food:
1. Create an `images/` folder
2. Upload compressed photos (JPG, max 200KB each)
3. Replace placeholder sections in HTML with `<img>` tags

---

## Languages

The language switcher is built-in. To add/edit translations:
- Open `js/i18n.js`
- Find the language object (`en`, `fr`, `ht`, `es`)
- Edit the text values

---

## Support

Your developer: Claude (claude.ai/code)  
GitHub: hilairejr16  
Cloudflare account: hilaire16@gmail.com
