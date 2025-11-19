import { transporter } from "./smtp.config.js";
import {
  DONATION_SUCCESS_EMAIL_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

const senderEmail = `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USER}>`;

export const sendVerificationEmail = async (email, name, verificationToken) => {
  try {
    const info = await transporter.sendMail({
      from: senderEmail,
      to: email,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE({
        userName: name,
        verificationCode: verificationToken,
      }),
    });

    console.log("Verification email sent:", info.messageId);
  } catch (error) {
    console.error("Failed to send verification email", error);
    throw new Error(`Verification email error: ${error}`);
  }
};

export const sendDonationSuccessEmail = async (
  email,
  amount,
  campaignTitle
) => {
  try {
    const info = await transporter.sendMail({
      from: senderEmail,
      to: email,
      subject: "🎉Your Donation was Successful!",
      html: DONATION_SUCCESS_EMAIL_TEMPLATE({
        amount,
        campaignTitle,
      }),
    });

    console.log("Donation success email sent:", info.messageId);
  } catch (error) {
    console.error("Failed to send donation success email", error);
    throw new Error(`Donation success email error: ${error}`);
  }
};
