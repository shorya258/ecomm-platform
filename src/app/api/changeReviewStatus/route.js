import Review from "../../../models/Review";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
export async function PUT(req) {
    try {
      const body = await req.json();
      const { review, adminEmail, status} = body;
      console.log("review",review);
      if (!review._id || !review.productDetails || !adminEmail || !status ) {
        return NextResponse.json(
          { error: "Missing review fields", review, adminEmail, status},{ status: 400 }
        );
      }
      await connectToDatabase();
      const objectId=review._id;
      await Review.findByIdAndUpdate(objectId,{
        adminEmail,
        status
      })
      .then(()=>{
        console.log("success")
      })
      .catch((error)=>{
        console.log("failed", error)
      })
      return NextResponse.json(
        { message: "product changed successfully by the admin" }, { status: 201 }
      );
    } catch (error) {
      console.log(error)
      return NextResponse.json(
        { error: "Failed to add the product" }, {status: 500 }
      );
    }
  }