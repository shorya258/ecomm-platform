import Product from "@/models/Product";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const body = await req.json();
    const { id, productName,department, productDescription, price, image } = body;
    if (!id || !productName ) {
      return NextResponse.json(
        { error: "Missing required fields"},{ status: 400 }
      );
    }
    await connectToDatabase();
    const newProduct = new Product({
      id,
      productName,
      department,
      productDescription,
      price,
      image
    });
    await newProduct.save();
    return NextResponse.json(
      { message: "product added successfully" }, { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add the product" }, {status: 500 }
    );
  }
}
