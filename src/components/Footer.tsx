import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__title">Information you can trust</h3>
            <p className="footer__description">
              Watchman is a comprehensive news aggregator that curates and delivers trusted news from multiple sources worldwide. 
              Watchman provides aggregated business, financial, national and international news to professionals via desktop, 
              web and mobile platforms, bringing together content from leading media organizations, industry sources and trusted publishers.
            </p>
          </div>

          <div className="footer__section">
            <h3 className="footer__title">Follow Us</h3>
            <div className="footer__social">
              <a href="https://twitter.com/watchmannews" className="footer__social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <span className="footer__social-icon">𝕏</span>
              </a>
              <a href="https://facebook.com/watchmannews" className="footer__social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <span className="footer__social-icon">f</span>
              </a>
              <a href="https://instagram.com/watchmannews" className="footer__social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <span className="footer__social-icon">📷</span>
              </a>
              <a href="https://youtube.com/watchmannews" className="footer__social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <span className="footer__social-icon">▶</span>
              </a>
              <a href="https://linkedin.com/company/watchmannews" className="footer__social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <span className="footer__social-icon">in</span>
              </a>
              <a href="https://wa.me/watchmannews" className="footer__social-link" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <span className="footer__social-icon">💬</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__products">
          <h3 className="footer__products-title">LSEG Products</h3>
          
          <div className="footer__products-grid">
            <div className="footer__product">
              <h4 className="footer__product-title">
                Workspace <span className="footer__external-link">↗</span>
              </h4>
              <p className="footer__product-description">
                Access unmatched financial data, news and content in a highly-customised 
                workflow experience on desktop, web and mobile.
              </p>
            </div>

            <div className="footer__product">
              <h4 className="footer__product-title">
                Data Catalogue <span className="footer__external-link">↗</span>
              </h4>
              <p className="footer__product-description">
                Browse an unrivalled portfolio of real-time and historical market data and 
                insights from worldwide sources and experts.
              </p>
            </div>

            <div className="footer__product">
              <h4 className="footer__product-title">
                World-Check <span className="footer__external-link">↗</span>
              </h4>
              <p className="footer__product-description">
                Screen for heightened risk individual and entities globally to help uncover 
                hidden risks in business relationships and human networks.
              </p>
            </div>
          </div>
        </div>

        <div className="footer__links">
          <div className="footer__links-row">
            <a href="/advertise" className="footer__link">
              Advertise With Us <span className="footer__external-link">↗</span>
            </a>
            <a href="/advertising-guidelines" className="footer__link">Advertising Guidelines</a>
            <a href="/licensing" className="footer__link">
              Purchase Licensing Rights <span className="footer__external-link">↗</span>
            </a>
            <a href="/cookies" className="footer__link">
              Cookies <span className="footer__external-link">↗</span>
            </a>
            <a href="/terms" className="footer__link">Terms &amp; Conditions</a>
            <a href="/privacy" className="footer__link">
              Privacy <span className="footer__external-link">↗</span>
            </a>
            <a href="/accessibility" className="footer__link">
              Digital Accessibility <span className="footer__external-link">↗</span>
            </a>
            <a href="/corrections" className="footer__link">Corrections</a>
            <a href="/feedback" className="footer__link">
              Site Feedback <span className="footer__external-link">↗</span>
            </a>
            <a href="/manage-cookies" className="footer__link">Manage Cookies</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__disclaimer">
            All quotes delayed a minimum of 15 minutes. See here for a complete list of exchanges and delays.
          </p>
          <p className="footer__copyright">
            © 2025 Watchman News Aggregator. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;