import postmark from "postmark";

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  return client.sendEmail({
    From: process.env.EMAIL_FROM,
    To: to,
    Subject: subject,
    HtmlBody: html,
    MessageStream: "outbound"
  });
};
