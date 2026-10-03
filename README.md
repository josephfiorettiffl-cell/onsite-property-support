# On-Site Property Support

## Deploy
This repo is intended to be connected directly to the existing Vercel project.

1. Upload these files to the connected GitHub repository.
2. Commit to `main`.
3. Vercel will automatically build a deployment.
4. Open the new deployment and review it before promoting to production if needed.

## Request form
The site contains `/api/request.js`, which uses Resend.

Before the form can send:
1. Create a Resend account.
2. Verify `onsitepropertysupport.com` as a sending domain.
3. Create a Resend API key.
4. In Vercel > Project > Settings > Environment Variables, add `RESEND_API_KEY`.
5. Redeploy after adding the variable.
6. Submit one real test form and verify it arrives at `service@onsitepropertysupport.com`.

Until then, the phone and email links work normally.
