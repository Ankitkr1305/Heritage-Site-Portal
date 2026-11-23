import mongoose, { Schema, Document } from 'mongoose';

export interface IMonument extends Document {
  slug: string;
  name: string;
  location: string;
  city: string;
  state: string;
  country: string;
  category: string;
  yearBuilt: string;
  builder: string;
  description: string;
  architecturalHighlights: string[];
  image: string;
  maxCapacity: number;
  currentVisitors: number;
  crowdStatus: 'LOW' | 'MODERATE' | 'HIGH' | 'SURGE';
  inflowRatePerMin: number;
  avgDwellTimeMinutes: number;
  gates: {
    gateName: string;
    status: 'OPEN' | 'CONGESTED' | 'DIVERTED' | 'RESTRICTED';
    currentQueueWaitMinutes: number;
    recommended: boolean;
  }[];
  ticketTiers: {
    name: string;
    price: number;
    description: string;
    currency: string;
  }[];
  timeSlots: {
    slotTime: string;
    totalSlots: number;
    availableSlots: number;
    crowdLevel: 'LOW' | 'MODERATE' | 'HIGH';
  }[];
  hourlyForecast: {
    time: string;
    expectedOccupancyPercent: number;
  }[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

const MonumentSchema = new Schema<IMonument>({
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

export default mongoose.models.Monument || mongoose.model<IMonument>('Monument', MonumentSchema);
