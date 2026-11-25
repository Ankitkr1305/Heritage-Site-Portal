import mongoose, { Schema } from 'mongoose';
const BookingSchema = new Schema({
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
export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
