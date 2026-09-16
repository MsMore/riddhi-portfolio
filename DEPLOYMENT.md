# Publishing riddhimore.com

## Current status

The site and automatic GitHub Pages workflow are prepared and the production build passes. The public repository https://github.com/MsMore/riddhi-portfolio has been created, but its files have not been uploaded. GitHub and Hostinger browser sign-in is complete. Publication is waiting for explicit confirmation that the source code and portfolio content may be public. The domain's existing DNS records have been inspected and remain unchanged.

## GitHub

1. Upload this source to `main` in `MsMore/riddhi-portfolio` after public-source visibility is approved.
2. In Settings → Pages, select **GitHub Actions** as the publishing source.
3. Set the custom domain to `riddhimore.com` before changing DNS.
4. Run **Publish portfolio** from the Actions tab if the initial push happened before Pages was enabled.
5. After DNS verification and certificate issuance, enable **Enforce HTTPS**.

The workflow installs locked dependencies with Node.js 22, builds the static site, and publishes `out/`. Later pushes to `main` publish automatically. No personal access token is required by the workflow.

The Next.js configuration deliberately uses the root path for the custom domain. The temporary GitHub project URL is not the intended public URL.

## Hostinger DNS

Keep domain registration and DNS at Hostinger. For the selected GitHub account's Pages site, configure:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | `<GitHub username>.github.io` |

Replace only conflicting website records at `@` and `www`; preserve existing email and verification records. Review any apex AAAA and CAA records before changing them. The account should be confirmed before filling in the CNAME destination.

The observed pre-deployment records on September 15, 2026 were `@ A 2.57.91.91` and `www CNAME riddhimore.com`. Nameservers were `helios.dns-parking.com` and `aster.dns-parking.com`.

Check both `https://riddhimore.com` and `https://www.riddhimore.com` once DNS has propagated. GitHub notes DNS and HTTPS availability can take up to 24 hours.

## Documentation

- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Hostinger DNS zone editor](https://www.hostinger.com/support/how-to-use-hostingers-dns-zone-editor/)
