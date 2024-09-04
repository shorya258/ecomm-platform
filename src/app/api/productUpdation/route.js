import ProductUpdation from "../../../models/ProductUpdation";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
var mongoose = require('mongoose');
export async function GET() {
    try {
      await connectToDatabase();
      const productUpdations = await ProductUpdation.find({});
      return NextResponse.json(
        {productUpdations}, { status: 201 }
      );
    } catch (error) {
      console.log(error)
      return NextResponse.json(
        { error: "Failed to retrieve product updation" }, {status: 500 }
      );
    }
  }

export async function deleteProductUpdation(productId) {
  await ProductUpdation.findOneAndDelete({
    product: productId,
  });
}
