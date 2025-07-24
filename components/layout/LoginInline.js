"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginInline() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [resend, setResend] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check session on mount
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
      if (data.resend) setResend(true);
    }
    setLoading(false);
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendSuccess(false);
    try {
      const res = await fetch('/api/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setResendSuccess(true);
      } else {
        setError(data.error || 'Failed to resend verification email');
      }
    } catch (err) {
      setError('Failed to resend verification email');
    }
    setResendLoading(false);
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
      <div
        style={{
          maxWidth: 400,
          margin: "40px auto",
          padding: 24,
          border: "1px solid var(--form-border, #eee)",
          borderRadius: 8,
          background: "var(--form-bg, #fff)",
          color: "var(--form-text, #222)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
        }}
        className="login-form-container"
      >
        <h2>Welcome, {user.name || user.email}</h2>
        <button className="default-btn w-100" onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 24,
        border: "1px solid var(--form-border, #eee)",
        borderRadius: 12,
        background: "var(--form-bg, #fff)",
        color: "var(--form-text, #222)",
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
        backdropFilter: "blur(2px)",
        transition: "background 0.3s, color 0.3s, border 0.3s"
      }}
      className="login-form-container auth-form"
    >
      <h2 className="auth-heading">Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 12 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div style={{ marginBottom: 12, position: 'relative' }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="form-control"
            style={{ paddingRight: 40 }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            style={{ position: 'absolute', right: 8, top: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        {error && <div className="auth-error">{error}</div>}
        {resend && (
          <div className="auth-info" style={{ marginBottom: 16 }}>
            <span>Email not yet validated. Kindly validate or </span>
            <button type="button" className="auth-link" onClick={handleResend} disabled={resendLoading}>
              {resendLoading ? 'Sending...' : 'Resend validation link'}
            </button>
            {resendSuccess && <span style={{ color: 'green', marginLeft: 8 }}>Verification email sent!</span>}
          </div>
        )}
        <button type="submit" className="default-btn w-100" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <a href="/register" className="auth-link" style={{ marginRight: 16 }}>Register</a>
        <a href="/forgot-password" className="auth-link">Forgot Password?</a>
      </div>
    </div>
  );
} 