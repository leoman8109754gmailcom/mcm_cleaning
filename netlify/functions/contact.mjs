import formData from 'form-data';
import Mailgun from 'mailgun.js';

/**
 * Sends an email using Mailgun with the provided form data
 * @param {string} data - JSON stringified form data
 */
async function sendEmailWithFormInfo(data) {
  const emailBody = JSON.parse(data);

  // Get environment variables
  const {
    MG_FROM: emailFrom,
    MG_TO: emailTo,
    MG_KEY: apiKey,
    MG_DOMAIN: domain,
    MG_TEMPLATE: template
  } = process.env;

  // Validate environment variables
  if (!apiKey || !domain || !emailFrom || !emailTo) {
    throw new Error('Missing required environment variables. Please check MG_KEY, MG_DOMAIN, MG_FROM, and MG_TO.');
  }
console.log(process.env, "creds: ");
  // Initialize Mailgun client
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({ username: 'api', key: apiKey });

  // Prepare email data
  const mailData = template
    ? {
        // Use Mailgun template if specified
        from: emailFrom,
        to: emailTo,
        subject: `New contact form submission from ${emailBody.name}`,
        template: template,
        'h:X-Mailgun-Variables': data
      }
    : {
        // Plain HTML email without template
        from: emailFrom,
        to: emailTo,
        subject: `New Contact Request from ${emailBody.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: #17616E; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
              <h2 style="margin: 0;">New Contact Form Submission</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">McKenna's Cleaning Services</p>
            </div>

            <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <div style="margin-bottom: 20px;">
                <h3 style="color: #17616E; margin: 0 0 5px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Contact Information</h3>
                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 6px; margin-top: 10px;">
                  <p style="margin: 8px 0;"><strong>Name:</strong> ${emailBody.name}</p>
                  <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${emailBody.email}" style="color: #17616E;">${emailBody.email}</a></p>
                  <p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${emailBody.phone}" style="color: #17616E;">${emailBody.phone}</a></p>
                </div>
              </div>

              <div style="margin-bottom: 20px;">
                <h3 style="color: #17616E; margin: 0 0 5px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Service Request</h3>
                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 6px; margin-top: 10px;">
                  <p style="margin: 0; white-space: pre-wrap;">${emailBody.service}</p>
                </div>
              </div>

              ${emailBody.preferredDatetime ? `
              <div style="margin-bottom: 20px;">
                <h3 style="color: #17616E; margin: 0 0 5px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Preferred Date/Time</h3>
                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 6px; margin-top: 10px;">
                  <p style="margin: 0;">${emailBody.preferredDatetime}</p>
                </div>
              </div>
              ` : ''}

              ${emailBody.message ? `
              <div style="margin-bottom: 20px;">
                <h3 style="color: #17616E; margin: 0 0 5px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Additional Message</h3>
                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 6px; margin-top: 10px;">
                  <p style="margin: 0; white-space: pre-wrap;">${emailBody.message}</p>
                </div>
              </div>
              ` : ''}

              <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #f0f0f0; text-align: center; color: #999; font-size: 12px;">
                <p>This email was sent from the McKenna's Cleaning Services contact form</p>
                <p>Submitted on ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}</p>
              </div>
            </div>
          </div>
        `,
        text: `
New Contact Form Submission - McKenna's Cleaning Services

CONTACT INFORMATION:
Name: ${emailBody.name}
Email: ${emailBody.email}
Phone: ${emailBody.phone}

SERVICE REQUEST:
${emailBody.service}

${emailBody.preferredDatetime ? `PREFERRED DATE/TIME:\n${emailBody.preferredDatetime}\n\n` : ''}${emailBody.message ? `ADDITIONAL MESSAGE:\n${emailBody.message}\n\n` : ''}
---
Submitted on ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
        `
      };

  try {
    await mg.messages.create(domain, mailData);
  } catch (error) {
    console.error('Mailgun error:', error);
    throw new Error('Failed to send email. Please try again or contact us directly.');
  }
}

/**
 * Netlify Function handler
 * @param {Object} event - Netlify event object
 */
const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse and validate the request body
    let formData;
    try {
      formData = JSON.parse(event.body);
    } catch (parseError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid JSON in request body' })
      };
    }

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'service'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: `Missing required fields: ${missingFields.join(', ')}`
        })
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }

    // Send the email
    await sendEmailWithFormInfo(event.body);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Email sent successfully',
        success: true
      })
    };
  } catch (error) {
    console.error('Handler error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || 'An unexpected error occurred. Please try again later.'
      })
    };
  }
};

export { handler };
