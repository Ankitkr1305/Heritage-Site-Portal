import { NextResponse } from 'next/server';
import { seedDatabaseIfEmpty } from '@/lib/dbService';
import { connectToDatabase } from '@/lib/mongodb';
export async function GET() {
    const { isConnected } = await connectToDatabase();
    const seedResult = await seedDatabaseIfEmpty();
    return NextResponse.json({
        mongoDbConnected: isConnected,
        seedResult,
        timestamp: new Date().toISOString(),
    });
}
