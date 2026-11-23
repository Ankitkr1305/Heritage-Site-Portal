import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword, signJwtToken, setAuthCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide full name, email, and password.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const assignedRole = role === 'officer' || role === 'admin' ? 'officer' : 'tourist';

    // Securely hash password with bcrypt
    const hashedPassword = await hashPassword(password);

    let userCreated: any = null;
    let isDb = false;

    try {
      const { isConnected } = await connectToDatabase();
      if (isConnected) {
        isDb = true;
        const existing = await User.findOne({ email: normalizedEmail });
        if (existing) {
          return NextResponse.json(
            { success: false, message: 'An account with this email already exists. Please sign in.' },
            { status: 400 }
          );
        }

        const newUser = await User.create({
          name: name.trim(),
          email: normalizedEmail,
          phone: phone ? phone.trim() : '',
          passwordHash: hashedPassword,
          role: assignedRole,
        });

        userCreated = {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
        };
      }
    } catch (e: any) {
      console.warn('MongoDB register error, using fallback:', e.message);
    }

    // In-memory fallback if DB unavailable
    if (!userCreated) {
      userCreated = {
        id: `usr_${Date.now()}`,
        name: name.trim(),
        email: normalizedEmail,
        phone: phone ? phone.trim() : '',
        role: assignedRole,
      };
    }

    // Generate signed JWT access token with payload
    const token = signJwtToken({
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
      role: userCreated.role,
      phone: userCreated.phone,
    });

    const response = NextResponse.json({
      success: true,
      message: `Account registered successfully as ${userCreated.role === 'officer' ? 'ASI Officer' : 'Visitor'}!`,
      token,
      user: userCreated,
      isDbConnected: isDb,
    });

    // Attach signed JWT cookie to response
    return setAuthCookie(response, token);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Registration failed.' },
      { status: 500 }
    );
  }
}
