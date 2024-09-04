import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
// Set up your email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // or any other email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS , "creds");

export async function POST(req) {
  const body = await req.json();
  const { email} = body;
  if (!email) {
    return NextResponse.json(
      { error: 'Email is required' },
      { status: 400 }
    );
  }
  console.log(email);
  // Create a token with a secret key
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  console.log(token);
  // Construct the magic link
  const magicLink = `${process.env.API_URL}/api/oneTimeLogin/?token=${token}`;
  console.log(magicLink);
  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your One Time Link To Login',
    text:"TEST TEXT"
    // html: `<p>Click <a href="${magicLink}">here</a> to log in.</p>`,
  };

  try {
    transporter.sendMail(mailOptions).then(res => console.log(res));
    return NextResponse.json(
        { message: 'Magic link sent!' },
        { status: 200 }
      );
  } catch (error) {
    return NextResponse.json(
        { error: 'Error sending email' },
        { status: 500 }
      );
  }
}
