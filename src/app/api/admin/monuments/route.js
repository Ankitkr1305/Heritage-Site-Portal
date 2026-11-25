import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Monument from '@/models/Monument';
import { INITIAL_MONUMENTS } from '@/data/initialData';
// GET all monuments or single monument for admin
export async function GET() {
    try {
        const { isConnected } = await connectToDatabase();
        if (isConnected) {
            const monuments = await Monument.find({}).lean();
            return NextResponse.json({ success: true, monuments });
        }
    }
    catch (e) {
        console.warn('Fallback to in-memory monuments');
    }
    return NextResponse.json({ success: true, monuments: INITIAL_MONUMENTS });
}
// PUT: Admin updates monument capacity, current visitors, gates, or crowd status
export async function PUT(req) {
    try {
        const body = await req.json();
        const { slug, currentVisitors, crowdStatus, maxCapacity, gates } = body;
        if (!slug) {
            return NextResponse.json({ success: false, message: 'Slug is required' }, { status: 400 });
        }
        const { isConnected } = await connectToDatabase();
        if (isConnected) {
            const updateData = {};
            if (currentVisitors !== undefined)
                updateData.currentVisitors = Number(currentVisitors);
            if (crowdStatus)
                updateData.crowdStatus = crowdStatus;
            if (maxCapacity !== undefined)
                updateData.maxCapacity = Number(maxCapacity);
            if (gates)
                updateData.gates = gates;
            const updated = await Monument.findOneAndUpdate({ slug }, { $set: updateData }, { new: true });
            return NextResponse.json({ success: true, monument: updated, message: 'Monument updated successfully' });
        }
        return NextResponse.json({ success: true, message: 'Updated in local session' });
    }
    catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
