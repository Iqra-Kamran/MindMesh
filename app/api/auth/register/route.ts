// app/api/auth/register/route.ts
/*
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/lib/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ message: "Username already taken" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    // Auto-login after registration
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '7d' });

    const response = NextResponse.json({ success: true, redirectTo: '/dashboard' });

    (await cookies()).set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
*/

// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Username already taken" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      password: hashedPassword,
    });

    return NextResponse.json(
      { success: true, message: "Registration successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}