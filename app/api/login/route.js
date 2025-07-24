import { NextResponse } from 'next/server';
import { db } from '../../db';
import { users } from '@/drizzle/schema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm/sql/expressions/conditions';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }
    // Find user
    const found = await db.select().from(users).where(eq(users.email, email));
    if (found.length === 0) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }
    const user = found[0];
    // Check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }
    if (!user.emailVerified) {
      return NextResponse.json({ error: 'Email not yet validated', resend: true }, { status: 403 });
    }
    // Create JWT
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    // Set cookie
    const res = NextResponse.json({ success: true });
    res.cookies.set('session', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Login failed.' }, { status: 500 });
  }
} 