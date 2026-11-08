# Yuehan-Wang.github.io

Source for my personal site (formerly the `yuehan-space` repo), live at **https://yuehan-wang.github.io/**.

Built with Next.js 16, React 19 and Tailwind 4, statically exported and hosted on GitHub Pages.

## Local dev

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy

Push to `master`. `.github/workflows/deploy.yml` builds the static export (`out/`) and deploys it with
GitHub Pages (Settings → Pages → Source: GitHub Actions). You can also run it by hand from the Actions tab.

## Custom domain

To serve the site from a domain you own (e.g. `yuehan.space` again after re-registering):

1. Create `public/CNAME` containing just the domain (one line).
2. Point the domain's DNS at GitHub Pages per [GitHub's docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

The site is already built for the domain root, so no base-path change is needed.

## Content

- `content/posts/`: markdown blog posts, rendered with `remark` at `/post/[id]`.
- `content/projects/`: markdown project pages, rendered with `marked` at `/project/[id]`.
