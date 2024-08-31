import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");
export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, isAdmin } = body;
    if (!isAdmin || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields"},{ status: 400 }
      );
    }
    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }
    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password:secPass,
      isAdmin,
    });
    await newUser.save();
    return NextResponse.json(
      { message: "User registered successfully" }, { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to register user" }, {status: 500 }
    );
  }
}
