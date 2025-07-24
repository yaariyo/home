import { NextResponse } from 'next/server';
import { db } from '../../db';
import { users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER;

async function sendResetEmail(email, token) {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log('[FORGOT] Missing SMTP config');
    return false;
  }
  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: false,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      connectionTimeout: 10000
    });
    console.log('[FORGOT] Verifying SMTP connection...');
    await transporter.verify();
    console.log('[FORGOT] SMTP verified. Sending mail...');
    const resetUrl = `${BASE_URL}/reset-password?token=${token}`;
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: 'Password Reset Request',
      text: `Reset your password: ${resetUrl}`,
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`
    });
    console.log('[FORGOT] Reset mail sent to', email);
    return true;
  } catch (err) {
    console.error('[FORGOT] Error sending mail:', err);
    return false;
  }
}

export async function POST(req) {
  try {
    console.log('[FORGOT] Handler start');
    const { email } = await req.json();
    console.log('[FORGOT] Email parsed:', email);
    if (!email) {
      console.log('[FORGOT] No email provided');
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }
    const found = await db.select().from(users).where(eq(users.email, email));
    console.log('[FORGOT] DB lookup result:', found.length);
    if (found.length === 0) {
      console.log('[FORGOT] Email not registered');
      return NextResponse.json({ error: 'Not a registered email' }, { status: 404 });
    }
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = Math.floor(Date.now() / 1000) + 60 * 30; // 30 min from now
    await db.update(users)
      .set({ resetToken: token, resetTokenExpiry: expiry })
      .where(eq(users.email, email));
    console.log('[FORGOT] Token and expiry set in DB');
    const sent = await sendResetEmail(email, token);
    if (sent) {
      return NextResponse.json({ success: true, message: 'A reset link has been sent.' });
    } else {
      return NextResponse.json({ error: 'Failed to send reset email.' }, { status: 500 });
    }
  } catch (error) {
    console.error('[FORGOT] API Route Error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
} 