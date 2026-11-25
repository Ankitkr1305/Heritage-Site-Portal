import { NextResponse } from 'next/server';
import { getBookings, createBooking } from '@/lib/dbService';
export async function GET() {
    try {
        const bookings = await getBookings();
        return NextResponse.json({
            success: true,
            bookings,
        });
    }
    catch (error) {
        return NextResponse.json({ success: false, message: error.message || 'Failed to fetch bookings' }, { status: 500 });
    }
}
export async function POST(req) {
    try {
        const body = await req.json();
        const { monumentSlug, visitorName, email, phone, date, timeSlot, ticketTier, ticketCount } = body;
        if (!monumentSlug || !visitorName || !email || !date || !timeSlot || !ticketTier) {
            return NextResponse.json({ success: false, message: 'Please provide all required fields' }, { status: 400 });
        }
        const result = await createBooking({
            monumentSlug,
            visitorName,
            email,
            phone: phone || '+91 99999 99999',
            date,
            timeSlot,
            ticketTier,
            ticketCount: Number(ticketCount) || 1,
        });
        return NextResponse.json(result);
    }
    catch (error) {
        return NextResponse.json({ success: false, message: error.message || 'Booking creation failed' }, { status: 500 });
    }
}
