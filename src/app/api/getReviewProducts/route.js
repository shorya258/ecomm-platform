import Review from "@/models/Review";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const body = await req.json();
    const { email, user, requestStatus } = body;
    if (!email || !user || !requestStatus) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    await connectToDatabase();
    let reviews = {};
    // if request status is pending, send all pending products for admin as admin=null
    if (requestStatus === "pending" && user === "admin") {
      reviews = await Review.find({ status: "pending" });
    } 

    else if (requestStatus !== "pending" && user === "admin") {
        reviews = await Review.find({ adminEmail: email });
        // filter on the basis of products admin rejected or approved
    }
    else if(user === "team member"){
       reviews = await Review.find({ userEmail: email, status: requestStatus });
       // filter on the basis of products changes by user got rejected or approved
     }

    if (!reviews) {
      return NextResponse.json(
        { error: "Try adding in with correct details!" },
        { status: 400 }
      );
    }
    // console.log(reviews)
    return NextResponse.json({ reviews }, { status: 201 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
