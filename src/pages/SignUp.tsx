import React, { useCallback, useEffect, useState } from 'react'
import './SignUp.css'
import './AuthShared.css'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

/**
 * SignUp page
 * Contract:
 * - Inputs: none (local form state)
 * - Outputs: none (placeholder actions via alerts/logs)
 * - Error modes: basic client-side validation only
 *
 * Success criteria: Mirrors the SignIn page structure, standalone route
 */
const SignUp: React.FC = () => {
  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [marketing, setMarketing] = useState(false)

  // UI state
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  // Auto-hide the error after a short interval (if set)
  useEffect(() => {
    if (!showError) return
    const t = setTimeout(() => setShowError(false), 5000)
    return () => clearTimeout(t)
  }, [showError])

  // Toggle password visibility
  const togglePassword = useCallback(() => setShowPassword(s => !s), [])

  // Basic client-side validation
  const validate = useCallback(() => {
    if (!email || !password) {
      setErrorMessage('Email and password are required.')
      setShowError(true)
      return false
    }
    // Minimal email pattern check
    const emailRe = /\S+@\S+\.\S+/
    if (!emailRe.test(email)) {
      setErrorMessage('Please enter a valid email address.')
      setShowError(true)
      return false
    }
    return true
  }, [email, password])

  // Handlers
  const handleSignUp = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!validate()) return
    console.log('Sign up attempt:', { email, password, marketing })
    alert('Sign up functionality would be implemented here')
  }, [email, password, marketing, validate])

  const handleGoogleLogin = useCallback(() => { console.log('Google login'); alert('Google login would be implemented here') }, [])
  const handleAppleLogin = useCallback(() => { console.log('Apple login'); alert('Apple login would be implemented here') }, [])
  const handleSignIn = useCallback(() => navigate('/signin'), [navigate])
  const handleTerms = useCallback(() => alert('Navigate to Terms of Use'), [])
  const handlePrivacy = useCallback(() => alert('Navigate to Privacy Policy'), [])
  const handleAffiliates = useCallback(() => alert('Navigate to Affiliates page'), [])

  return (
    <div className="signup-page">
  <div className="signup-container auth-container" role="main">
        {/* Brand */}
        <div className="brand-logo">
          <Logo className="nm-logo auth-logo" />
        </div>

        {/* Header */}
        <header className="header">
          <h1>Sign up for your Watchman account</h1>
          <p>
            Already have an account?{' '}
            <button type="button" className="link-like" onClick={handleSignIn}>Sign in</button>
          </p>
        </header>

        {/* Form */}
        <form className="signup-form" onSubmit={handleSignUp} noValidate>
          <div className="form-group">
            <label htmlFor="email" className="visually-hidden">Email address</label>
            <input id="email" type="email" className="input-field" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="visually-hidden">Password</label>
            <div className="password-container">
              <input id="password" type={showPassword ? 'text' : 'password'} className="input-field" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              <button type="button" className="password-toggle" onClick={togglePassword} aria-label="Toggle password visibility">
                <svg className={`eye-icon ${showPassword ? 'hidden' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg className={`eye-icon ${showPassword ? '' : 'hidden'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              </button>
            </div>
          </div>

          

          <div className="checkbox-section">
            <input id="marketing-checkbox" type="checkbox" className="checkbox" checked={marketing} onChange={e => setMarketing(e.target.checked)} />
            <label htmlFor="marketing-checkbox" className="checkbox-label">
              I understand Watchman and its <button type="button" className="link-like" onClick={handleAffiliates}>affiliates</button> may use my email address to provide updates, ads, and offers. I can opt out via the <button type="button" className="link-like" onClick={handlePrivacy}>Privacy Policy</button>.
            </label>
          </div>

          {showError && (
            <div className="error-message" id="error-message" role="alert">
              <div className="error-icon">✕</div>
              <div className="error-text">{errorMessage || 'We are unable to register you at this time, please try refreshing the page.'}</div>
            </div>
          )}

          <button type="submit" className="signup-btn">Sign up</button>
        </form>

        {/* Social / alternate login */}
        <div className="divider"><span>or</span></div>

        <div className="social-group">
          <button type="button" className="social-btn" onClick={handleGoogleLogin}>
            <svg className="social-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <button type="button" className="social-btn" onClick={handleAppleLogin}>
            <svg className="social-icon" viewBox="0 0 24 24">
              <path fill="#000000" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Continue with Apple
          </button>
        </div>

        
      </div>
    </div>
  )
}

export default SignUp
