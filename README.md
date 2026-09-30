# gocaving.ai

The public site for **gocaving.ai** — a working home for cave survey and karst projects.

This repo is the public side only. Member project workspaces live in a separate
application at [app.gocaving.ai](https://app.gocaving.ai); this site links to it but shares
no code with it.

## What's here


The landing page is deliberately self-contained. It loads one external resource (the
Instrument Sans webfont from Google Fonts) and nothing else — no framework, no build
step, no local scripts or images.

## How it deploys

Cloudflare Pages builds from the `main` branch of this repo. There is no build command
and no output directory to configure; the files are served as they are.

**Pushing to `main` publishes to https://gocaving.ai.** There is no staging step, so
review before you push.

## Local development

No toolchain required. Open `index.html` in a browser, or serve the folder if you want
paths to behave exactly as they do in production:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Design

New pages should match the landing page rather than introduce a second look. The palette
and type are defined inline at the top of `index.html`:

| Token | Value | Use |
|---|---|---|
| `--surface` | `#DCE0D9` | Page background |
| `--surface-deep` | `#CDD3CB` | Notebook grid lines |
| `--card` | `#E9ECE5` | Raised surfaces, button text |
| `--border` | `#C9CFC6` | Hairline rules |
| `--ink` | `#1C231E` | Body text, survey lines |
| `--mid` | `#5A6455` | Secondary text |
| `--accent` | `#1F5A72` | Links, buttons, survey leads |
| `--accent-ink` | `#164457` | Hover state |

Typeface is **Instrument Sans** (400/500/600). The same palette is used by the members
app, so the two read as one system.

## Branches

| Branch | What it is |
|---|---|
| `main` | Live. What Cloudflare Pages serves. |
| `site-v1` | The previous site — a Tailwind-based multi-section page with background images and subscribe/feedback forms. Kept as a record; not deployed. |

## Conventions

- **Line endings are LF.** Enforced by `.gitattributes`. Without it, editors on Windows
  rewrite files as CRLF and every line shows as changed.
- **Pages are self-contained.** Inline the CSS; no build step to run and nothing to
  forget. Embed small graphics as inline SVG.
- **No analytics, no trackers, no cookies.**
