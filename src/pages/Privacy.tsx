import React from 'react';
import Footer from '../components/Footer';

const Privacy: React.FC = () => {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Privacy Policy</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Last Updated: October 24, 2025</p>

      <section style={{ marginBottom: '30px' }}>
        <h2>1. Information We Collect</h2>
        <h3>Information You Provide:</h3>
        <ul>
          <li>Email address (if you create an account)</li>
          <li>Reading preferences and saved articles</li>
          <li>Subscription information</li>
        </ul>
        <h3>Automatically Collected:</h3>
        <ul>
          <li>Browser type and device information</li>
          <li>IP address and location data</li>
          <li>Usage data (pages viewed, articles clicked)</li>
          <li>Cookies and local storage</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>Provide personalized news recommendations</li>
          <li>Improve our services</li>
          <li>Send newsletters (with your consent)</li>
          <li>Analyze usage patterns</li>
          <li>Prevent fraud and ensure security</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>3. Information Sharing</h2>
        <p>We do NOT sell your personal information. We may share data with:</p>
        <ul>
          <li>Service providers (hosting, analytics)</li>
          <li>Legal authorities (when required by law)</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>4. Cookies and Tracking</h2>
        <p>
          We use cookies for authentication, preferences, and analytics. 
          You can control cookies through your browser settings.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>5. Data Storage</h2>
        <p>
          Your data is stored securely using industry-standard encryption. 
          We use Supabase for database storage and Vercel for hosting.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Request data deletion</li>
          <li>Opt-out of marketing emails</li>
          <li>Export your data</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>7. Children&apos;s Privacy</h2>
        <p>Our service is not intended for users under 13 years old.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>8. Changes to Privacy Policy</h2>
        <p>We may update this policy. Continued use after changes constitutes acceptance.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>9. Contact Us</h2>
        <p>Privacy concerns? Email: privacy@watchman.news</p>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
