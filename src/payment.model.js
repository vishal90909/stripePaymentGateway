import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

const payment = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  userName: {
    type: String,
  },
  paymentId: {
    type: String,
  }
})

export const paymentModel = mongoose.model('Payment', payment);
