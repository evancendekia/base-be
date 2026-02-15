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
