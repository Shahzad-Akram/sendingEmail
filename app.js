const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const SendEmail = (text, from, subject, to) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com.',
      secure: false,
      port: 587,
      auth: {
        user: 'davidleando18@gmail.com',
        pass: 'Gotohell123',
      },
    });
    const mailOptions = {
      from,
      to,
      subject,
      html: `<h1>From: ${from}</h1>
        <p>${text}</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject();
      } else {
        resolve();
      }
    });
  });
};

app.post('/', (req, res) => {
  const { text, from, subject, to } = req.body;
  SendEmail(text, from, subject, to)
    .then((sent) => {
      res.json({
        Message: 'Email Sent!',
        status: false,
      });
    })
    .catch((err) => {
      res.json({
        Message: 'Email Not Sent!',
        status: false,
      });
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
