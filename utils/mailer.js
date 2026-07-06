const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text, html, attachments }) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('========================================================');
    console.warn('WARNING: SMTP email credentials are not fully configured.');
    console.warn('Please define SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in backend/.env');
    console.warn('Email details that would have been sent:');
    console.warn(`To: ${to}`);
    console.warn(`Subject: ${subject}`);
    console.warn(`Body: ${text}`);
    if (attachments && attachments.length > 0) {
      console.warn(`Attachments: ${attachments.map(a => a.filename).join(', ')}`);
    }
    console.warn('========================================================');
    return { success: true, mocked: true };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || '587', 10),
    secure: SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const mailOptions = {
    from: SMTP_FROM || SMTP_USER,
    to,
    subject,
    text,
    html,
    attachments,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent successfully:', info.messageId);
  return { success: true, messageId: info.messageId };
};

module.exports = { sendEmail };
