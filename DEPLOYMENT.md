# Publishing riddhimore.com

## Live site

- Website: https://riddhimore.com
- Source: https://github.com/MsMore/riddhi-portfolio
- Hosting: GitHub Pages, deployed with GitHub Actions.
- Domain registration and DNS: Hostinger.
- HTTPS is enforced. The www address redirects to the main domain.

Publication and custom-domain setup were completed on September 15, 2026. The GitHub build and deployment succeeded. DNS was verified against a public resolver.

## Updating the site

Commit changes to the repository's `main` branch. The **Publish portfolio** workflow installs locked dependencies with Node.js 22, builds the static site, and publishes `out/`. No personal access token is required by the workflow.

Run `npm ci` and `npm run build` before publishing code changes. The lockfile includes platform-specific dependencies for Windows, macOS, and Linux; preserve these entries when updating dependencies.

GitHub Settings → Pages uses **GitHub Actions** and the custom domain `riddhimore.com`. The Next.js configuration uses the domain root path.

## Hostinger DNS

The following records are configured, each with a 300-second TTL:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | msmore.github.io |

Nameservers remain `helios.dns-parking.com` and `aster.dns-parking.com`. Domain registration stays at Hostinger; website hosting is on GitHub Pages.

## Documentation

- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Hostinger DNS zone editor](https://www.hostinger.com/support/how-to-use-hostingers-dns-zone-editor/)
