import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtToken } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    // Check Authorization header or cookie
    let token = req.cookies.get('heritage_auth_token')?.value;
    if (!token) {
      const authHeader = req.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) {
      return NextResponse.json(
        { success: false, authenticated: false, message: 'No authentication token provided.' },
        { status: 401 }
      );
    }

    // Verify JWT Token
    const payload = verifyJwtToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, authenticated: false, message: 'Invalid or expired session token.' },
        { status: 401 }
      );
    }

    // Optionally fetch latest user details from DB
    let userDetails = { ...payload };
    try {
      const { isConnected } = await connectToDatabase();
      if (isConnected) {
        const dbUser = await User.findById(payload.id).select('-passwordHash');
        if (dbUser) {
          userDetails = {
            id: dbUser._id.toString(),
            name: dbUser.name,
            email: dbUser.email,
            role: dbUser.role,
            phone: dbUser.phone,
          };
        }
      }
    } catch (e) {}

    return NextResponse.json({
      success: true,
      authenticated: true,
      user: userDetails,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, authenticated: false, message: err.message },
      { status: 500 }
    );
  }
}
