export const VERIFICATION_EMAIL_TEMPLATE = ({
  userName,
  verificationCode,
  verificationLink,
  supportEmail,
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Verify Your Email - Aidly Donations</title>
</head>
<body style="margin:0; padding:0; font-family: 'Segoe UI', Arial, sans-serif; background-color:#f5f8fa;">

  <!-- Header -->
  <div style="background-color: #0d9488; padding: 20px; text-align: center;">
    <h1 style="margin: 0; color: #ffffff; font-size: 22px;">Aidly Donations</h1>
  </div>

  <!-- Body -->
  <div style="background-color: #ffffff; max-width: 600px; margin: 30px auto; padding: 30px; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.08);">
    <h2 style="color: #0d9488; margin-bottom: 10px;">Verify Your Email!</h2>
    <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 10px;">
      Hello, <strong>${userName}</strong> 👋<br/>
      Enter this code on the verification page. For security reasons, this code will expire in <strong>15 minutes</strong>.
    </p>

    <!-- Verification Code -->
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 1.8rem; font-weight: bold; letter-spacing: 6px; color: #2563eb; background-color:#eff6ff; padding:10px 20px; border-radius:8px; display:inline-block;">
        ${verificationCode}
      </span>
    </div>
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">
  </div>

  <!-- Footer -->
  <div style="background-color: #f0fdfa; padding: 15px 20px; text-align: center;">
    <p style="font-size: 12px; color: #777; margin: 0;">
      © ${new Date().getFullYear()} Aidly Donations. All rights reserved.
    </p>
  </div>
</body>
</html>
`;

// Add this new template
export const DONATION_SUCCESS_EMAIL_TEMPLATE = ({
  donorName,
  amount,
  campaignTitle,
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Thank You for Your Donation - Aidly Donations</title>
</head>
<body style="margin:0; padding:0; font-family: 'Segoe UI', Arial, sans-serif; background-color:#f5f8fa;">

  <!-- Header -->
  <div style="background-color: #0d9488; padding: 20px; text-align: center;">
    <h1 style="margin: 0; color: #ffffff; font-size: 22px;">Aidly Donations</h1>
  </div>

  <!-- Body -->
  <div style="background-color: #ffffff; max-width: 600px; margin: 30px auto; padding: 30px; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.08);">
    <h2 style="color: #0d9488; margin-bottom: 10px;">Thank You for Your Donation! 🎉</h2>
    <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 10px;">
      Dear <strong>${donorName}</strong>,
    </p>
    <p style="font-size: 16px; color: #333; line-height: 1.6;">
      We received your generous donation of <strong style="color: #0d9488;">$${amount}</strong> towards <strong>${campaignTitle}</strong>.
    </p>
    <p style="font-size: 16px; color: #555; line-height: 1.6; margin-top: 20px;">
      Your support helps make a real difference. Thank you for contributing! 💚
    </p>
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">
  </div>

  <!-- Footer -->
  <div style="background-color: #f0fdfa; padding: 15px 20px; text-align: center;">
    <p style="font-size: 12px; color: #777; margin: 0;">
      © ${new Date().getFullYear()} Aidly Donations. All rights reserved.
    </p>
  </div>
</body>
</html>
`;