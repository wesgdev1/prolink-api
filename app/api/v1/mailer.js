import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const message = {
  from: "Prolink Comunicaciones",
  to: "willienn@hotmail.com",
  subject: "Bienvenido a Prolink Comunicaciones",
  text: "Bienvenido a Prolink Comunicaciones",
  html: "<b>Bienvenido a Prolink Comunicaciones</b>",
};
