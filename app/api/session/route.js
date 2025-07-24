import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export async function GET(req) {
  try {
    const cookie = req.cookies.get('session');
    if (!cookie) {
      return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
    }
    const token = cookie.value;
    const user = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid or expired session.' }, { status: 401 });
  }
} 