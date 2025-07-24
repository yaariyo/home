import { NextResponse } from 'next/server';
import { db } from '../../db';
import { users } from '@/drizzle/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm/sql/expressions/conditions';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, password, mobile, country } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 });
    }
    // Check if user already exists
    let existing = [];
    try {
      existing = await db.select().from(users).where(eq(users.email, email));
    } catch (queryErr) {
      console.error('Failed query:', queryErr);
      existing = [];
    }
    if (Array.isArray(existing) && existing.length > 0) {
      return NextResponse.json({ error: 'Email already registered.' }, { status: 409 });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationTokenExpiry = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour from now (in seconds)
    // Insert user (always provide createdAt, resetToken, resetTokenExpiry)
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      mobile,
      country,
      createdAt: new Date(),
      resetToken: null,
      resetTokenExpiry: null,
      emailVerified: false,
      emailVerificationToken,
      emailVerificationTokenExpiry,
    });

    // Send verification email
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
      html: `<p>Thank you for registering with YaariYo!</p><p>Please verify your email by clicking the link below:</p><p><a href="${verificationUrl}">${verificationUrl}</a></p>`
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Registration error:', err, err?.stack);
    return NextResponse.json({ error: err.message || 'Registration failed.' }, { status: 500 });
  }
} 