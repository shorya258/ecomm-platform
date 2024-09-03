import mongoose, { Schema } from "mongoose";
const productSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    productDescription: {
      type: String,
    },
    price: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
); // department, id, image, price, productDescription, productName
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
