"use server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function onMailer({
  email,
  subject,
  html,
}: {
  email?: string;
  subject: string;
  html: string;
}) {
  if (
    !process.env.NEXT_PUBLIC_NODE_MAILER_EMAIL ||
    !process.env.NEXT_PUBLIC_NODE_MAILER_PASSWORD
  ) {
    console.error(
      "Email configuration missing: NEXT_PUBLIC_NODE_MAILER_EMAIL or NEXT_PUBLIC_NODE_MAILER_PASSWORD not set"
    );
    throw new Error("Email configuration missing");
  }

  const transport = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.NEXT_PUBLIC_NODE_MAILER_EMAIL,
      pass: process.env.NEXT_PUBLIC_NODE_MAILER_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.NEXT_PUBLIC_NODE_MAILER_EMAIL,
    to: email || process.env.NEXT_PUBLIC_NODE_MAILER_EMAIL,
    subject: subject || "Email from your app",
    html: html,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          console.error("Error sending email:", err);
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return { message: "Email sent" };
  } catch (err) {
    console.error("Failed to send email:", err);
    throw new Error(
      err instanceof Error ? err.message : "Failed to send email"
    );
  }
}
