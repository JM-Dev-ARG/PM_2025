import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  /*  host: 'smtp.gmail.com',
  port: 587, */
  service: 'gmail',
  /*   secure: false,  */
  auth: {
    /*  user: import.meta.env.GMAIL_USER,
    pass: import.meta.env.GMAIL_PASS, */
    user: import.meta.env.TEST_NODEMAILER_USER,
    pass: import.meta.env.TEST_NODEMAILER_PASS,
  },
});
