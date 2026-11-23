import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword, comparePassword, signJwtToken, setAuthCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide both email and password.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    let foundUser: any = null;
    let isDb = false;

    try {
      const { isConnected } = await connectToDatabase();
      if (isConnected) {
        isDb = true;

        // Auto-seed demo accounts into MongoDB with bcrypt hashes if not yet created
        const adminCount = await User.findOne({ email: 'officer@heritage.gov.in' });
        if (!adminCount) {
          const officerHash = await hashPassword('officer123');
          await User.create({
            name: 'Dr. Vikramaditya (ASI Superintendent)',
            email: 'officer@heritage.gov.in',
            phone: '+91 99887 76655',
            passwordHash: officerHash,
            role: 'officer',
          });
          const adminHash = await hashPassword('admin123');
          await User.create({
            name: 'Inspector Rajesh Kumar (ASI Master Admin)',
            email: 'admin@asi.gov.in',
            phone: '+91 98112 33445',
            passwordHash: adminHash,
            role: 'officer',
          });
          const touristHash = await hashPassword('password123');
          await User.create({
            name: 'Ankit Verma',
            email: 'ankit@example.com',
            phone: '+91 98765 43210',
            passwordHash: touristHash,
            role: 'tourist',
          });
        }

        // Search user in database
        const dbUser = await User.findOne({ email: normalizedEmail });
        if (dbUser) {
          const isPasswordValid = await comparePassword(password, dbUser.passwordHash);
          if (isPasswordValid) {
            foundUser = {
              id: dbUser._id.toString(),
              name: dbUser.name,
              email: dbUser.email,
              phone: dbUser.phone,
              role: dbUser.role,
            };
          } else {
            return NextResponse.json(
              { success: false, message: 'Invalid password. Please check and try again.' },
              { status: 401 }
            );
          }
        }
      }
    } catch (e: any) {
      console.warn('MongoDB query warning:', e.message);
    }

    // Default fallback demo accounts if MongoDB is completely offline
    if (!foundUser) {
      if (normalizedEmail === 'ankit@example.com' && password === 'password123') {
        foundUser = {
          id: 'usr_demo_1',
          name: 'Ankit Verma',
          email: 'ankit@example.com',
          phone: '+91 98765 43210',
          role: 'tourist',
        };
      } else if (
        (normalizedEmail === 'officer@heritage.gov.in' ||
          normalizedEmail === 'admin@asi.gov.in' ||
          normalizedEmail === 'admin@heritage.gov.in') &&
        (password === 'officer123' || password === 'admin123')
      ) {
        foundUser = {
          id: 'usr_officer_1',
          name: 'Inspector Rajesh Kumar (ASI Superintendent)',
          email: normalizedEmail,
          phone: '+91 99887 76655',
          role: 'officer',
        };
      } else {
        return NextResponse.json(
          {
            success: false,
            message: 'Invalid email or password. Use demo credentials or register a new account.',
          },
          { status: 401 }
        );
      }
    }

    // Sign JWT access token with payload
    const token = signJwtToken({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      phone: foundUser.phone,
    });

    const response = NextResponse.json({
      success: true,
      message: `Signed in successfully as ${foundUser.role === 'officer' ? 'ASI Officer' : foundUser.name}!`,
      token,
      user: foundUser,
      isDbConnected: isDb,
    });

    // Attach signed JWT cookie to response
    return setAuthCookie(response, token);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Authentication error.' },
      { status: 500 }
    );
  }
}
