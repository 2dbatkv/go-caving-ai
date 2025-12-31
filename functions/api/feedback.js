/**
 * CloudFlare Pages Function - Feedback Form Handler
 * Endpoint: /api/feedback
 *
 * This function handles feedback and topic suggestion form submissions.
 * It validates the data and sends it to the admin via email.
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // Parse form data
    const formData = await request.formData();
    const name = formData.get('name') || 'Anonymous';
    const email = formData.get('email') || 'Not provided';
    const message = formData.get('message');
    const topicSuggestions = formData.get('topic-suggestions') || '';
    const feedbackType = formData.get('feedback-type') || 'general';

    // Basic validation
    if (!message || message.trim().length < 10) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Please provide a message with at least 10 characters.'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate email if provided
    if (email !== 'Not provided' && !isValidEmail(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Please provide a valid email address or leave it blank.'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Honeypot spam check
    const botField = formData.get('bot-field');
    if (botField) {
      // Silently reject spam
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Thank you for your feedback!'
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Send notification email to admin
    const emailSent = await sendFeedbackEmail(env, {
      name: name,
      email: email,
      message: message,
      topicSuggestions: topicSuggestions,
      feedbackType: feedbackType,
      timestamp: new Date().toISOString()
    });

    if (!emailSent) {
      console.error('Failed to send feedback email');
      // Still return success to user, but log the error
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for your feedback! We appreciate your input and will review it soon.'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );

  } catch (error) {
    console.error('Feedback error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred. Please try again later.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Send feedback email using configured email service
async function sendFeedbackEmail(env, data) {
  // Check which email service is configured
  if (env.RESEND_API_KEY) {
    return await sendViaResend(env, data);
  } else if (env.SENDGRID_API_KEY) {
    return await sendViaSendGrid(env, data);
  } else if (env.MAILGUN_API_KEY) {
    return await sendViaMailgun(env, data);
  } else {
    console.warn('No email service configured. Set RESEND_API_KEY, SENDGRID_API_KEY, or MAILGUN_API_KEY in CloudFlare Pages settings.');
    return false;
  }
}

// Resend email service (Recommended - simplest API)
async function sendViaResend(env, data) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: env.ADMIN_EMAIL_FROM || 'noreply@gocaving.ai',
        to: env.ADMIN_EMAIL_TO || 'admin@gocaving.ai',
        subject: `New Feedback from ${data.name}`,
        html: `
          <h2>New Feedback Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Feedback Type:</strong> ${data.feedbackType}</p>
          <hr>
          <h3>Message:</h3>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
          ${data.topicSuggestions ? `
            <hr>
            <h3>Topic Suggestions:</h3>
            <p>${data.topicSuggestions.replace(/\n/g, '<br>')}</p>
          ` : ''}
          <hr>
          <p><small>Submitted: ${data.timestamp}</small></p>
        `
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Resend error:', error);
    return false;
  }
}

// SendGrid email service
async function sendViaSendGrid(env, data) {
  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: env.ADMIN_EMAIL_TO || 'admin@gocaving.ai' }],
          subject: `New Feedback from ${data.name}`
        }],
        from: { email: env.ADMIN_EMAIL_FROM || 'noreply@gocaving.ai' },
        content: [{
          type: 'text/html',
          value: `
            <h2>New Feedback Submission</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Feedback Type:</strong> ${data.feedbackType}</p>
            <hr>
            <h3>Message:</h3>
            <p>${data.message.replace(/\n/g, '<br>')}</p>
            ${data.topicSuggestions ? `
              <hr>
              <h3>Topic Suggestions:</h3>
              <p>${data.topicSuggestions.replace(/\n/g, '<br>')}</p>
            ` : ''}
            <hr>
            <p><small>Submitted: ${data.timestamp}</small></p>
          `
        }]
      })
    });

    return response.ok;
  } catch (error) {
    console.error('SendGrid error:', error);
    return false;
  }
}

// Mailgun email service
async function sendViaMailgun(env, data) {
  try {
    const domain = env.MAILGUN_DOMAIN;
    const formData = new FormData();
    formData.append('from', env.ADMIN_EMAIL_FROM || `noreply@${domain}`);
    formData.append('to', env.ADMIN_EMAIL_TO || 'admin@gocaving.ai');
    formData.append('subject', `New Feedback from ${data.name}`);
    formData.append('html', `
      <h2>New Feedback Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Feedback Type:</strong> ${data.feedbackType}</p>
      <hr>
      <h3>Message:</h3>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
      ${data.topicSuggestions ? `
        <hr>
        <h3>Topic Suggestions:</h3>
        <p>${data.topicSuggestions.replace(/\n/g, '<br>')}</p>
      ` : ''}
      <hr>
      <p><small>Submitted: ${data.timestamp}</small></p>
    `);

    const response = await fetch(
      `https://api.mailgun.net/v3/${domain}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`api:${env.MAILGUN_API_KEY}`)}`
        },
        body: formData
      }
    );

    return response.ok;
  } catch (error) {
    console.error('Mailgun error:', error);
    return false;
  }
}
