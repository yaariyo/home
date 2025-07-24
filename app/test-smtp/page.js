"use client";
import { useState } from "react";

export default function TestSmtpPage() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleTest(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    const res = await fetch("/api/test-smtp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 12, background: "var(--form-bg, #fff)", color: "var(--form-text, #222)", boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)", backdropFilter: "blur(2px)" }}>
      <h2 className="auth-heading">Test SMTP</h2>
      <form onSubmit={handleTest}>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ marginBottom: 12 }}
        />
        <button type="submit" className="default-btn w-100" disabled={loading}>
          {loading ? "Sending..." : "Send Test Email"}
        </button>
      </form>
      {result && (
        <div style={{ marginTop: 16, color: result.success ? "green" : "red" }}>
          {result.success ? "Test email sent!" : `Error: ${result.error}`}
        </div>
      )}
    </div>
  );
} 