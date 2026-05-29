import { useState } from 'react';
import { LockKeyhole, Mail, MessageCircle, ShieldCheck } from 'lucide-react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage({ onLogin, onShowRegistration }) {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  function validate(nextValues) {
    const nextErrors = {};

    if (!nextValues.email.trim()) {
      nextErrors.email = 'Email address is required.';
    } else if (!emailPattern.test(nextValues.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!nextValues.password) {
      nextErrors.password = 'Password is required.';
    }

    return nextErrors;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);

    if (errors[name]) {
      setErrors(validate(nextValues));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onLogin?.();
  }

  return (
    <main className="login-page">
      <section className="login-hero" aria-labelledby="login-title">
        <div className="login-panel">
          <a className="login-brand" href="/" aria-label="Realtime Chat home">
            <span className="brand-mark" aria-hidden="true">
              <MessageCircle size={22} />
            </span>
            <span>
              <span className="navbar-title">Realtime Chat</span>
              <span className="navbar-subtitle">Secure team messaging</span>
            </span>
          </a>

          <div className="login-copy">
            <span className="login-kicker">
              <ShieldCheck size={16} />
              Encrypted workspace access
            </span>
            <h1 id="login-title">Welcome back</h1>
            <p>Sign in to catch up with channels, direct messages, and live team updates.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <label className="login-field">
              <span>Email address</span>
              <span className={`login-input-wrap ${errors.email ? 'has-error' : ''}`}>
                <Mail size={18} aria-hidden="true" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  value={values.email}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'login-email-error' : undefined}
                  onChange={handleChange}
                />
              </span>
              {errors.email ? (
                <span className="field-error" id="login-email-error">
                  {errors.email}
                </span>
              ) : null}
            </label>

            <label className="login-field">
              <span>Password</span>
              <span className={`login-input-wrap ${errors.password ? 'has-error' : ''}`}>
                <LockKeyhole size={18} aria-hidden="true" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={values.password}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={errors.password ? 'login-password-error' : undefined}
                  onChange={handleChange}
                />
              </span>
              {errors.password ? (
                <span className="field-error" id="login-password-error">
                  {errors.password}
                </span>
              ) : null}
            </label>

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" name="remember" />
                <span>Remember me</span>
              </label>
              <a href="#reset-password">Forgot password?</a>
            </div>

            <button className="login-submit" type="submit">
              Sign in
            </button>

            <p className="auth-switch">
              New to Realtime Chat?
              <button type="button" onClick={onShowRegistration}>
                Create account
              </button>
            </p>
          </form>
        </div>

        <aside className="login-aside" aria-label="Workspace activity preview">
          <div className="login-preview">
            <span className="preview-label">Live rooms</span>
            <strong>24</strong>
            <p>Active conversations across product, support, and launch planning.</p>
          </div>
          <div className="login-preview accent">
            <span className="preview-label">Response time</span>
            <strong>1m</strong>
            <p>Keep the team moving with real-time delivery and read status.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
