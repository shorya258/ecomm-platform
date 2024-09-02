import Product from "@/models/Product";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
export async function POST() {
  try {
    await connectToDatabase();
    const products = await Product.find({});
    return NextResponse.json(
      {products }, { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add the product" }, {status: 500 }
    );
  }
}
