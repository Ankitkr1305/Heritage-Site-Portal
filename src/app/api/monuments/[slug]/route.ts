import { NextRequest, NextResponse } from 'next/server';
import { getMonumentBySlug } from '@/lib/dbService';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const { data, isDbConnected } = await getMonumentBySlug(slug);

    if (!data) {
      return NextResponse.json(
        { success: false, message: `Monument with slug '${slug}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      isDbConnected,
      monument: data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Error fetching monument' },
      { status: 500 }
    );
  }
}
