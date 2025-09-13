import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignIn.css'
import Logo from '../components/Logo'

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  function togglePassword() {
    setShowPassword(s => !s)
  }

  function handleSignIn() {
    console.log('Sign in attempt:', { email, password })
    alert('Sign in functionality would be implemented here')
  }

  function handleGoogleLogin() {
    console.log('Google login')
    alert('Google login would be implemented here')
  }

  function handleAppleLogin() {
    console.log('Apple login')
    alert('Apple login would be implemented here')
  }

  function handleSignUp() {
  console.log('Navigate to sign up')
  navigate('/signup')
  }

  function handleForgotPassword() {
    console.log('Forgot password')
    alert('Navigate to forgot password page')
  }

  function handleTerms() {
    console.log('Terms of Use')
    alert('Navigate to Terms of Use')
  }

  function handlePrivacy() {
    console.log('Privacy Policy')
    alert('Navigate to Privacy Policy')
  }

  function handleAffiliates() {
    console.log('Affiliates')
    alert('Navigate to Affiliates page')
  }

  return (
    <div className="signin-page">
      <div className="login-container">
        <div className="watchman-logo">
          <Logo className="nm-logo auth-logo" />
        </div>

        <div className="header">
          <h1>Sign in to your Watchman account</h1>
          <p>Don&apos;t have an account? <button type="button" className="link-like" onClick={handleSignUp}>Sign up</button></p>
        </div>

        <div>
          <div className="form-group">
            <input id="email" type="email" className="input-field" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <div className="password-container">
              <input id="password" type={showPassword ? 'text' : 'password'} className="input-field" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              <button className="password-toggle" onClick={togglePassword} type="button">
                <svg className={`eye-icon ${showPassword ? 'hidden' : ''}`} id="eye-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg className={`eye-icon ${showPassword ? '' : 'hidden'}`} id="eye-closed" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              </button>
            </div>
          </div>

          <div className="forgot-password">
            <button type="button" className="link-like" onClick={handleForgotPassword}>Forgot password?</button>
          </div>

          

          <button className="sign-in-btn" onClick={handleSignIn}>Sign in</button>
        </div>

        <div className="divider"><span>or</span></div>

        <div>
          <button className="social-btn" onClick={handleGoogleLogin}>
            <svg className="social-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <button className="social-btn" onClick={handleAppleLogin}>
            <svg className="social-icon" viewBox="0 0 24 24">
              <path fill="#000000" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Continue with Apple
          </button>
        </div>

        <div className="terms">
          By signing up or signing in, you agree to our <button type="button" className="link-like" onClick={handleTerms}>Terms of Use</button> and have read our <button type="button" className="link-like" onClick={handlePrivacy}>Privacy Policy</button>. Watchman and its <button type="button" className="link-like" onClick={handleAffiliates}>affiliates</button> may use your email address to send updates, ads, and offers. Opt out via <button type="button" className="link-like" onClick={handlePrivacy}>Privacy Policy</button>.
        </div>
      </div>
    </div>
  )
}

export default SignIn
