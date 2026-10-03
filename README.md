# On-Site Property Support — marketing site

This is the public marketing site only. Keep the field portal/software in its separate project/workstream.

## Agent workflow
1. Check out the `site-redesign` branch. This branch contains the marketing site; leave the field portal/software workstream alone.
2. Run `npm run dev` from the repository root and open `http://127.0.0.1:4173/`. The local server handles the same clean page URLs as Vercel, so an agent with a browser can inspect desktop and mobile layouts directly.
3. Commit and push changes to `site-redesign`. Vercel is connected to this GitHub repository and creates a Preview deployment for each push. Its stable branch URL is `https://onsite-property-support-vercel-git-site-redesign-joe-s-team3.vercel.app/`.
4. Preview deployments require Vercel login. Use an authenticated Vercel session or a fresh temporary share link to inspect the hosted Preview. The local preview needs neither.
5. Merge to `main` only after approval.

The local server is for visual review. It does not send Request a Visit emails; test actual delivery on a Vercel deployment after configuring Resend.

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
