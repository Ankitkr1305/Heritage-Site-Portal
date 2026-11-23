import { NextResponse } from 'next/server';
import { getSensors } from '@/lib/dbService';

export async function GET() {
  try {
    const { data, isDbConnected } = await getSensors();
    return NextResponse.json({
      success: true,
      isDbConnected,
      sensors: data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch sensors' },
      { status: 500 }
    );
  }
}
