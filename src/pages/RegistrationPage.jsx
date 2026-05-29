import { useState } from 'react';
import { LockKeyhole, Mail, MessageCircle, ShieldCheck, UserRound } from 'lucide-react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export function RegistrationPage({ onRegister, onShowLogin }) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});

  function validate(nextValues) {
    const nextErrors = {};

    if (nextValues.name.trim().length < 2) {
      nextErrors.name = 'Enter your full name.';
    }

    if (!nextValues.email.trim()) {
      nextErrors.email = 'Email address is required.';
    } else if (!emailPattern.test(nextValues.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!nextValues.password) {
      nextErrors.password = 'Password is required.';
    } else if (!passwordPattern.test(nextValues.password)) {
      nextErrors.password = 'Use at least 8 characters with a letter and a number.';
    }

    if (!nextValues.confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your password.';
    } else if (nextValues.confirmPassword !== nextValues.password) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!nextValues.terms) {
      nextErrors.terms = 'Accept the terms to continue.';
    }

    return nextErrors;
  }

  function handleChange(event) {
    const { checked, name, type, value } = event.target;
    const nextValues = { ...values, [name]: type === 'checkbox' ? checked : value };
    setValues(nextValues);

    if (errors[name] || name === 'password') {
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

    onRegister?.();
  }

  return (
    <main className="login-page">
      <section className="login-hero" aria-labelledby="registration-title">
        <div className="login-panel">
          <a className="login-brand" href="/" aria-label="Realtime Chat home">
            <span className="brand-mark" aria-hidden="true">
              <MessageCircle size={22} />
            </span>
            <span>
              <span className="navbar-title">Realtime Chat</span>
              <span className="navbar-subtitle">Create your workspace access</span>
            </span>
          </a>

          <div className="login-copy">
            <span className="login-kicker">
              <ShieldCheck size={16} />
              Private chat onboarding
            </span>
            <h1 id="registration-title">Create account</h1>
            <p>Join your team workspace and start messaging across rooms, projects, and direct chats.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <label className="login-field">
              <span>Full name</span>
              <span className={`login-input-wrap ${errors.name ? 'has-error' : ''}`}>
                <UserRound size={18} aria-hidden="true" />
                <input
                  type="text"
                  name="name"
                  placeholder="Sandy Kumar"
                  value={values.name}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'register-name-error' : undefined}
                  onChange={handleChange}
                />
              </span>
              {errors.name ? (
                <span className="field-error" id="register-name-error">
                  {errors.name}
                </span>
              ) : null}
            </label>

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
                  aria-describedby={errors.email ? 'register-email-error' : undefined}
                  onChange={handleChange}
                />
              </span>
              {errors.email ? (
                <span className="field-error" id="register-email-error">
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
                  placeholder="Create password"
                  value={values.password}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={errors.password ? 'register-password-error' : undefined}
                  onChange={handleChange}
                />
              </span>
              {errors.password ? (
                <span className="field-error" id="register-password-error">
                  {errors.password}
                </span>
              ) : null}
            </label>

            <label className="login-field">
              <span>Confirm password</span>
              <span className={`login-input-wrap ${errors.confirmPassword ? 'has-error' : ''}`}>
                <LockKeyhole size={18} aria-hidden="true" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={values.confirmPassword}
                  aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                  aria-describedby={
                    errors.confirmPassword ? 'register-confirm-password-error' : undefined
                  }
                  onChange={handleChange}
                />
              </span>
              {errors.confirmPassword ? (
                <span className="field-error" id="register-confirm-password-error">
                  {errors.confirmPassword}
                </span>
              ) : null}
            </label>

            <label className="remember-me auth-terms">
              <input
                type="checkbox"
                name="terms"
                checked={values.terms}
                aria-invalid={errors.terms ? 'true' : 'false'}
                aria-describedby={errors.terms ? 'register-terms-error' : undefined}
                onChange={handleChange}
              />
              <span>I agree to the workspace terms and privacy policy</span>
            </label>
            {errors.terms ? (
              <span className="field-error terms-error" id="register-terms-error">
                {errors.terms}
              </span>
            ) : null}

            <button className="login-submit" type="submit">
              Create account
            </button>

            <p className="auth-switch">
              Already have an account?
              <button type="button" onClick={onShowLogin}>
                Sign in
              </button>
            </p>
          </form>
        </div>

        <aside className="login-aside registration-aside" aria-label="Workspace setup preview">
          <div className="login-preview">
            <span className="preview-label">Setup time</span>
            <strong>2m</strong>
            <p>Create your profile and enter your workspace without slowing the team down.</p>
          </div>
          <div className="login-preview accent">
            <span className="preview-label">Protected chats</span>
            <strong>100%</strong>
            <p>Workspace access keeps rooms focused, searchable, and permission-aware.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
