import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { error: "Try logging in with correct credentials!" },
        { status: 400 }
      );
    }
    const pwdCompare = await bcrypt.compare(password, existingUser.password);
    if (!pwdCompare) {
      return NextResponse.json(
        { error: "Try logging in with correct credentials" },
        { status: 400 }
      );
    }
    const data = {
      user: {
        email: existingUser.email,
        password: existingUser.password,
        isAdmin: existingUser.isAdmin,
      },
    };
    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    return NextResponse.json(
      { message: "Logged in successfully!", authToken:authToken },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
