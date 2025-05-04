import { createTransport } from "nodemailer";

//* HTML content
const getHTMLContent = (activationLink) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Email Activation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background: #fff;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .header img {
      width: 100%;
      border-radius: 10px 10px 0 0;
    }
    h2 {
      color: #313033;
    }
    p {
      font-size: 16px;
      color: #313033;
    }
    .btn {
      display: inline-block;
      margin-top: 20px;
      padding: 7px 30px;
      background-color: #0B5D5D;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      margin-bottom:10px;
    }
    .footer {
      margin-top: 30px;
      font-size: 13px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://i.imgur.com/xmLPDgh.png" alt="Activate Your Email">
    </div>
    <h2>Welcome to VELVORIA!</h2>
    <p>Thanks for signing up. Please confirm your email address to activate your email.</p>
    <a href="${activationLink}" target="_blank" class="btn">Activate Email</a>
    <p class="footer">If you didn’t sign up, please ignore this email.</p>
  </div>
</body>
</html>`;

//* create nodemailer transporter
const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_NODE_MAILER_EMAIL,
    pass: process.env.USER_APP_NODE_MAILER_PASS,
  },
});

//* send email function
const sendEmail = async (to, activationLink) => {
  try {
    await transporter.sendMail({
      from: `"VELVORIA" <${process.env.USER_NODE_MAILER_EMAIL}>`,
      to: to ? to : process.env.USER_NODE_MAILER_EMAIL,
      subject: "Email Activation",
      html: getHTMLContent(activationLink),
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
