import React from 'react';
import Footer from '../components/Footer';

const Terms: React.FC = () => {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Terms of Service</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Last Updated: October 24, 2025</p>

      <section style={{ marginBottom: '30px' }}>
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing Watchman News Aggregator, you agree to these Terms of Service.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>2. Service Description</h2>
        <p>
          Watchman is a news aggregation service that collects headlines and brief excerpts from 
          various news sources. We provide links to original articles hosted by publishers.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>3. Content Ownership</h2>
        <p>
          All news content displayed on Watchman belongs to the original publishers. 
          We only display headlines, brief excerpts (under 150 characters), and links to original sources.
          All copyrights remain with original content creators.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>4. User Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use automated systems to scrape content</li>
          <li>Violate any applicable laws</li>
          <li>Infringe on intellectual property rights</li>
          <li>Disrupt service operations</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>5. DMCA Compliance</h2>
        <p>
          If you believe your content is being used inappropriately, contact us at dmca@watchman.news 
          with details of the alleged infringement.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>6. Disclaimer</h2>
        <p>
          Watchman provides news aggregation &quot;as is&quot; without warranties. We are not responsible for 
          the accuracy, completeness, or reliability of third-party content.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>7. Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Continued use constitutes acceptance.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>8. Contact</h2>
        <p>For questions, contact us at: support@watchman.news</p>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
