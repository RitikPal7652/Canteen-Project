import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      variant: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'upi'],
    default: 'cash'
  },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'completed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
