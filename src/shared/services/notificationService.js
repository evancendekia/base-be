import { sendEmail } from "./emailService.js";

export const sendTestEmail = async (recipient) => {
  const subject = "Test Email from Evan Cendekia Website";

  const html = `
    <h1>Email Test Successful</h1>
    <p>This is a manually triggered email.</p>
  `;

  await sendEmail({
    to: recipient,
    subject,
    html
  });
};

export const sendWelcomeEmail = async (recipient, name) => {

  const subject = "Welcome to Evan Cendekia Articles";

  const html = `
    <div style="
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    ">
      
      <h2>Welcome${name ? `, ${name}` : ""}! </h2>

      <p>
        Thank you for joining <strong>Evan Cendekia Articles</strong>.
      </p>

      <p>
        Your account has been successfully created and you can now:
      </p>

      <ul>
        <li>Explore articles</li>
        <li>Save your preferences</li>
        <li>Access premium content</li>
      </ul>

      <p>
        We’re excited to have you with us!
      </p>

      <br/><br/>

      <p style="color: #888; font-size: 14px;">
        If you did not create this account, please ignore this email.
      </p>

      <hr/>

      <p style="font-size: 12px; color: #aaa;">
        © ${new Date().getFullYear()} Evan Cendekia. All rights reserved.
      </p>

    </div>
  `;

  await sendEmail({
    to: recipient,
    subject,
    html,
  });

};

