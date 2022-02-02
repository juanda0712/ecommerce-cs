import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderProducts: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      phoneNumber: { type: Number, required: true },
      address: { type: String, default: 'No location' },
      zone: { type: String, default: 'No location' },
    },
    paymentMethod: { type: String, required: true },
    deliveryMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    orderAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
