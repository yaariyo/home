'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Layout from '../../components/layout/Layout';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No token provided.');
      return;
    }
    fetch('/api/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          if (data.already) {
            setStatus('already');
            setMessage('Email already verified.');
          } else {
            setStatus('success');
            setMessage('Email verification done. Kindly login.');
          }
        } else {
          setStatus('error');
          setMessage(data.error || 'Verification failed.');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Verification failed.');
      });
  }, [token]);

  return (
    <Layout>
      <div className="container" style={{ minHeight: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 40 }}>
        <h2 className="auth-heading">Email Verification</h2>
        {status === 'verifying' && <p>Verifying your email...</p>}
        {status !== 'verifying' && <p>{message}</p>}
        {status === 'success' && (
          <a href="/login" className="default-btn" style={{ marginTop: 24 }}>Go to Login</a>
        )}
        {status === 'already' && (
          <a href="/login" className="default-btn" style={{ marginTop: 24 }}>Go to Login</a>
        )}
      </div>
    </Layout>
  );
} 