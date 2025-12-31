# CloudFlare Pages Setup Guide

This guide explains how to configure email notifications for form submissions on CloudFlare Pages.

## Overview

The gocaving.ai site now uses **CloudFlare Pages Functions** to handle form submissions. This replaces the previous Netlify Forms integration.

### What Changed?

- **Before**: Forms submitted to Netlify Forms with `data-netlify="true"`
- **After**: Forms submit to CloudFlare Pages Functions (`/api/subscribe` and `/api/feedback`)

## How It Works

1. User submits a form on the website
2. JavaScript intercepts the submission and sends it to CloudFlare Pages Function
3. CloudFlare Pages Function validates the data
4. Function sends email notification to admin via email service
5. Success/error message displayed to user

## Email Service Configuration

You must configure ONE of the following email services for notifications to work.

### Option 1: Resend (Recommended)

**Why Resend?** Simplest API, generous free tier, great for transactional emails.

**Free Tier**: 3,000 emails/month, 100 emails/day

#### Setup Steps:

1. **Sign up**: Go to [resend.com](https://resend.com) and create account
2. **Verify domain** (optional but recommended):
   - Add DNS records for gocaving.ai
   - OR use their sandbox domain for testing
3. **Get API Key**:
   - Go to API Keys section
   - Create new API key
   - Copy the key (starts with `re_`)
4. **Configure CloudFlare Pages**:
   - Go to CloudFlare Pages dashboard
   - Select your site (go-caving-ai-cloudflare)
   - Settings → Environment Variables
   - Add these variables:

   ```
   RESEND_API_KEY=re_your_api_key_here
   ADMIN_EMAIL_FROM=noreply@gocaving.ai
   ADMIN_EMAIL_TO=your-email@example.com
   ```

5. **Redeploy**: CloudFlare will automatically redeploy with new variables

### Option 2: SendGrid

**Free Tier**: 100 emails/day forever

#### Setup Steps:

1. **Sign up**: Go to [sendgrid.com](https://sendgrid.com)
2. **Verify sender email**:
   - Settings → Sender Authentication
   - Verify your email address or domain
3. **Get API Key**:
   - Settings → API Keys
   - Create API Key with "Mail Send" permissions
   - Copy the key (starts with `SG.`)
4. **Configure CloudFlare Pages**:

   ```
   SENDGRID_API_KEY=SG.your_api_key_here
   ADMIN_EMAIL_FROM=noreply@gocaving.ai
   ADMIN_EMAIL_TO=your-email@example.com
   ```

### Option 3: Mailgun

**Free Tier**: 100 emails/day for 3 months, then $1.50 per 1,000 emails

#### Setup Steps:

1. **Sign up**: Go to [mailgun.com](https://mailgun.com)
2. **Add domain**: Add and verify gocaving.ai (or use sandbox for testing)
3. **Get API Key**: Copy from Settings → API Keys
4. **Configure CloudFlare Pages**:

   ```
   MAILGUN_API_KEY=your_api_key_here
   MAILGUN_DOMAIN=gocaving.ai
   ADMIN_EMAIL_FROM=noreply@gocaving.ai
   ADMIN_EMAIL_TO=your-email@example.com
   ```

## CloudFlare Pages Environment Variables

### How to Set Environment Variables:

1. Log in to [CloudFlare Dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages**
3. Select your site: **go-caving-ai-cloudflare**
4. Click **Settings** tab
5. Scroll to **Environment Variables** section
6. Click **Add variable**
7. Add each variable:
   - Variable name: `RESEND_API_KEY` (or your chosen service)
   - Value: Your API key
   - Environment: **Production** (check the box)
8. Click **Save**
9. Repeat for other variables

### Required Variables:

**For Resend:**
```bash
RESEND_API_KEY=re_xxxxx
ADMIN_EMAIL_FROM=noreply@gocaving.ai
ADMIN_EMAIL_TO=your-admin-email@example.com
```

**For SendGrid:**
```bash
SENDGRID_API_KEY=SG.xxxxx
ADMIN_EMAIL_FROM=noreply@gocaving.ai
ADMIN_EMAIL_TO=your-admin-email@example.com
```

**For Mailgun:**
```bash
MAILGUN_API_KEY=xxxxx
MAILGUN_DOMAIN=gocaving.ai
ADMIN_EMAIL_FROM=noreply@gocaving.ai
ADMIN_EMAIL_TO=your-admin-email@example.com
```

## Testing

### Test Locally (Development):

CloudFlare Pages Functions can be tested locally using Wrangler:

```bash
# Install Wrangler CLI
npm install -g wrangler

# Navigate to project
cd /home/ajbir/gocaving-landing-cloudflare

# Run local development server
npx wrangler pages dev .

# Site will be available at http://localhost:8788
```

**Note**: Environment variables for local testing:
- Create a `.dev.vars` file in the project root
- Add your variables (same format as above)
- DO NOT commit this file to git (it's in .gitignore)

Example `.dev.vars`:
```
RESEND_API_KEY=re_xxxxx
ADMIN_EMAIL_FROM=noreply@gocaving.ai
ADMIN_EMAIL_TO=test@example.com
```

### Test on Production:

1. Deploy to CloudFlare Pages (push to GitHub)
2. Visit https://go-caving-ai-cloudflare.pages.dev (or your custom domain)
3. Fill out the subscription form with a test email
4. Submit and check:
   - Success message appears on page
   - Email arrives at ADMIN_EMAIL_TO address
   - Check CloudFlare Pages logs for any errors

### Debugging:

**Check CloudFlare Pages Logs:**
1. Go to CloudFlare Pages dashboard
2. Select your site
3. Click on latest deployment
4. View **Functions** logs
5. Look for errors or console output

**Common Issues:**

1. **No email received**:
   - Check CloudFlare environment variables are set correctly
   - Verify API key is valid
   - Check spam folder
   - View CloudFlare Functions logs for errors

2. **Form submission fails**:
   - Open browser DevTools (F12)
   - Check Console for JavaScript errors
   - Check Network tab for failed API calls

3. **"No email service configured" in logs**:
   - Environment variables not set
   - Redeploy after setting variables

## File Structure

```
gocaving-landing-cloudflare/
├── functions/
│   └── api/
│       ├── subscribe.js      # Email subscription endpoint
│       └── feedback.js        # Feedback form endpoint
├── index.html                 # Main page (forms updated)
├── script.js                  # Client-side form handling
├── CLOUDFLARE-SETUP.md        # This file
└── .dev.vars                  # Local env variables (DO NOT COMMIT)
```

## Deployment

### Automatic Deployment:

CloudFlare Pages is configured to auto-deploy on git push:

```bash
cd /home/ajbir/gocaving-landing-cloudflare

# Make changes, then:
git add .
git commit -m "Update forms"
git push origin main

# CloudFlare will automatically build and deploy
# Usually takes 1-2 minutes
```

### Manual Deployment:

1. Go to CloudFlare Pages dashboard
2. Select your site
3. Click **Create deployment**
4. Select branch: **main**
5. Click **Deploy**

## Monitoring

### Check Form Submissions:

Since CloudFlare Pages Functions send emails directly, there's no built-in submission dashboard like Netlify Forms. Consider:

1. **Email inbox**: All submissions arrive as emails
2. **CloudFlare Analytics**: View function invocation counts
3. **CloudFlare Logs**: Debug issues and view submission data

### Future Enhancement: Database Storage

To track submissions in a dashboard (like Netlify Forms), you could:
- Store submissions in CloudFlare D1 (SQLite database)
- Use CloudFlare KV (key-value store)
- Send to external service (Airtable, Google Sheets, etc.)

This would require additional code in the functions.

## Cost Comparison

| Service | Netlify Forms | CloudFlare + Resend | CloudFlare + SendGrid |
|---------|---------------|---------------------|----------------------|
| **Free Tier** | 100 submissions/month | 3,000 emails/month | 100 emails/day |
| **Overage** | $19/month for 1,000 | Free tier should suffice | Free tier should suffice |
| **Dashboard** | Yes, built-in | Email inbox only | Email inbox only |
| **Spam Protection** | Yes | Yes (honeypot) | Yes (honeypot) |

## Security Features

Both endpoints include:
- **Honeypot fields**: Catch spam bots
- **Email validation**: Prevent invalid submissions
- **Error handling**: Graceful failures
- **CORS headers**: Allow form submissions from your domain

## Next Steps

1. ✅ Forms are set up and ready
2. ⏳ Configure email service (choose Resend, SendGrid, or Mailgun)
3. ⏳ Set CloudFlare environment variables
4. ⏳ Test forms on production
5. ⏳ Monitor email delivery

## Support

For issues:
- CloudFlare Pages docs: https://developers.cloudflare.com/pages/
- Resend docs: https://resend.com/docs
- SendGrid docs: https://docs.sendgrid.com
- Mailgun docs: https://documentation.mailgun.com

---

**Last Updated**: December 31, 2025
**Status**: Forms configured, awaiting email service setup
