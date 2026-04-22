# Green's Quant — GQ Analytics Website

> **Build Systems That Strengthen Your Business's Financial Health**

A fully static website (HTML · CSS · JavaScript) hosted on **Netlify**, with contact forms handled natively by Netlify Forms — no PHP or server required.

---

## Project Structure

```
gq-analytics/
├── index.html              ← Full website (single page)
├── netlify.toml            ← Netlify build config + headers
├── .gitignore
├── README.md
└── assets/
    ├── css/
    │   └── style.css       ← All styles
    ├── js/
    │   └── main.js         ← Slideshow, animations, form AJAX
    └── images/
        └── logo.png        ← ⬅ PUT YOUR LOGO HERE
```

---

## 1. Add Your Logo

1. Save your logo file as **`logo.png`** (or `.jpg` / `.svg`)
2. Place it at **`assets/images/logo.png`**
3. The navbar and footer will automatically display it.
   - If the file is missing, a "GQ" text fallback is shown — nothing breaks.

> **Tip:** A square or near-square logo works best (e.g. 200×200 px). PNG with a transparent background looks cleanest on both light and dark nav states.

If your logo file has a different name or extension, update these two lines in `index.html`:

```html
<link rel="icon" type="image/png" href="assets/images/YOUR-LOGO.png">
...
<img src="assets/images/YOUR-LOGO.png" alt="GQ Analytics Logo" ...>
```

---

## 2. Push to GitHub (CMD)

Run these commands in your project folder one by one:

```bash
# Step 1 — Initialize a git repo (only needed the first time)
git init

# Step 2 — Stage all files
git add .

# Step 3 — First commit
git commit -m "Initial commit: GQ Analytics static site"

# Step 4 — Create the repo on GitHub first at https://github.com/new
#           Then connect it (replace URL with yours):
git remote add origin https://github.com/YOUR-USERNAME/gq-analytics.git

# Step 5 — Push
git push -u origin main
```

> If your default branch is called `master` instead of `main`, use `git push -u origin master`.

**For future updates** (after editing files):

```bash
git add .
git commit -m "Update: describe what you changed"
git push
```

---

## 3. Deploy to Netlify

### Option A — Connect GitHub (recommended, enables auto-deploy)

1. Go to **[netlify.com](https://netlify.com)** and log in (or sign up free)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** → authorize → select your **gq-analytics** repo
4. Build settings — leave all blank (no build command needed):
   - Build command: *(empty)*
   - Publish directory: `.`
5. Click **"Deploy site"**
6. Netlify will give you a URL like `https://gq-analytics.netlify.app`

Every time you `git push`, Netlify auto-deploys. ✅

### Option B — Drag and drop (quickest for a test)

1. Go to **[app.netlify.com](https://app.netlify.com)**
2. Drag your entire **`gq-analytics`** folder onto the deploy dropzone
3. Done — live in seconds

---

## 4. Set Up Netlify Forms (Contact Form)

The contact form is **already configured** — Netlify detects it automatically when you deploy. To confirm it's working:

1. After deploying, go to your Netlify site dashboard
2. Click **"Forms"** in the top menu
3. You'll see **"contact"** listed — this is your form
4. To receive email notifications for each submission:
   - Go to **Site settings → Forms → Form notifications**
   - Click **"Add notification"** → **"Email notification"**
   - Enter `gqconsulting.ke@gmail.com`
   - Save

Netlify Forms is **free** for up to 100 submissions/month.

---

## 5. Custom Domain (Optional)

1. In Netlify dashboard → **"Domain settings"**
2. Click **"Add a domain"** → enter e.g. `gqanalytics.co.ke`
3. Follow instructions to point your DNS (add a CNAME or A record at your domain registrar)
4. Netlify provides a **free SSL certificate** automatically via Let's Encrypt

---

## 6. Update Client Projects

Open `index.html` and find the **Featured Projects** section (search for `Client Business A`). Replace the placeholder names and results with your real clients:

```html
<div class="project-name">Your Real Client Name</div>
<p class="project-result">Specific result — e.g. Reduced reporting time by 40%.</p>
<span class="project-tag">Their Industry</span>
```

---

## Brand

| Token         | Value      |
|---------------|------------|
| Primary green | `#059669`  |
| Light green   | `#10b981`  |
| Accent green  | `#34d399`  |
| Dark          | `#022c22`  |
| White         | `#ffffff`  |
| Display font  | Cormorant Garamond |
| Body font     | Outfit     |
| Mono font     | JetBrains Mono |

---

## Contact

**Stella** &nbsp;·&nbsp; gqconsulting.ke@gmail.com &nbsp;·&nbsp; 0113 751 900 &nbsp;·&nbsp; Nairobi, Kenya
