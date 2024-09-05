import Review from "../../../models/Review";
import { connectToDatabase } from "@/lib/mongoose";
import Product from "../../../models/Product";
import { NextResponse } from "next/server";
import ProductUpdation from "../../../models/ProductUpdation";
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
    const oldProduct = await Product.findById(productDetails._id);
    const newReview = new Review({
      userEmail,
      adminEmail,
      status,
      productName : productDetails.productName,
      price : productDetails.price,
      image : productDetails.image,
      productDescription : productDetails.productDescription,
      department : productDetails.department,
      product : oldProduct._id
    });

    await newReview.save();
    // console.log(productDetails, "productDetails")

    const keys = Object.keys(Product.schema.paths);
    // console.log(keys , "keys")
    let changedValuesList = []
    keys.forEach(key => {
      if(oldProduct[key] != productDetails[key]) {
        changedValuesList.push(key);
      }
    })
    // console.log(changedValuesList);
    createProductUpdationByDetails(oldProduct, changedValuesList)
    return NextResponse.json(
      { message: "product for review successfully" }, { status: 201 }
    );
  } catch (error) {
    console.log(error, "error")
    return NextResponse.json(
      { error: "Failed to add the product for review" }, {status: 500 }
    );
  }
}
async function createProductUpdationByDetails(product , changedValuesList) {
  try {
      
      // console.log(product, changedValuesList);
      await connectToDatabase();
      // console.log("existingProductUpdation1");
      const existingProductUpdation = await ProductUpdation.findOne({
          product : product._id
      });
      // console.log(existingProductUpdation, "existingProductUpdation");
      if (existingProductUpdation) {
        existingProductUpdation.changedKeys = [
          ...new Set([
            ...existingProductUpdation.changedKeys,
            ...changedValuesList,
          ]),
        ];
        await existingProductUpdation.save();
        return NextResponse.json(
          { message: "Product Updation modified successfully" },
          { status: 201 }
        );
      } else {
        const newProductUpdation = new ProductUpdation({
          product : product._id,
          changedKeys: changedValuesList,
        });
        await newProductUpdation.save();
        return {
          success: true,
          message: "Product Updation created successfully",
        };
      }
    } catch (error) {
      console.log(error, "error");
      return NextResponse.json(
        { error: "Product Updation creation failed" },
        { status: 500 }
      );
    }
}