import { NextResponse } from 'next/server';
import { db } from '../../db';
import { users } from '@/drizzle/schema';
import bcrypt from 'bcryptjs';
import { eq, and, gte } from 'drizzle-orm';

export async function POST(req) {
  const { token, password } = await req.json();
  if (!token || !password) return NextResponse.json({ error: 'Missing token or password' }, { status: 400 });
  const now = Math.floor(Date.now() / 1000);
  const found = await db.select().from(users)
    .where(and(
      eq(users.resetToken, token),
      gte(users.resetTokenExpiry, now)
    ));
  if (found.length === 0) return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  const hashed = await bcrypt.hash(password, 10);
  await db.update(users)
    .set({ password: hashed, resetToken: null, resetTokenExpiry: null })
    .where(eq(users.id, found[0].id));
  return NextResponse.json({ success: true });
} 