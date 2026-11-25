import { connectToDatabase } from './mongodb';
import Monument from '@/models/Monument';
import Sensor from '@/models/Sensor';
import Booking from '@/models/Booking';
import Alert from '@/models/Alert';
import { INITIAL_MONUMENTS, INITIAL_SENSORS, INITIAL_ALERTS, } from '@/data/initialData';
// In-memory fallback stores
let inMemoryMonuments = [...INITIAL_MONUMENTS];
let inMemorySensors = [...INITIAL_SENSORS];
let inMemoryAlerts = [...INITIAL_ALERTS];
let inMemoryBookings = [
    {
        bookingId: 'PASS-TM-88219',
        monumentSlug: 'taj-mahal',
        monumentName: 'Taj Mahal',
        visitorName: 'Rajesh Sharma',
        email: 'rajesh.sharma@example.com',
        phone: '+91 98765 43210',
        date: '2026-11-23',
        timeSlot: '08:30 - 11:00 (Morning Peak)',
        ticketTier: 'Indian Citizen Ticket',
        ticketCount: 2,
        totalAmount: 100,
        qrCodeToken: 'HERITAGE-PASS-TM-88219-SECURE-AUTH-2026',
        status: 'CONFIRMED',
        gateAssigned: 'East Gate (Near Shilpgram)',
        createdAt: new Date().toISOString(),
    },
    {
        bookingId: 'PASS-VAR-49120',
        monumentSlug: 'varanasi-ghats',
        monumentName: 'Varanasi Ghats & Kashi Vishwanath',
        visitorName: 'Elena Rostova',
        email: 'elena.rostova@travel.org',
        phone: '+44 7911 123456',
        date: '2026-11-23',
        timeSlot: '18:30 - 21:00 (Maha Aarti Peak Surge)',
        ticketTier: 'Ganga Aarti Terrace Reserved',
        ticketCount: 1,
        totalAmount: 450,
        qrCodeToken: 'HERITAGE-PASS-VAR-49120-SECURE-AUTH-2026',
        status: 'CONFIRMED',
        gateAssigned: 'Ganga Dwar (Riverfront Corridor)',
        createdAt: new Date().toISOString(),
    },
];
// Helper to seed MongoDB when connected
export async function seedDatabaseIfEmpty() {
    const { conn, isConnected } = await connectToDatabase();
    if (!isConnected || !conn)
        return { seeded: false, reason: 'MongoDB not connected' };
    try {
        for (const m of INITIAL_MONUMENTS) {
            await Monument.findOneAndUpdate({ slug: m.slug }, { $set: m }, { upsert: true, new: true });
        }
        for (const s of INITIAL_SENSORS) {
            await Sensor.findOneAndUpdate({ sensorCode: s.sensorCode }, { $set: s }, { upsert: true, new: true });
        }
        const alertCount = await Alert.countDocuments();
        if (alertCount === 0) {
            await Alert.insertMany(INITIAL_ALERTS);
        }
        return { seeded: true, count: INITIAL_MONUMENTS.length };
    }
    catch (err) {
        console.error('Error during auto-seed:', err.message);
        return { seeded: false, error: err.message };
    }
}
// Get all monuments
export async function getMonuments() {
    try {
        const { isConnected } = await connectToDatabase();
        if (isConnected) {
            await seedDatabaseIfEmpty();
            const docs = await Monument.find({}).lean();
            if (docs && docs.length > 0) {
                return { data: docs, isDbConnected: true };
            }
        }
    }
    catch (e) {
        console.warn('Fallback to in-memory monuments');
    }
    return { data: inMemoryMonuments, isDbConnected: false };
}
// Get single monument
export async function getMonumentBySlug(slug) {
    try {
        const { isConnected } = await connectToDatabase();
        if (isConnected) {
            const doc = await Monument.findOne({ slug }).lean();
            if (doc) {
                return { data: doc, isDbConnected: true };
            }
        }
    }
    catch (e) {
        console.warn('Fallback to in-memory monument');
    }
    const found = inMemoryMonuments.find((m) => m.slug === slug) || null;
    return { data: found, isDbConnected: false };
}
// Get sensors
export async function getSensors() {
    try {
        const { isConnected } = await connectToDatabase();
        if (isConnected) {
            const docs = await Sensor.find({}).lean();
            if (docs && docs.length > 0) {
                return { data: docs, isDbConnected: true };
            }
        }
    }
    catch (e) {
        console.warn('Fallback to in-memory sensors');
    }
    return { data: inMemorySensors, isDbConnected: false };
}
// Get alerts
export async function getAlerts() {
    try {
        const { isConnected } = await connectToDatabase();
        if (isConnected) {
            const docs = await Alert.find({ active: true }).sort({ timestamp: -1 }).lean();
            if (docs && docs.length > 0) {
                return { data: docs, isDbConnected: true };
            }
        }
    }
    catch (e) {
        console.warn('Fallback to in-memory alerts');
    }
    return { data: inMemoryAlerts.filter((a) => a.active), isDbConnected: false };
}
// Create new alert / trigger intervention
export async function createAlert(alertPayload) {
    const newAlert = {
        alertId: `ALT-${Date.now().toString().slice(-6)}`,
        monumentSlug: alertPayload.monumentSlug || 'taj-mahal',
        title: alertPayload.title || 'Manual Crowd Intervention Initiated',
        type: alertPayload.type || 'DIVERSION',
        severity: alertPayload.severity || 'high',
        chokepoint: alertPayload.chokepoint || 'Central Concourse',
        message: alertPayload.message || 'Intervention trigger deployed by command center.',
        actionTaken: alertPayload.actionTaken || 'Gates throttled. Dynamic electronic signage updated.',
        active: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST',
    };
    try {
        const { isConnected } = await connectToDatabase();
        if (isConnected) {
            await Alert.create(newAlert);
        }
    }
    catch (e) {
        // Keep in memory
    }
    inMemoryAlerts.unshift(newAlert);
    return newAlert;
}
// Get bookings
export async function getBookings() {
    try {
        const { isConnected } = await connectToDatabase();
        if (isConnected) {
            const docs = await Booking.find({}).sort({ createdAt: -1 }).lean();
            if (docs && docs.length > 0) {
                return docs;
            }
        }
    }
    catch (e) {
        console.warn('Fallback to in-memory bookings');
    }
    return inMemoryBookings;
}
// Create new booking with smart slot allocation
export async function createBooking(payload) {
    const monument = inMemoryMonuments.find((m) => m.slug === payload.monumentSlug);
    const monumentName = monument ? monument.name : 'Heritage Destination';
    // Find tier price
    const tier = monument?.ticketTiers.find((t) => t.name === payload.ticketTier);
    const price = tier ? tier.price : 50;
    const totalAmount = price * payload.ticketCount;
    // Best recommended gate
    const recommendedGate = monument?.gates.find((g) => g.recommended)?.gateName || 'Primary Entrance Gate';
    const bookingId = `PASS-${payload.monumentSlug.slice(0, 3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const qrCodeToken = `HERITAGE-PASS-${bookingId}-${Date.now().toString(36).toUpperCase()}`;
    const bookingDoc = {
        bookingId,
        monumentSlug: payload.monumentSlug,
        monumentName,
        visitorName: payload.visitorName,
        email: payload.email,
        phone: payload.phone,
        date: payload.date,
        timeSlot: payload.timeSlot,
        ticketTier: payload.ticketTier,
        ticketCount: payload.ticketCount,
        totalAmount,
        qrCodeToken,
        status: 'CONFIRMED',
        gateAssigned: recommendedGate,
        createdAt: new Date().toISOString(),
    };
    // Reduce slot in memory monument
    if (monument) {
        const slot = monument.timeSlots.find((s) => s.slotTime === payload.timeSlot);
        if (slot && slot.availableSlots >= payload.ticketCount) {
            slot.availableSlots -= payload.ticketCount;
            if (slot.availableSlots < 300) {
                slot.crowdLevel = 'HIGH';
            }
        }
    }
    let isDb = false;
    try {
        const { isConnected } = await connectToDatabase();
        if (isConnected) {
            isDb = true;
            await Booking.create(bookingDoc);
            // Also update slot in mongo
            await Monument.updateOne({ slug: payload.monumentSlug, 'timeSlots.slotTime': payload.timeSlot }, { $inc: { 'timeSlots.$.availableSlots': -payload.ticketCount } });
        }
    }
    catch (e) {
        // fallback
    }
    inMemoryBookings.unshift(bookingDoc);
    return {
        success: true,
        booking: bookingDoc,
        isDbConnected: isDb,
    };
}
