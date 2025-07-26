import React from 'react';
import Header1 from "@/components/layout/Header1";
import Footer1 from "@/components/layout/Footer1";

export default function PrivacyPage() {
  return (
    <>
      <Header1 />
      <div style={{ maxWidth: 800, margin: '40px auto', padding: 32, background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)' }}>
        <h1>Privacy Policy</h1>
        <p>YaariYo is committed to protecting your privacy and handling your personal data in compliance with the Information Technology Act, 2000 (IT Act) and other applicable laws in India.</p>
        <h2>1. Data Collection</h2>
        <ul>
          <li>We collect personal information you provide during registration and use of our platform, such as name, email, gender, date of birth, and country.</li>
          <li>We may collect usage data, device information, and cookies to improve our services.</li>
        </ul>
        <h2>2. Use of Data</h2>
        <ul>
          <li>Your data is used to provide, maintain, and improve our services, and to communicate with you.</li>
          <li>We do not sell or rent your personal data to third parties.</li>
          <li>We may share data with law enforcement if required by law or to protect our rights and users.</li>
        </ul>
        <h2>3. Data Storage & Security</h2>
        <ul>
          <li>Your data is stored securely using reasonable security practices as required by the IT Act, 2000.</li>
          <li>We take steps to protect your data from unauthorized access, alteration, or disclosure.</li>
        </ul>
        <h2>4. User Rights</h2>
        <ul>
          <li>You may access, update, or request deletion of your personal data by contacting us at support@yaariyo.com.</li>
          <li>You may opt out of non-essential communications at any time.</li>
        </ul>
        <h2>5. Changes to Privacy Policy</h2>
        <ul>
          <li>We may update this policy from time to time. Continued use of the platform constitutes acceptance of the revised policy.</li>
        </ul>
        <p>If you have any questions about this Privacy Policy, please contact us at support@yaariyo.com.</p>
      </div>
      <Footer1 />
    </>
  );
} 