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

Observed before deployment on 2 Oct 2026: apex and www both resolved to `54.67.87.110`, using the registrar's parking nameservers. The user saved the required records. Opening Manage DNS in the authenticated registrar account activated its default nameserver-saving flow; Vercel subsequently confirmed both domains configured correctly with `ns-canada.topdns.com`, `ns-uk.topdns.com`, and `ns-usa.topdns.com`. These servers return the correct records. Older resolver caches may still return the parking address.

## Exact DNS records reported by Vercel

The existing `spartan-c548/journey` project has both domains attached and ownership verified. On 2 Oct 2026, `vercel domains verify` reported these project-specific records:

| Type | Name | Value |
|---|---|---|
| A | @ | 216.198.79.1 |
| A | @ | 64.29.17.1 |
| CNAME | www | b3144e08090ee249.vercel-dns-017.com |

Replace the old parking A records for these names. A CNAME must not coexist with another A/AAAA/CNAME record at `www`. Leave unrelated records intact. No TXT ownership challenge is currently required. Do not change nameservers as part of this record-based setup.

After updating DNS, run `npx vercel domains verify georgefifth.xyz --scope spartan-c548` and the same command for `www.georgefifth.xyz`. Both now report configured-correctly. Issued a Vercel-managed certificate for both domains with `npx vercel certs issue georgefifth.xyz www.georgefifth.xyz --scope spartan-c548`. HTTPS certificate validation and apex HTTP 200 succeeded against the assigned Vercel address. Configured the www project-domain redirect to `georgefifth.xyz` with status 308; `/og.png` verifies path preservation. OG, robots and sitemap return HTTP 200. Google public DNS returns the correct records; some other resolvers and the local browser still have stale parking answers.

## Portable static alternative

`npm run export:static` builds `out/` with local thumbnails and no Node runtime. Upload the contents to a regular static host if needed. Configure HTTPS and the www redirect at that host. `npm run build` retains the standard Next.js/Vercel mode. The static export and the normal build share the same source/data.

## Rollback

The original site is recoverable from Git commit `7b868a6e35ba650c055f0dafccd8c8cebc42c375`. Use Vercel's previous deployment rollback if production needs reverting. Do not force-push or remove the original preview.
