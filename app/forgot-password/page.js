"use client";
import { useState } from "react";
import Layout from "@/components/layout/Layout";

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
    <Layout breadcrumbTitle="Forgot Password">
      <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
        <h2 className="auth-heading">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ marginBottom: 16 }}
          />
          <button type="submit" className="default-btn w-100" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {msg && <div style={{ marginTop: 12 }}>{msg}</div>}
      </div>
    </Layout>
  );
} 