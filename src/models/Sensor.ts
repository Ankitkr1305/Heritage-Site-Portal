import mongoose, { Schema, Document } from 'mongoose';

export interface ISensor extends Document {
  sensorCode: string;
  name: string;
  location: string;
  monumentSlug: string;
  monumentName: string;
  peopleInView: number;
  crowdDensity: number; // people per sq meter
  status: 'NORMAL' | 'HIGH' | 'VERY_HIGH' | 'CRITICAL';
  statusLabel: string;
  solarPowered: boolean;
  batteryPercentage: number;
  flowRatePerMin: number;
  pressureKPa: number;
  throughputRate: number;
  detections: {
    pedestrians: number;
    children: number;
    wheelchairs: number;
    vehicles: number;
  };
  lastInference: string;
  historyTimeline: {
    time: string;
    occupancy: number;
    density: number;
  }[];
}

const SensorSchema = new Schema<ISensor>({
  sensorCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  monumentSlug: { type: String, required: true },
  monumentName: { type: String, required: true },
  peopleInView: { type: Number, default: 0 },
  crowdDensity: { type: Number, default: 0 },
  status: { type: String, enum: ['NORMAL', 'HIGH', 'VERY_HIGH', 'CRITICAL'], default: 'NORMAL' },
  statusLabel: { type: String, default: 'NORMAL' },
  solarPowered: { type: Boolean, default: true },
  batteryPercentage: { type: Number, default: 98 },
  flowRatePerMin: { type: Number, default: 45 },
  pressureKPa: { type: Number, default: 1.2 },
  throughputRate: { type: Number, default: 85 },
  detections: {
    pedestrians: { type: Number, default: 0 },
    children: { type: Number, default: 0 },
    wheelchairs: { type: Number, default: 0 },
    vehicles: { type: Number, default: 0 },
  },
  lastInference: { type: String, default: 'Just now' },
  historyTimeline: [
    {
      time: String,
      occupancy: Number,
      density: Number,
    },
  ],
});

export default mongoose.models.Sensor || mongoose.model<ISensor>('Sensor', SensorSchema);
