import mongoose, { Schema } from "mongoose";
const reviewSchema = new Schema(
  {
    userEmail:{
        type:String,
        required:true,
    },
    adminEmail:{
      type:String,
    },
    status:{
      type:String,
      required:true,
    },
    productDetails:{
      
      productName: {
        type: String,
        required: true,
      },
      
      price:{
          type:String,
      },
      image:{
        type: String,
      },
      productDescription:{
        type: String,
      },
      department: {
        type: String,
      },
      id: {
        type: Number,
        required: true,
      }
    },
  },
  { 
    timestamps: true
 }
); // department, id, image, price, productDescription, productName
const Review= mongoose.models.reviewSchema|| mongoose.model("Review", reviewSchema)
export default Review;