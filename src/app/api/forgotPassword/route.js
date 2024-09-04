import { Resend } from 'resend';
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS , "creds");
const resend = new Resend('re_3YKKHEbA_GZuZCfXP5jRY91EguQjJJZH3');

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

  try {
    resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'LOGIN LINK ON FORGOT PASSWORD',
      html: `This link is valid for one hour only.
      <br><p>${magicLink}</p>`,
    }).then(res => console.log(res))
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
