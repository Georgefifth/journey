# Deployment to georgefifth.xyz

Chosen hosting: the existing Vercel Journey project. gen.xyz is the domain registrar; its DNS connects the domain to hosting. No separate server purchase is necessary for this static journal.

Production canonical is `https://georgefifth.xyz`. Both apex and www must be assigned to the same Vercel project; `vercel.json` permanently redirects www to the apex and preserves the path.

## Steps

1. Authenticate the Vercel CLI with the account that owns the existing project.
2. Link this checkout to that existing project. Confirm its source repository and production branch; Git uses `master` here.
3. Run data validation, type checking and a production build; commit the changes. Deploy with `npx vercel --prod`.
4. Add `georgefifth.xyz` and `www.georgefifth.xyz` under that project's Settings → Domains.
5. At gen.xyz, use the **exact records Vercel reports for this project**: an A record for the apex and CNAME for www, plus any required ownership-verification TXT. Do not substitute guessed generic values. Preserve unrelated MX/TXT records and nameservers.
6. Verify apex HTTPS, www redirect, `/og.png`, `/robots.txt`, and `/sitemap.xml`. Keep `journey-phi-bay.vercel.app` until the domain works.

Observed before deployment on 2 Oct 2026: apex and www both resolve to `54.67.87.110`; this is the registrar's current destination, not a verified Vercel assignment. DNS has not been changed by this task.

## Exact DNS records reported by Vercel

The existing `spartan-c548/journey` project has both domains attached and ownership verified. On 2 Oct 2026, `vercel domains verify` reported these project-specific records:

| Type | Name | Value |
|---|---|---|
| A | @ | 216.198.79.1 |
| A | @ | 64.29.17.1 |
| CNAME | www | b3144e08090ee249.vercel-dns-017.com |

Replace the old parking A records for these names. A CNAME must not coexist with another A/AAAA/CNAME record at `www`. Leave unrelated records intact. No TXT ownership challenge is currently required. Do not change nameservers as part of this record-based setup.

After updating DNS, run `npx vercel domains verify georgefifth.xyz --scope spartan-c548` and the same command for `www.georgefifth.xyz`. Domain verification currently reports invalid configuration until these records propagate. HTTPS and www behavior cannot be declared working before that.

## Portable static alternative

`npm run export:static` builds `out/` with local thumbnails and no Node runtime. Upload the contents to a regular static host if needed. Configure HTTPS and the www redirect at that host. `npm run build` retains the standard Next.js/Vercel mode. The static export and the normal build share the same source/data.

## Rollback

The original site is recoverable from Git commit `7b868a6e35ba650c055f0dafccd8c8cebc42c375`. Use Vercel's previous deployment rollback if production needs reverting. Do not force-push or remove the original preview.
