import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from 'google-auth-library';
import nodemailer from 'nodemailer';
import crypto from 'crypto';


const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  },
});

export default async (req, res, next) => {
  try {
    
    const token = req.body.token;

   
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

   
    const { email, picture } = ticket.getPayload();

   
    const tokenJwt = jwt.sign(
      { email: email },
      process.env.SECRET,
      { expiresIn: 60 * 60 * 24 }
    );

    
    let user = await User.findOneAndUpdate({ email: email }, { online: true }, { new: true });

    
    if (!user) {
      user = await User.create({
        email: email,
        password: null,
        photo: picture,
        role: 0,
        verify_code: crypto.randomBytes(10).toString('hex'),
      });

      
      const verificationLink = `http://localhost:5173/auth/verify?code=${user.verify_code}`;

     
      try {
        await transporter.sendMail({
          from: '"MINGA" <santiagominga7@gmail.com>',
          to: user.email,
          subject: "Verifica tu correo electrónico",
          html: `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Email Verification</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f7f7f7;
                      margin: 0;
                      padding: 0;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      min-height: 100vh;
                  }
          
                  #container {
                      max-width: 400px;
                      width: 100%;
                      background-color: #ffffff;
                      border-radius: 10px;
                      box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
                  }
          
                  #header {
                      background-color: #ff9800; /* Color naranja */
                      color: #ffffff;
                      padding: 20px;
                      text-align: center;
                      border-top-left-radius: 10px;
                      border-top-right-radius: 10px;
                  }
          
                  h1 {
                      font-size: 28px;
                      margin: 0;
                  }
          
                  #content {
                      padding: 20px;
                      text-align: center;
                  }
          
                  p {
                      font-size: 18px;
                      color: #333;
                      margin-bottom: 20px;
                  }
          
                  a {
                      display: inline-block;
                      padding: 10px 30px;
                      background-color: #ff9800; /* Color naranja */
                      color: #ffffff;
                      text-decoration: none;
                      border-radius: 5px;
                      font-size: 18px;
                      transition: background-color 0.3s ease;
                  }
          
                  a:hover {
                      background-color: #ff5722; /* Cambio de color al pasar el mouse */
                  }
              </style>
          </head>
          <body>
              <div id="container">
                  <div id="header">
                      <h1>Email Verification</h1>
                  </div>
                  <div id="content">
                      <p>Thank you for registering! Please click the following link to verify your email:</p>
                      <a href="${verificationLink}">Verify Email</a>
                  </div>
              </div>
          </body>
          </html>
          `,
        });
      } catch (error) {
        console.error("Error al enviar el correo de verificación:", error);
      }
    }

    const userData = {
      email: user.email,
      photo: user.photo,
      role: user.role,
      author: null,
      is_verified: user.verified,
    };

    
    if (!user.verified) {
      return res.status(401).json({
          message: 'User not verified',
          success: false
      });
  }

    return res.status(200).json({
      response: { token: tokenJwt, user: userData },
      message: 'User signed in with token',
      success: true
    });

  } catch (error) {
    next(error);
  }
};
