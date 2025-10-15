import transporter from '../config/mailer';

const sendVerificationEmail = async (email: string, token: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Please verify your email address',
    text: `Click the link to verify your email: ${process.env.FRONTEND_URL}/verifymail/${token}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendPassowrdResetEmail = async (email: string, token: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Please use below link to reset your password',
    text: `Click the link to reset your password: ${process.env.FRONTEND_URL}/reset-password/${token}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export { sendVerificationEmail, sendPassowrdResetEmail };
