"use client";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Header1 from "@/components/layout/Header1";
import Footer1 from "@/components/layout/Footer1";
import Image from 'next/image';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok && data.success && data.message) {
        setMsg(data.message);
      } else if (res.status === 404 && data.error) {
        setMsg("Email not registered with YaariYo");
      } else {
        setMsg(data.error || "Error sending reset link.");
      }
    } catch (err) {
      setMsg("Error sending reset link.");
    }
    setLoading(false);
  }

  return (
    <>
      <Header1 />
      <div className="register-form-container" style={{
        minHeight: 'unset',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(90deg, var(--primary-gradient-from, #6366f1) 0%, var(--primary-gradient-to, #60a5fa) 100%)',
        borderRadius: 24,
        boxShadow: '0 8px 32px 0 rgba(60,60,90,0.10)',
        margin: '40px auto',
        maxWidth: 1100,
        overflow: 'hidden',
      }}>
        {/* Left Welcome Panel */}
        <div className="register-left-panel" style={{
          flex: 1,
          background: 'linear-gradient(90deg, var(--primary-gradient-from, #6366f1) 0%, var(--primary-gradient-to, #60a5fa) 100%)',
          color: 'var(--left-panel-text, #fff)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 24px',
          minWidth: 260,
          borderRight: '2px solid #e0e7ff',
          transition: 'background 0.2s, border-radius 0.2s',
        }}>
          <Image src="/assets/img/logo/logo-dark.png" alt="YaariYo Logo" width={200} height={200} style={{ margin: 0, objectFit: 'contain', display: 'block' }} />
          <h2 style={{ fontWeight: 700, fontSize: 36, margin: 0, marginTop: 16, letterSpacing: 1, textAlign: 'center', color: '#fff' }}>Join Us</h2>
          <div style={{ fontSize: 16, color: 'var(--left-panel-tagline, rgba(255,255,255,0.85))', textAlign: 'center', fontWeight: 400, letterSpacing: 0.5, margin: '16px 0 0 0' }}>
            Yaariyo is a friendship-first, India-centric social media platform.
          </div>
          <a href="/login" style={{
            display: 'inline-block',
            background: 'var(--left-panel-btn-bg, #fff)',
            color: 'var(--left-panel-btn-text, #4f46e5)',
            fontWeight: 700,
            borderRadius: 28,
            padding: '14px 0',
            fontSize: 22,
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            marginTop: 18,
            minWidth: 220,
            textAlign: 'center',
            border: 'none',
          }}>Login</a>
          <a href="/register" style={{
            display: 'inline-block',
            background: 'transparent',
            color: 'var(--left-panel-btn-text, #fff)',
            fontWeight: 500,
            borderRadius: 28,
            padding: '10px 0',
            fontSize: 18,
            textDecoration: 'underline',
            marginTop: 8,
            minWidth: 180,
            textAlign: 'center',
            border: 'none',
          }}>Register</a>
        </div>
        {/* White box above the right panel */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(25%)',
          top: 0,
          width: 'calc(50% - 48px)',
          minWidth: 320,
          maxWidth: 540,
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 2px 16px 0 rgba(60,60,90,0.10)',
          padding: 24,
          zIndex: 2,
          marginTop: 24,
          marginBottom: 24,
          display: 'none', /* Only show on desktop, override in media query */
        }} className="forgot-white-box">
          {/* You can put any content here, or leave it empty for now */}
        </div>
        {/* Right Forgot Password Form */}
        <div className="register-right-panel" style={{
          flex: 2,
          background: 'transparent',
          borderTopRightRadius: 36,
          borderBottomRightRadius: 36,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '32px 24px',
          minWidth: 340,
          transition: 'background 0.2s, border-radius 0.2s',
        }}>
          <h2 className="auth-heading" style={{ marginBottom: 24, textAlign: 'center', color: 'var(--form-text, #222)' }}>Forgot Password</h2>
          <div style={{ background: 'var(--form-bg, #fff)', borderRadius: 18, boxShadow: '0 2px 16px 0 rgba(60,60,90,0.10)', padding: 28, width: '100%', maxWidth: 540, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{ borderRadius: 8, padding: '14px', fontSize: 16, marginBottom: 16, width: '100%', background: 'var(--input-bg, #fff)', color: 'var(--form-text, #222)', border: '1px solid #d1d5db' }}
              />
              <button type="submit" className="default-btn w-100" disabled={loading} style={{
                borderRadius: 28,
                fontWeight: 700,
                fontSize: 22,
                padding: '20px 0',
                background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
                color: '#fff',
                marginTop: 8,
                minWidth: 220,
                boxShadow: '0 4px 16px 0 rgba(60,60,90,0.10)',
                border: 'none',
                transition: 'background 0.2s',
                textAlign: 'center',
              }}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              {msg && <div style={{ marginTop: 12 }}>{msg}</div>}
            </form>
          </div>
        </div>
        <style jsx global>{`
          :root {
            --primary-gradient-from: #6366f1;
            --primary-gradient-to: #60a5fa;
            --left-panel-text: #fff;
            --left-panel-tagline: rgba(255,255,255,0.85);
            --left-panel-btn-bg: #fff;
            --left-panel-btn-text: #4f46e5;
            --form-bg: #f8fafc;
            --form-text: #222;
            --input-bg: #fff;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --primary-gradient-from: #23235a;
              --primary-gradient-to: #1e293b;
              --left-panel-text: #fff;
              --left-panel-tagline: #e0e7ff;
              --left-panel-btn-bg: #23235a;
              --left-panel-btn-text: #fff;
              --form-bg: #18181b;
              --form-text: #e0e7ff;
              --input-bg: #23235a;
            }
          }
          .register-form-container {
            color: var(--form-text) !important;
          }
          @media (max-width: 900px) {
            .register-form-container {
              flex-direction: column !important;
              max-width: 98vw !important;
            }
            .register-form-container > div {
              border-right: none !important;
              border-bottom: 1px solid #e5e7eb;
              min-width: 0 !important;
              padding: 24px 12px !important;
            }
            .register-left-panel {
              border-top-left-radius: 24px !important;
              border-top-right-radius: 24px !important;
              border-bottom-left-radius: 0 !important;
              border-bottom-right-radius: 0 !important;
              background: transparent !important;
            }
            .register-right-panel {
              border-bottom-left-radius: 24px !important;
              border-bottom-right-radius: 24px !important;
              border-top-left-radius: 0 !important;
              border-top-right-radius: 0 !important;
              background: transparent !important;
            }
          }
          @media (max-width: 600px) {
            .register-form-container {
              flex-direction: column !important;
              max-width: 100vw !important;
            }
            .register-form-container > div {
              padding: 12px 4px !important;
            }
            form {
              padding: 0 !important;
            }
            form > div {
              flex-direction: column !important;
              gap: 0 !important;
            }
            input, select {
              font-size: 16px !important;
              padding: 12px 8px !important;
              margin-bottom: 10px !important;
              width: 100% !important;
            }
          }
          @media (min-width: 900px) {
            .forgot-white-box {
              display: block !important;
            }
          }
        `}</style>
      </div>
      <Footer1 />
    </>
  );
} 