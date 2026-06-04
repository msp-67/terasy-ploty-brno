# Terasy a Ploty Brno — Website

Static website for **Terasy a Ploty Brno**, a Czech company selling and installing WPC composite wood terraces, fences, and cladding in Brno.

## Project Structure

```
terasy-ploty-brno/
├── index.html         — Home page (Domů)
├── produkty.html      — Products page (Produkty)
├── o-nas.html         — About & Contact page (O Nás / Kontakt)
├── css/
│   └── style.css      — All styles: design tokens, reset, nav, footer, page sections
├── js/
│   └── main.js        — Navigation scroll state, hamburger menu, scroll fade-ins, contact form
└── images/            — Folder for any future local image assets
```

## Tech Stack

Plain HTML, CSS, and JavaScript — no frameworks, no build tools, no npm required.

| Concern | Approach |
|---|---|
| Fonts | Google Fonts (Playfair Display + Inter) via `<link>` |
| Images | Hosted on Wix CDN; `loading="lazy"` on all below-the-fold images |
| Animations | CSS `@keyframes` for hero load-in; Intersection Observer for scroll fade-ins |
| Responsive | Mobile-first CSS with `clamp()` fluid type scale and CSS Grid |
| Accessibility | Skip link, ARIA labels, `:focus-visible` ring, WCAG AA contrast |

## Contact Details

| Field | Value |
|---|---|
| Phone | +420 777 224 792 |
| Email | info@terasy-plotybrno.cz |
| Address | Nové Sady 2, Brno |
| Hours | Po–Pá, 9–15 hod. |

## Deploy to GitHub Pages

1. Create a new GitHub repository (public or private with Pages enabled).
2. Push all project files to the **`main`** branch. Files must be in the **repo root** — not inside a subfolder.
3. In the repository, go to **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**.
5. Select branch **`main`**, folder **`/ (root)`**, and click **Save**.
6. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a few minutes.

### Custom domain (optional)

1. Add a file named `CNAME` to the repo root containing just your domain, e.g.:
   ```
   terasy-plotybrno.cz
   ```
2. At your DNS registrar, point the domain's `A` records to GitHub Pages IPs:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
3. For `www`, add a `CNAME` DNS record pointing `www` → `<your-username>.github.io`.
4. Back in GitHub → Settings → Pages, enter the custom domain and enable **Enforce HTTPS**.

## Development

No build step needed. Open any `.html` file directly in a browser, or use a simple local server to avoid CORS issues with fonts:

```bash
# Python 3
python -m http.server 8080

# Node (npx)
npx serve .
```

Then open `http://localhost:8080`.
