import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'santiagominga7@gmail.com',
      pass: 'Mindhub123?'
    }
  });

  transporter.verify().then(()=>{
    console.log('Ready for send emails')
  });