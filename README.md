# On-Site Property Support — marketing site

This is the public marketing site only. Keep the field portal/software in its separate project/workstream.

## Recommended deploy flow
1. Create a Git branch such as `site-redesign`.
2. Replace the marketing-site files with the contents of this package.
3. Commit/push.
4. Vercel will create a Preview deployment for the branch.
5. Review the Preview on desktop and phone.
6. Merge to `main` only after approval.

## Request form
The form endpoint uses Resend.

Before email sending works:
1. Verify `onsitepropertysupport.com` as a sending domain in Resend.
2. Create a Resend API key.
3. Add `RESEND_API_KEY` in Vercel Project Settings > Environment Variables.
4. Redeploy and submit a real test request.
5. Confirm delivery at `service@onsitepropertysupport.com`.

Phone and mailto links work without Resend.

## Photography
The site intentionally uses report/photo placeholders instead of stock photos. Replace those placeholders with Joe's real commercial-property/corridor photography and the approved sample report imagery before full public launch.
