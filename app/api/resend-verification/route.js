import { db } from '../../db';
import { users } from '../../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(req) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });
  const found = await db.select().from(users).where(eq(users.email, email));
  if (!found.length) return NextResponse.json({ error: 'Email not registered' }, { status: 400 });
  const user = found[0];
  if (user.emailVerified) return NextResponse.json({ error: 'Email already verified' }, { status: 400 });
  const emailVerificationToken = crypto.randomBytes(32).toString('hex');
  const emailVerificationTokenExpiry = Math.floor(Date.now() / 1000) + 60 * 60;
  await db.update(users)
    .set({ emailVerificationToken, emailVerificationTokenExpiry })
    .where(eq(users.id, user.id));
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/verify-email?token=${emailVerificationToken}`;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'YaariYo - Email Verification',
    html: `<p>Please verify your email by clicking the link below:</p><p><a href="${verificationUrl}">${verificationUrl}</a></p>`
  });
  return NextResponse.json({ success: true });
} 