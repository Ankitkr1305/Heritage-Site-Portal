import { NextResponse } from 'next/server';
import { getAlerts, createAlert } from '@/lib/dbService';
export async function GET() {
    try {
        const { data, isDbConnected } = await getAlerts();
        return NextResponse.json({
            success: true,
            isDbConnected,
            alerts: data,
        });
    }
    catch (error) {
        return NextResponse.json({ success: false, message: error.message || 'Failed to fetch alerts' }, { status: 500 });
    }
}
export async function POST(req) {
    try {
        const body = await req.json();
        const alert = await createAlert(body);
        return NextResponse.json({
            success: true,
            alert,
        });
    }
    catch (error) {
        return NextResponse.json({ success: false, message: error.message || 'Failed to create alert' }, { status: 500 });
    }
}
