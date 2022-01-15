import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    featuredImage: { type: String },
    isAvailable: { type: Boolean, required: true },
    isFeatured: { type: Boolean, required: true, default: false },
    isPromotion: { type: Boolean, required: true, default: false },
    isCombo: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
