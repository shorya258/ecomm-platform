import Review from "@/models/Review";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const body = await req.json();
    const { userEmail, adminEmail, status, productDetails } = body;
    if (!userEmail || !status || !productDetails) {
      return NextResponse.json(
        { error: "Missing required fields"},{ status: 400 }
      );
    }
    await connectToDatabase();
    const newReview = new Review({
      userEmail,
      adminEmail,
      status,
      productDetails
    });
    await newReview.save();
    // console.log(first)
    return NextResponse.json(
      { message: "product for review successfully" }, { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add the product for review" }, {status: 500 }
    );
  }
}
