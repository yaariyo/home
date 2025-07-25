"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

const GENDERS = ["male", "female", "transgender"];

function getPasswordStrength(password) {
  if (!password) return '';
  if (password.length < 6) return 'Weak';
  if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[^A-Za-z0-9]/) && password.length >= 8) return 'Strong';
  if (password.length >= 6) return 'Medium';
  return 'Weak';
}

export default function RegisterInline() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", gender: '', dob: '', country: "India" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordStrength = getPasswordStrength(form.password);
  const [agreed, setAgreed] = useState(false);
  const [role, setRole] = useState('Employee');

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    setCaptchaError("");
    if (parseInt(captchaInput, 10) !== captchaA + captchaB) {
      setCaptchaError("Captcha answer is incorrect.");
      setLoading(false);
      return;
    }
    if (!agreed) {
      setError("You must agree to the Terms & Conditions and Privacy Policy.");
      setLoading(false);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (!form.dob) {
      setError("Date of birth is required.");
      setLoading(false);
      return;
    }
    const dobDate = new Date(form.dob);
    const age = new Date().getFullYear() - dobDate.getFullYear();
    if (age < 18 || (age === 18 && new Date() < new Date(dobDate.setFullYear(dobDate.getFullYear() + 18)))) {
      setError("You must be at least 18 years old to register.");
      setLoading(false);
      return;
    }
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        gender: form.gender,
        dob: form.dob,
        country: form.country,
      }),
    });
    if (res.ok) {
      setSuccess("Verification link sent to your email. Please verify to login.");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      const data = await res.json();
      setError(data.error || "Registration failed");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
  };

  if (user) {
    return (
      <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
        <h2>Welcome, {user.name || user.email}</h2>
        <button className="default-btn w-100" onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. 'Swaziland')", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

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
      <div style={{
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
      }} className="register-left-panel">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          <Image src="/assets/img/logo/logo-dark.png" alt="YaariYo Logo" width={200} height={200} style={{ margin: 0, objectFit: 'contain', display: 'block' }} />
          <h2 style={{ fontWeight: 700, fontSize: 36, margin: 0, marginTop: 16, letterSpacing: 1, textAlign: 'center', color: '#fff' }}>Join Us</h2>
        </div>
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
      </div>
      {/* Right Registration Form */}
      <div style={{
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
        <div style={{ background: 'var(--form-bg, #fff)', borderRadius: 18, boxShadow: '0 2px 16px 0 rgba(60,60,90,0.10)', padding: 28, width: '100%', maxWidth: 540, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <form onSubmit={handleRegister} style={{ width: '100%' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 12 }}>
              <div style={{ flex: '1 1 45%', minWidth: 180 }}>
                <input type="text" id="name" name="name" placeholder="Name *" value={form.name} onChange={handleChange} required className="form-control" style={{ borderRadius: 8, padding: '14px', fontSize: 16, marginBottom: 12, width: '100%', background: 'var(--input-bg, #fff)', color: 'var(--form-text, #222)', border: '1px solid #d1d5db' }} />
              </div>
              <div style={{ flex: '1 1 45%', minWidth: 180 }}>
                <input type="email" id="email" name="email" placeholder="Email *" value={form.email} onChange={handleChange} required className="form-control" style={{ borderRadius: 8, padding: '14px', fontSize: 16, marginBottom: 12, width: '100%', background: 'var(--input-bg, #fff)', color: 'var(--form-text, #222)', border: '1px solid #d1d5db' }} />
              </div>
              <div style={{ flex: '1 1 45%', minWidth: 180 }}>
                <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Password *" value={form.password} onChange={handleChange} required className="form-control" style={{ borderRadius: 8, padding: '14px', fontSize: 16, marginBottom: 12, width: '100%', background: 'var(--input-bg, #fff)', color: 'var(--form-text, #222)', border: '1px solid #d1d5db' }} />
              </div>
              <div style={{ flex: '1 1 45%', minWidth: 180 }}>
                <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" placeholder="Confirm Password *" value={form.confirmPassword} onChange={handleChange} required className="form-control" style={{ borderRadius: 8, padding: '14px', fontSize: 16, marginBottom: 12, width: '100%', background: 'var(--input-bg, #fff)', color: 'var(--form-text, #222)', border: '1px solid #d1d5db' }} />
              </div>
              <div style={{ flex: '1 1 45%', minWidth: 180 }}>
                <input type="date" id="dob" name="dob" placeholder="Date of Birth *" value={form.dob} onChange={handleChange} required className="form-control" style={{ borderRadius: 8, padding: '14px', fontSize: 16, marginBottom: 12, width: '100%', background: 'var(--input-bg, #fff)', color: 'var(--form-text, #222)', border: '1px solid #d1d5db' }} />
              </div>
              <div style={{ flex: '1 1 45%', minWidth: 180 }}>
                <select id="country" name="country" value={form.country} onChange={handleChange} className="form-control" required style={{ borderRadius: 8, padding: '14px', fontSize: 16, marginBottom: 12, width: '100%', background: 'var(--input-bg, #fff)', color: 'var(--form-text, #222)', border: '1px solid #d1d5db' }}>
                  <option value="">Select Country *</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
              <label style={{ fontWeight: 500, marginRight: 8 }}>Gender:</label>
              <label style={{ marginRight: 12 }}><input type="radio" name="gender" value="male" checked={form.gender === 'male'} onChange={handleChange} required /> Male</label>
              <label style={{ marginRight: 12 }}><input type="radio" name="gender" value="female" checked={form.gender === 'female'} onChange={handleChange} required /> Female</label>
              <label><input type="radio" name="gender" value="transgender" checked={form.gender === 'transgender'} onChange={handleChange} required /> Transgender</label>
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required style={{ marginRight: 8 }} />
                I agree to the <a href="/terms" target="_blank" style={{ color: '#6366f1', textDecoration: 'underline', margin: '0 4px' }}>Terms & Conditions</a> and <a href="/privacy" target="_blank" style={{ color: '#6366f1', textDecoration: 'underline', margin: '0 4px' }}>Privacy Policy</a>
              </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: 12 }}>
              <label htmlFor="register-captcha" style={{ fontWeight: 500, marginRight: 8 }}>
                What is {captchaA} + {captchaB}?
              </label>
              <input
                id="register-captcha"
                type="number"
                value={captchaInput}
                onChange={e => setCaptchaInput(e.target.value)}
                style={{ width: 60, marginLeft: 8, borderRadius: 6, border: '1px solid #d1d5db', padding: '6px 8px' }}
                required
              />
            </div>
            {captchaError && <div style={{ color: "#dc2626", marginBottom: 10, fontWeight: 500 }}>{captchaError}</div>}
            {error && <div style={{ color: "#dc2626", marginBottom: 10, fontWeight: 500 }}>{error}</div>}
            {success && <div style={{ color: "#059669", marginBottom: 10, fontWeight: 500 }}>{success}</div>}
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
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Responsive and dark mode styles */}
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