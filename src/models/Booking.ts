import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  bookingId: string;
  monumentSlug: string;
  monumentName: string;
  visitorName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  ticketTier: string;
  ticketCount: number;
  totalAmount: number;
  qrCodeToken: string;
  status: 'CONFIRMED' | 'CHECKED_IN' | 'EXPIRED' | 'CANCELLED';
  gateAssigned: string;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  bookingId: { type: String, required: true, unique: true },
  monumentSlug: { type: String, required: true },
  monumentName: { type: String, required: true },
  visitorName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  ticketTier: { type: String, required: true },
  ticketCount: { type: Number, required: true, min: 1 },
  totalAmount: { type: Number, required: true },
  qrCodeToken: { type: String, required: true },
  status: { type: String, enum: ['CONFIRMED', 'CHECKED_IN', 'EXPIRED', 'CANCELLED'], default: 'CONFIRMED' },
  gateAssigned: { type: String, default: 'Recommended East Gate' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
