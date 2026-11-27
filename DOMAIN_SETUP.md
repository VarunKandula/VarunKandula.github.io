# Connect varunkandula.com

Keep the domain registered at GoDaddy. GitHub Pages hosts the website.

## 1. Set the domain in GitHub

After the website is published, open [this repository's Pages settings](https://github.com/VarunKandula/VarunKandula.github.io/settings/pages). Enter `varunkandula.com` under **Custom domain**, then save. This adds a `CNAME` file to `main`; pull that commit before making further changes.

Set the custom domain in GitHub **before** changing DNS.

## 2. Ask Dad to update GoDaddy DNS

In GoDaddy: **Domain Portfolio → varunkandula.com → DNS**.

Replace the existing `@` A records (`3.33.130.190` and `15.197.148.33` as of November 27, 2026) with these four values, and change the existing `www` CNAME to the value below. Use the default TTL (one hour).

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `varunkandula.github.io` |

Keep the nameservers and existing email records (MX/TXT) unchanged. If GoDaddy forwarding is enabled and locks the old web records, disable that forwarding before replacing them. If additional `@` AAAA records appear, remove any that point to another host or use GitHub's documented IPv6 values.

## 3. Enable HTTPS

Once GitHub's DNS check succeeds and its certificate is ready, enable **Enforce HTTPS** in Pages settings. DNS changes usually take effect within an hour, but GoDaddy advises allowing up to 48 hours globally. GitHub says the HTTPS option can take up to 24 hours to appear.

With both sets of records configured, `www.varunkandula.com` redirects to `varunkandula.com`.

## Sources

- [GitHub Pages custom domain instructions and IP addresses](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GoDaddy: add an A record](https://www.godaddy.com/help/add-an-a-record-19238)
- [GoDaddy: add a CNAME record](https://www.godaddy.com/help/add-a-cname-record-19236)
