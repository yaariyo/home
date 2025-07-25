"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function LoginInline() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Captcha state
  const [captchaA, setCaptchaA] = useState(() => Math.floor(Math.random() * 10) + 1);
  const [captchaB, setCaptchaB] = useState(() => Math.floor(Math.random() * 10) + 1);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  useEffect(() => {
    fetch("/api/session").then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setCaptchaError("");
    if (parseInt(captchaInput, 10) !== captchaA + captchaB) {
      setCaptchaError("Captcha answer is incorrect.");
      setLoading(false);
      return;
    }
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      setUser((await fetch("/api/session").then(r => r.json())).user);
      setError("");
      router.push("/");
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    setEmail("");
    setPassword("");
    setError("");
  };

  if (user) {
    return (
      <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
        <h2>Welcome, {user.name || user.email}</h2>
        <button className="default-btn w-100" onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
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
        <a href="/register" style={{
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
        }}>Register</a>
      </div>
      {/* Right Login Form */}
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
        <h2 className="auth-heading" style={{ marginBottom: 24, textAlign: 'center', color: 'var(--form-text, #222)' }}>Login</h2>
        <div style={{ background: 'var(--form-bg, #fff)', borderRadius: 18, boxShadow: '0 2px 16px 0 rgba(60,60,90,0.10)', padding: 28, width: '100%', maxWidth: 540, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <div style={{ marginBottom: 16 }}>
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="form-control" style={{ borderRadius: 8, padding: '14px', fontSize: 16, marginBottom: 12, width: '100%', background: 'var(--input-bg, #fff)', color: 'var(--form-text, #222)', border: '1px solid #d1d5db' }} />
            </div>
            <div style={{ marginBottom: 16, position: 'relative' }}>
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="form-control" style={{ borderRadius: 8, padding: '14px', fontSize: 16, width: '100%', background: 'var(--input-bg, #fff)', color: 'var(--form-text, #222)', border: '1px solid #d1d5db', paddingRight: 40 }} />
              <button type="button" onClick={() => setShowPassword((v) => !v)} style={{ position: 'absolute', right: 8, top: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }} tabIndex={-1} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <div style={{ marginBottom: 16, textAlign: 'center' }}>
              <label htmlFor="login-captcha" style={{ fontWeight: 500, marginRight: 8 }}>
                What is {captchaA} + {captchaB}?
              </label>
              <input
                id="login-captcha"
                type="number"
                value={captchaInput}
                onChange={e => setCaptchaInput(e.target.value)}
                style={{ width: 60, marginLeft: 8, borderRadius: 6, border: '1px solid #d1d5db', padding: '6px 8px' }}
                required
              />
            </div>
            {captchaError && <div style={{ color: "#dc2626", marginBottom: 10, fontWeight: 500 }}>{captchaError}</div>}
            {error && <div style={{ color: "#dc2626", marginBottom: 10, fontWeight: 500 }}>{error}</div>}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <button type="submit" className="default-btn" disabled={loading} style={{
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
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div style={{ marginTop: 18, textAlign: 'center' }}>
              <a href="/forgot-password" style={{ color: '#6366f1', textDecoration: 'underline', fontWeight: 500, fontSize: 16 }}>Forgot Password?</a>
            </div>
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
      `}</style>
    </div>
  );
} 