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
    productName: {
      type: String,
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
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  },
  { 
    timestamps: true
 }
); // department, id, image, price, productDescription, productName
const Review= mongoose.models.Review|| mongoose.model("Review", reviewSchema)
export default Review;