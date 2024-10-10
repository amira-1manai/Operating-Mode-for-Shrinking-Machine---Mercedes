import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    // Removed the brand and quantity fields
    category: { type: ObjectId, ref: "Category", required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    wireSectionMm2: { type: Number, required: true },
    contactReference: { type: Number, required: true },
    refrenceTubeShrumph: { type: Number, required: true },
    heaterDistance: { type: Number, required: true },
    topHeatingPlate: { type: Number, required: true, default: 600 },
    programNumber: { type: Number, required: true },
    refrenceFrame: { type: String, required: true },
    cycleTime: { type: Number, required: true },
    fi: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
