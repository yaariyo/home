import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER;

export async function POST(req) {
  try {
    console.log('[SMTP API] Handler start');
    const { email } = await req.json();
    console.log('[SMTP API] Email parsed:', email);
    if (!email) {
      console.log('[SMTP API] No email provided');
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }
    try {
      console.log('[SMTP API] SMTP DEBUG:');
      console.log('SMTP_HOST:', SMTP_HOST);
      console.log('SMTP_PORT:', SMTP_PORT);
      console.log('SMTP_USER:', SMTP_USER);
      console.log('FROM_EMAIL:', FROM_EMAIL);
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: false,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
        connectionTimeout: 10000
      });
      console.log('[SMTP API] Transporter created. Verifying connection...');
      await transporter.verify();
      console.log('[SMTP API] SMTP connection verified. Sending mail...');
      await transporter.sendMail({
        from: FROM_EMAIL,
        to: email,
        subject: 'SMTP Test Email',
        text: 'This is a test email from your YaariYo app SMTP configuration.',
        html: '<p>This is a <b>test email</b> from your YaariYo app SMTP configuration.</p>'
      });
      console.log('[SMTP API] Mail sent successfully. Returning JSON.');
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('[SMTP API] SMTP Test Error:', error);
      return NextResponse.json({ success: false, error: error.message });
    }
  } catch (error) {
    console.error('[SMTP API] API Route Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Unknown error' });
  }
} 