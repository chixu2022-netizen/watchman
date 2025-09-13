import React from 'react';

// Lightweight error boundary that displays a small non-blocking banner in dev mode
export default class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
}> {
  state = { hasError: false, error: null as any };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    // keep console output for full trace
    console.error('Captured error in ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError && process.env.NODE_ENV !== 'production') {
      return (
        <div style={{ position: 'relative' }}>
          <div style={{ paddingTop: '2rem' }}>{this.props.children}</div>
          <div
            role="alert"
            style={{
              position: 'fixed',
              right: '1rem',
              bottom: '1rem',
              zIndex: 10001,
              background: 'rgba(0, 0, 0, 0.95)',
              color: '#fff',
              padding: '0.6rem 0.9rem',
              borderRadius: 6,
              boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
              fontFamily: 'monospace',
              fontSize: '12px',
              maxWidth: '360px',
            }}
          >
            <strong>Runtime error detected</strong>
            <div style={{ marginTop: 6, whiteSpace: 'pre-wrap', maxHeight: 180, overflow: 'auto' }}>
              {String(this.state.error)}
            </div>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              style={{ marginTop: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', border: 0, padding: '6px 8px', borderRadius: 4, cursor: 'pointer' }}
            >
              Dismiss
            </button>
          </div>
        </div>
      );
    }

    return this.props.children as any;
  }
}
