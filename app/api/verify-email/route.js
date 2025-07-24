import { db } from '../../db';
import { users } from '../../../drizzle/schema';
import { eq, and, gte } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { token } = await req.json();
  if (!token) return NextResponse.json({ error: 'Token required' }, { status: 400 });
  const now = Math.floor(Date.now() / 1000);
  const found = await db.select().from(users).where(and(eq(users.emailVerificationToken, token), gte(users.emailVerificationTokenExpiry, now)));
  if (!found.length) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  }
  if (found[0].emailVerified) {
    return NextResponse.json({ already: true, message: 'Email already verified.' });
  }
  await db.update(users)
    .set({ emailVerified: 1, emailVerificationToken: null, emailVerificationTokenExpiry: null })
    .where(eq(users.id, found[0].id));
  return NextResponse.json({ success: true });
} 