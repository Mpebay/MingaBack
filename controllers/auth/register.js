import User from '../../models/User.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  },
});

async function create(req, res, next) {
  

  let {
    email,
    password,
    photo,
    role
  } = req.body


  try {

    const newUser = await User.create({
      email,
      password,
      photo,
      role,
      verify_code: crypto.randomBytes(10).toString('hex')
    })

    
    const verificationLink = `http://localhost:5173/auth/verify?code=${newUser.verify_code}`;

 
    try {
      await transporter.sendMail({
        from: '"Verificación de correo" <santiagominga7@gmail.com>',
        to: newUser.email,
        subject: "Verifica tu correo electrónico",
        html: `<p>Por favor, haz clic en el siguiente enlace para verificar tu correo electrónico:</p>
             <a href="${verificationLink}">${verificationLink}</a>`,
      });
    } catch (error) {
      console.error("Error al enviar el correo de verificación:", error);
    }

    res.json({
      response: newUser,
      message: 'User created successfully'
    });
  } catch (error) {
    console.log(error)
  }
}



export default create;
