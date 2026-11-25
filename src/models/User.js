import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, default: '' },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['tourist', 'officer', 'admin'], default: 'tourist' },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.models.User || mongoose.model('User', UserSchema);
