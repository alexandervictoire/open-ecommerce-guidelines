# Open E-Commerce Guidelines

A public, community-maintained collection of e-commerce guidelines — UX **and**
technical (performance, semantic structure, machine-readability, agentic-commerce
readiness). Think "Baymard meets MDN," as open docs-as-code. The site is itself a
reference implementation of agent-readable content: clean semantic HTML, JSON-LD
per guideline, a sitemap, and fast static pages.

## How it works

- **Content** lives as Markdown in [`content/guidelines/`](content/guidelines),
  one file per guideline, organized by category (`pdp`, `cart`, `checkout`).
- **Site** is Nuxt 3 + [Nuxt Content](https://content.nuxt.com) + UnoCSS,
  generated as a fully static site and deployed on Vercel.
- **Contributions** are pull requests, reviewed and merged by the maintainer.
  Every PR gets a Vercel preview deployment.

## Run locally

Requires Node 20+ (this repo uses Node 24 via nvm).

```bash
npm install
npm run dev          # http://localhost:3000
npm run generate     # static build → .output/public
npm run preview      # preview the static build
```

## Deploy (Vercel)

The site builds to fully static output (`nuxt generate` → `.output/public`) and
is deployable on the Vercel free tier. [`vercel.json`](vercel.json) pins the
build command and output directory, so importing the repo on Vercel needs no
extra configuration. Every pull request gets an automatic preview deployment.

Before the first production deploy, update two placeholders:

- `GITHUB_REPO` in [`utils/site.ts`](utils/site.ts) — drives "Edit this page"
  and "Contribute" links (currently `OWNER/ecom-guidelines`).
- `SITE_URL` in the same file — canonical URLs, sitemap, and robots
  (currently the expected `*.vercel.app` URL).

## Contributing

New guidelines and improvements are welcome. Read
[CONTRIBUTING.md](CONTRIBUTING.md) for the guideline schema, the ID scheme, and
acceptance criteria. Conventions for editors (human or AI) live in
[CLAUDE.md](CLAUDE.md).

## License

Split license (see [LICENSE](LICENSE)):

- **Content** (`content/**`) — [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- **Code** (everything else) — MIT.
