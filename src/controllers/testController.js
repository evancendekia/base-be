import { sendTestEmail } from "../services/notificationService.js";

export const triggerTestEmail = async (req, res) => {
  const { to } = req.body;

  if (!to) {
    return res.status(400).json({
      success: false,
      message: "Recipient email is required"
    });
  }

  try {
    await sendTestEmail(to);

    return res.json({
      success: true,
      message: "Email sent successfully"
    });
  } catch (error) {
    console.error("Email Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to send email"
    });
  }
};
