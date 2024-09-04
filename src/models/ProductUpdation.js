import mongoose, { Schema } from "mongoose";
const productUpdationSchema = new Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    changedKeys : {
      type : Array
    }
  },
  {
    timestamps: true,
  }
);
const ProductUpdation =
  mongoose.models.ProductUpdation || mongoose.model("ProductUpdation", productUpdationSchema);
export default ProductUpdation;
