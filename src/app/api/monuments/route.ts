import { NextResponse } from 'next/server';
import { getMonuments } from '@/lib/dbService';

export async function GET() {
  try {
    const { data, isDbConnected } = await getMonuments();
    return NextResponse.json({
      success: true,
      isDbConnected,
      count: data.length,
      monuments: data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch monuments' },
      { status: 500 }
    );
  }
}
