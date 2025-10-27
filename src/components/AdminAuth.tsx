import React, { useState, useEffect } from 'react';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // You should change this password or store it securely
  // For production, use environment variable or proper authentication
  const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'watchman2025';

  // Prevent auto-scroll on mount
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Lock body scroll to prevent jumping
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Restore scroll when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate authentication delay
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        // Store auth token in sessionStorage (cleared when browser closes)
        sessionStorage.setItem('watchman_admin_auth', 'authenticated');
        onAuthenticated();
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      overflow: 'auto',
      zIndex: 9999
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        margin: 'auto'
      }}>
        {/* Logo/Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px'
          }}>
            🔐
          </div>
          <h1 style={{
            margin: '0 0 8px 0',
            fontSize: '28px',
            fontWeight: 700,
            color: '#333'
          }}>
            Admin Access
          </h1>
          <p style={{
            margin: 0,
            color: '#666',
            fontSize: '14px'
          }}>
            Enter password to access dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label 
              htmlFor="admin-password"
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#333'
              }}>
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: error ? '2px solid #dc3545' : '2px solid #e0e0e0',
                borderRadius: '8px',
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                if (!error) e.target.style.borderColor = '#667eea';
              }}
              onBlur={(e) => {
                if (!error) e.target.style.borderColor = '#e0e0e0';
              }}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background: '#f8d7da',
              color: '#721c24',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
              border: '1px solid #f5c6cb'
            }}>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '16px',
              fontWeight: 600,
              color: 'white',
              background: loading || !password 
                ? '#ccc' 
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '8px',
              cursor: loading || !password ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: loading || !password 
                ? 'none' 
                : '0 4px 12px rgba(102, 126, 234, 0.4)'
            }}
          >
            {loading ? 'Authenticating...' : 'Access Dashboard'}
          </button>
        </form>

        {/* Info Text */}
        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#666',
          lineHeight: '1.6'
        }}>
          <strong>🔒 Security Notice:</strong><br />
          This area is restricted to authorized administrators only. 
          Your session will expire when you close the browser.
        </div>

        {/* Back Link */}
        <div style={{
          marginTop: '20px',
          textAlign: 'center'
        }}>
          <a
            href="/"
            style={{
              color: '#667eea',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
