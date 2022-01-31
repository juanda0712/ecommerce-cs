import mongoose from 'mongoose';

const zoneSchema = new mongoose.Schema(
  {
    zone: { type: String, required: true },
    district: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Zone = mongoose.models.Zone || mongoose.model('Zone', zoneSchema);
export default Zone;
