import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const into = await transport.sendMail({
        from: "Inngest TMS",
        to, 
        subject,
        text,
    })

    console.log("Message sent:", info.messageId);
    return info
    
  } catch (error) {
    console.log("❌ Mail error", error.message)
  }
};
