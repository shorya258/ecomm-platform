import Product from "@/models/Product";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
const axios= require('axios');
const apiURL = "https://64e0caef50713530432cafa1.mockapi.io/api/products";
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
// export async function GET(){
//   console.log("axios fn called")
//   const res=await axios.get(apiURL);
//   const products=res.data;

//   // _id: parseInt(product.id),
//   const validProducts = products.map(product => ({
//     id:product.id,
//     productName: product.productName,
//     department: product.department,
//     productDescription: product.productDescription,
//     price: product.price,
//     image: product.image,
//   }));
//   const savedProducts = await Product.insertMany(validProducts);
//   return NextResponse.json({ savedProducts }, { status: 201 });
// }
