import mongoose, { Schema } from 'mongoose';
const AlertSchema = new Schema({
    alertId: { type: String, required: true, unique: true },
    monumentSlug: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ['ADVISORY', 'WARNING', 'DIVERSION', 'CRITICAL'], default: 'ADVISORY' },
    severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
    chokepoint: { type: String, required: true },
    message: { type: String, required: true },
    actionTaken: { type: String, required: true },
    active: { type: Boolean, default: true },
    timestamp: { type: String, default: () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
});
export default mongoose.models.Alert || mongoose.model('Alert', AlertSchema);
