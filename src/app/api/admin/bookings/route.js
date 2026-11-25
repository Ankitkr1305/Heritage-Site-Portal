import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { getBookings } from '@/lib/dbService';
export async function GET() {
    try {
        const bookings = await getBookings();
        return NextResponse.json({ success: true, count: bookings.length, bookings });
    }
    catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
// PUT: Admin check-in or status update for a booking
export async function PUT(req) {
    try {
        const { bookingId, status } = await req.json();
        if (!bookingId || !status) {
            return NextResponse.json({ success: false, message: 'Booking ID and status required' }, { status: 400 });
        }
        const { isConnected } = await connectToDatabase();
        if (isConnected) {
            const updated = await Booking.findOneAndUpdate({ bookingId }, { $set: { status } }, { new: true });
            return NextResponse.json({ success: true, booking: updated, message: `Pass ${bookingId} updated to ${status}` });
        }
        return NextResponse.json({ success: true, message: `Updated status to ${status}` });
    }
    catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
