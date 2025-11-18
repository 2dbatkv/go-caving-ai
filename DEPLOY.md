# Deployment Guide for gocaving.ai

This guide will walk you through deploying your gocaving.ai landing page to GitHub and Netlify.

## Prerequisites

- [ ] GitHub account
- [ ] Netlify account (free tier is sufficient)
- [ ] Git installed locally
- [ ] Content ready (event details, recordings, etc.)

## Step 1: Update Content

Before deploying, update the placeholder content in `index.html`:

### Upcoming Discussions
1. Open `index.html` in your editor
2. Find the "Upcoming Discussions Section" (around line 89)
3. Update each discussion card with:
   - Actual date and time
   - Timezone
   - Discussion topic title
   - Description
   - Meeting link (Zoom, Google Meet, etc.)

### Past Recordings
1. Find the "Past Recordings Section" (around line 133)
2. Update each recording card with:
   - Recording date
   - Title
   - Description
   - YouTube link

**Tip:** To use actual YouTube thumbnails, replace the SVG with:
```html
<img src="https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg"
     alt="Video thumbnail"
     class="w-full h-full object-cover">
```

## Step 2: Initialize Git Repository

Open your terminal and navigate to the project:

```bash
cd /home/ajbir/gocaving-landing

# Initialize Git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: gocaving.ai landing page"

# Set main branch
git branch -M main
```

## Step 3: Create GitHub Repository

### Option A: Using GitHub CLI (if installed)
```bash
# Create repository
gh repo create gocaving-landing --public --source=. --remote=origin

# Push code
git push -u origin main
```

### Option B: Using GitHub Website
1. Go to https://github.com/new
2. Repository name: `gocaving-landing`
3. Description: "Landing page for gocaving.ai - AI in Caving discussion series"
4. Choose "Public"
5. Do NOT initialize with README (we already have one)
6. Click "Create repository"

7. Connect local repository:
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/gocaving-landing.git
git push -u origin main
```

## Step 4: Deploy to Netlify

### Method 1: Netlify Web UI (Recommended)

1. **Log in to Netlify**
   - Go to https://app.netlify.com
   - Sign in (or create free account)

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub account
   - Select the `gocaving-landing` repository

3. **Configure Build Settings**
   - Site name: `gocaving-ai` (or your preferred subdomain)
   - Branch to deploy: `main`
   - Build command: (leave empty)
   - Publish directory: `/` or `.` (root directory)
   - Click "Deploy site"

4. **Wait for Deployment**
   - First deployment takes 30-60 seconds
   - You'll see a URL like: `https://gocaving-ai.netlify.app`

### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Log in
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy --prod
```

## Step 5: Configure Custom Domain

1. **In Netlify Dashboard:**
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter: `gocaving.ai`
   - Click "Verify"

2. **Configure DNS:**

   If your domain registrar is:

   **Option A: Use Netlify DNS (Recommended)**
   - Click "Set up Netlify DNS"
   - Copy the 4 nameserver addresses
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Update nameservers to Netlify's nameservers
   - Wait 24-48 hours for propagation

   **Option B: Keep Current DNS**
   - Add DNS records at your registrar:
     ```
     Type: A
     Name: @
     Value: 75.2.60.5

     Type: CNAME
     Name: www
     Value: gocaving-ai.netlify.app
     ```

3. **Enable HTTPS:**
   - Netlify automatically provisions SSL certificate
   - This happens automatically after DNS is configured
   - Usually takes 1-10 minutes

## Step 6: Configure Netlify Forms

Forms are already configured in `index.html` with `data-netlify="true"`.

After deployment:

1. **Verify Forms Work:**
   - Visit your deployed site
   - Submit test data through both forms
   - Check Netlify dashboard → Forms

2. **Set Up Notifications (Optional):**
   - In Netlify dashboard, go to Forms → Form notifications
   - Add email notification for new submissions
   - Enter your email address

3. **Configure Spam Protection:**
   - Forms already include honeypot field
   - Consider enabling Akismet in Netlify dashboard (paid feature)

## Step 7: Verify Deployment

1. **Test all functionality:**
   - [ ] Site loads correctly
   - [ ] All sections display properly
   - [ ] Email signup form works
   - [ ] Feedback form works
   - [ ] Links work correctly
   - [ ] Mobile responsive design works
   - [ ] Forms appear in Netlify dashboard

2. **Test on multiple devices:**
   - [ ] Desktop browser
   - [ ] Mobile phone
   - [ ] Tablet

## Step 8: Future Updates

Whenever you update content:

```bash
# Make changes to index.html or other files

# Commit changes
git add .
git commit -m "Update upcoming discussions"

# Push to GitHub
git push

# Netlify automatically deploys changes (usually within 1-2 minutes)
```

## Troubleshooting

### Forms not working
- Check that `data-netlify="true"` is present in form tag
- Verify `name` attribute is on the form element
- Check Netlify dashboard → Forms for submissions

### Site not updating after push
- Check Netlify dashboard → Deploys
- Look for failed deployments
- Check build logs for errors

### Custom domain not working
- Verify DNS records are correct
- Allow 24-48 hours for DNS propagation
- Use https://dnschecker.org to check DNS status

### SSL certificate issues
- Wait 10-15 minutes after DNS configuration
- Try "Renew certificate" in Netlify dashboard
- Ensure DNS is properly configured

## Next Steps

After successful deployment:

1. **Monitor Analytics:**
   - Enable Netlify Analytics (paid)
   - Or integrate Plausible Analytics (privacy-focused)
   - Or Google Analytics

2. **Set Up Email Service (Future):**
   - SendGrid for automated emails
   - Mailgun for transactional emails
   - Consider when ready for email confirmations

3. **Plan Backend (Phase 2):**
   - Dynamic content via API
   - Database on Render
   - User accounts and authentication

## Useful Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Forms Guide](https://docs.netlify.com/forms/setup/)
- [GitHub Pages vs Netlify](https://docs.netlify.com/integrations/frameworks/)
- [Custom Domain Setup](https://docs.netlify.com/domains-https/custom-domains/)

## Support

If you encounter issues:
- Netlify Support: https://answers.netlify.com/
- GitHub Issues: (to be added)
- Netlify Status: https://www.netlifystatus.com/
