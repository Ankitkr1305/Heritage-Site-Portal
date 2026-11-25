import mongoose, { Schema } from 'mongoose';
const MonumentSchema = new Schema({
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, default: 'India' },
    category: { type: String, required: true },
    yearBuilt: { type: String },
    builder: { type: String },
    description: { type: String, required: true },
    architecturalHighlights: [{ type: String }],
    image: { type: String, required: true },
    maxCapacity: { type: Number, required: true },
    currentVisitors: { type: Number, required: true },
    crowdStatus: { type: String, enum: ['LOW', 'MODERATE', 'HIGH', 'SURGE'], default: 'MODERATE' },
    inflowRatePerMin: { type: Number, default: 0 },
    avgDwellTimeMinutes: { type: Number, default: 90 },
    gates: [
        {
            gateName: String,
            status: String,
            currentQueueWaitMinutes: Number,
            recommended: Boolean,
        },
    ],
    ticketTiers: [
        {
            name: String,
            price: Number,
            description: String,
            currency: { type: String, default: 'INR' },
        },
    ],
    timeSlots: [
        {
            slotTime: String,
            totalSlots: Number,
            availableSlots: Number,
            crowdLevel: String,
        },
    ],
    hourlyForecast: [
        {
            time: String,
            expectedOccupancyPercent: Number,
        },
    ],
    coordinates: {
        lat: Number,
        lng: Number,
    },
});
export default mongoose.models.Monument || mongoose.model('Monument', MonumentSchema);
