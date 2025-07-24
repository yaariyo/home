"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";

export default function LogoutPage() {
  const [done, setDone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/logout", { method: "POST" }).then(() => {
      setDone(true);
      setTimeout(() => router.push("/"), 1200);
    });
  }, [router]);

  return (
    <Layout breadcrumbTitle="Logout">
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
        className="logout-form-container"
      >
        <h2>{done ? "You have been logged out." : "Logging out..."}</h2>
      </div>
    </Layout>
  );
} 