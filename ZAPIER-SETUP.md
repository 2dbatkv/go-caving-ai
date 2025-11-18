# Zapier Integration Guide - Email Confirmations

## Overview

Send automated welcome emails to people who subscribe via the email-updates form on gocaving.ai.

## Prerequisites

- [ ] Netlify site deployed (✅ Done!)
- [ ] Forms working (✅ Done!)
- [ ] Zapier account (free tier: https://zapier.com/sign-up)
- [ ] Email account (Gmail, Outlook, or SendGrid)

## Setup Steps

### Step 1: Create Zapier Account

1. Go to https://zapier.com/sign-up
2. Sign up (free tier includes 100 tasks/month)
3. Verify email

### Step 2: Connect Netlify to Zapier

1. In Zapier, click **"Create Zap"**
2. **Trigger App:** Search for "Netlify"
3. **Trigger Event:** Select "New Form Submission"
4. Click **"Continue"**
5. **Connect Netlify Account:**
   - Click "Sign in to Netlify"
   - Authorize Zapier to access your Netlify account
6. **Choose Form:**
   - Site: gocaving-ai
   - Form: email-updates
7. **Test Trigger:**
   - Zapier will pull a recent submission
   - Click "Continue"

### Step 3: Add Filter (Optional but Recommended)

This ensures only email-updates submissions trigger the email, not feedback submissions.

1. Click **"+"** to add a step
2. Choose **"Filter"**
3. Set condition:
   - **Field:** Form Name
   - **Condition:** Exactly matches
   - **Value:** email-updates
4. Click "Continue"

### Step 4: Set Up Email Action

**Option A: Gmail**

1. **Action App:** Search for "Gmail"
2. **Action Event:** "Send Email"
3. **Connect Gmail:** Sign in and authorize
4. **Customize Email:**
   - **To:** `{{Email}}` (from form data)
   - **From:** Your email
   - **Subject:** "Welcome to gocaving.ai - AI in Caving"
   - **Body Type:** HTML or Plain Text
   - **Body:** (see template below)

**Option B: Outlook**

Same steps as Gmail, just choose "Outlook" instead.

**Option C: SendGrid** (for better deliverability)

1. Create SendGrid account (free: 100 emails/day)
2. Get API key from SendGrid
3. In Zapier, choose "SendGrid"
4. Use API key to connect
5. Configure email template

### Step 5: Test and Activate

1. Click **"Test"** to send a test email
2. Check that you received it
3. Review email formatting
4. Click **"Publish"** to activate the Zap
5. Name your Zap: "gocaving.ai - Email Confirmation"

## Email Template

### Subject Line Options:
- "Welcome to gocaving.ai - AI in Caving"
- "You're subscribed to AI in Caving discussions"
- "Thanks for joining gocaving.ai!"

### Email Body (Plain Text):

```
Hi {{Name}},

Thanks for subscribing to gocaving.ai!

You're all set to receive updates about our "AI in Caving" discussion series.

🗓️ Next Session:
Tuesday, November 18, 2025 at 7:00 PM Eastern
Topic: Caving Software and AI
Join here: https://us06web.zoom.us/j/83454859193?pwd=3959k9aECggXsZaXwRl5Zpy4xuhwtO.1

We'll be discussing cave survey software design, vibe coding with AI, and how modern technology is making technical work accessible to everyone in the caving community.

Looking forward to seeing you there!

Aaron Bird
gocaving.ai
https://gocaving.ai

---
Not interested anymore? Reply to this email and I'll remove you from the list.
```

### Email Body (HTML - Fancier):

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0f172a; color: #10b981; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .event-box { background: #fff; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
    a { color: #10b981; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>gocaving.ai</h1>
      <p>AI in Caving Discussion Series</p>
    </div>

    <div class="content">
      <p>Hi {{Name}},</p>

      <p>Thanks for subscribing to gocaving.ai! You're all set to receive updates about our "AI in Caving" discussion series.</p>

      <div class="event-box">
        <h3>📅 Next Session</h3>
        <p><strong>Tuesday, November 18, 2025 at 7:00 PM Eastern</strong></p>
        <p><strong>Topic:</strong> Caving Software and AI</p>
        <p><a href="https://us06web.zoom.us/j/83454859193?pwd=3959k9aECggXsZaXwRl5Zpy4xuhwtO.1">Join the discussion →</a></p>
      </div>

      <p>We'll be discussing cave survey software design, vibe coding with AI, and how modern technology is making technical work accessible to everyone in the caving community.</p>

      <p>Looking forward to seeing you there!</p>

      <p>Aaron Bird<br>
      <a href="https://gocaving.ai">gocaving.ai</a></p>
    </div>

    <div class="footer">
      <p>Not interested anymore? Reply to this email and I'll remove you from the list.</p>
    </div>
  </div>
</body>
</html>
```

## Zapier Field Mapping

When setting up the email, you can use these fields from the form submission:

- `{{Name}}` - Subscriber's name (if provided)
- `{{Email}}` - Subscriber's email address
- `{{Created At}}` - Timestamp of submission
- `{{Site Name}}` - gocaving-ai (constant)

**Tip:** If Name is optional and might be empty, use:
- "Hi {{Name}}," when name is provided
- "Hi there," when name is blank

Zapier has a "Formatter" tool to handle this:
1. Add Formatter step before email
2. Choose "Text" → "Default Value"
3. Input: `{{Name}}`
4. Default: "there"
5. Use formatted output in email: "Hi {{Formatted Name}},"

## Testing Checklist

Before activating your Zap:

- [ ] Test with form submission on your site
- [ ] Verify email is received
- [ ] Check that {{Name}} and {{Email}} populate correctly
- [ ] Test with empty name field (optional field)
- [ ] Verify links work in email
- [ ] Check email formatting on mobile
- [ ] Test spam score (mail-tester.com)

## Advanced Options (Future)

### Add Delay
- Add "Delay" step before email (1-2 minutes)
- Prevents instant response (feels more personal)

### Multi-Step Welcome Series
Create multiple Zaps for email sequence:
1. Immediate: "Thanks for subscribing!"
2. Day before event: "Reminder: Discussion tomorrow"
3. Day after event: "Here's the recording"

### Track in Google Sheets
Add action to log all subscribers:
- Trigger: Netlify Form
- Action 1: Send Email
- Action 2: Add row to Google Sheet
- Track all signups in one place

### SendGrid Templates
Use SendGrid's template designer:
- Create beautiful email templates
- Track opens and clicks
- Better deliverability than Gmail

## Troubleshooting

### Email not sending
- Check Zapier task history for errors
- Verify email account is still connected
- Check spam folder

### Wrong data in email
- Review field mapping in Zapier
- Make sure you're using {{Email}} not {Email} (double braces)

### Zap not triggering
- Verify Netlify connection is active
- Check filter settings
- Look at Zapier task history

## Cost Estimate

**Free Tier:**
- 100 tasks/month (100 subscribers/month)
- Single-step Zaps
- 15-minute update time

**Paid Tier ($19.99/month):**
- 750 tasks/month
- Multi-step Zaps
- Faster updates (1-2 minutes)

For starting out, **free tier is perfect**!

## Next Steps After Setup

1. Monitor first few subscribers to ensure emails work
2. Ask for feedback on email content
3. Adjust template based on responses
4. Consider upgrading to SendGrid for better tracking
5. Add reminder emails for upcoming discussions

## Resources

- [Zapier + Netlify Integration](https://zapier.com/apps/netlify/integrations)
- [SendGrid Free Tier](https://sendgrid.com/pricing/)
- [Email Deliverability Best Practices](https://www.mailgun.com/blog/email/email-deliverability-best-practices/)
- [Testing Email Spam Score](https://www.mail-tester.com/)

---

**When you're ready to set this up, it should take about 10-15 minutes. Feel free to reach out if you need help!**
