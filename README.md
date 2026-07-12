# Open E-Commerce Guidelines

A public, community-maintained collection of e-commerce guidelines — UX **and**
technical (performance, semantic structure, machine-readability, agentic-commerce
readiness). Think "Baymard meets MDN," as open docs-as-code. The site is itself a
reference implementation of agent-readable content: clean semantic HTML, JSON-LD
per guideline, a sitemap, and fast static pages.

## Ways to contribute

You don't need to write a full guideline to help. Pick your level:

- **Report a failure pattern.** Seen a recurring UX or technical problem in
  real shops? [Open an issue](../../issues/new) describing it — even a few
  sentences and a screenshot help. We'll help shape it into a guideline.
- **Propose a guideline idea.** Not sure it qualifies? Open an issue and
  we'll discuss it before you invest writing time.
- **Review and improve existing guidelines.** Unclear wording, missing
  failure signals, better verification steps — small PRs are very welcome.
- **Write a new guideline.** See [CONTRIBUTING.md](CONTRIBUTING.md) for the
  template and acceptance criteria. Check the
  [help-wanted issues](../../issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
  for where gaps are biggest.
- **Discuss the standard itself.** Category structure, dimensions, scope —
  [GitHub Discussions](../../discussions) is the place.

All content contributions are accepted under CC BY-SA 4.0.

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

Site configuration lives in [`utils/site.ts`](utils/site.ts):

- `GITHUB_REPO` (`alexandervictoire/open-ecommerce-guidelines`) — drives
  "Edit this page" and "Contribute" links.
- `SITE_URL` (`https://www.ecommerce-guidelines.org`) — canonical URLs,
  sitemap, and robots.

## Contributing

New guidelines and improvements are welcome. Read
[CONTRIBUTING.md](CONTRIBUTING.md) for the guideline schema, the ID scheme, and
acceptance criteria. Conventions for editors (human or AI) live in
[CLAUDE.md](CLAUDE.md).

## License

Split license (see [LICENSE](LICENSE)):

- **Content** (`content/**`) — [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- **Code** (everything else) — MIT.
