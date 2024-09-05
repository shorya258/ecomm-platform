import Product from "../../../models/Product";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { createProductUpdationByDetails } from "../productUpdation/route";
const axios= require('axios');
const mongoose = require('mongoose');
const apiURL = "https://64e0caef50713530432cafa1.mockapi.io/api/products";
export async function PUT(req) {
  try {
    const body = await req.json();
    const { product} = body;
    // console.log("product",product);
    if (!product._id || !product.productName ) {
      return NextResponse.json(
        { error: "Missing required fields"},{ status: 400 }
      );
    }
    await connectToDatabase();
    const objectId=product._id;
    await Product.findByIdAndUpdate(objectId,{
      id:product.id,
      productName:product.productName,
      department:product.department,
      productDescription: product.productDescription,
      price: product.price,
      image: product.image
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
