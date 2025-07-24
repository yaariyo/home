"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";

export default function ResetPasswordPage(props) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    if (password !== confirm) {
      setMsg("Passwords do not match.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    if (res.ok) {
      setMsg("Password reset! You can now login.");
      setTimeout(() => router.push("/login"), 1500);
    } else {
      setMsg("Invalid or expired token.");
    }
    setLoading(false);
  };

  return (
    <Layout breadcrumbTitle="Reset Password">
      <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
        <h2 className="auth-heading">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input type="password" className="form-control" placeholder="New Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <input type="password" className="form-control" placeholder="Confirm Password" value={confirm} onChange={e => setConfirm(e.target.value)} required />
          <button className="default-btn w-100" type="submit" disabled={loading}>{loading ? "Resetting..." : "Reset Password"}</button>
        </form>
        {msg && <div style={{ marginTop: 12 }}>{msg}</div>}
      </div>
    </Layout>
  );
} 