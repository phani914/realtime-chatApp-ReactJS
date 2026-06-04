import { Code2, Mail, MessageCircle, ShieldCheck } from 'lucide-react';

const footerLinks = ['Privacy', 'Terms', 'Status'];

export function Footer() {
  return (
    <footer className="site-footer" aria-label="Footer">
      <div className="site-footer-brand">
        <span className="footer-mark" aria-hidden="true">
          <MessageCircle size={19} />
        </span>
        <div>
          <strong>Realtime Chat</strong>
          <p>Fast team conversations with live rooms, presence, and message status.</p>
        </div>
      </div>

      <nav className="site-footer-links" aria-label="Footer navigation">
        {footerLinks.map((link) => (
          <a href={`#${link.toLowerCase()}`} key={link}>
            {link}
          </a>
        ))}
      </nav>

      <div className="site-footer-actions">
        <a href="mailto:support@realtimechat.app" aria-label="Email support">
          <Mail size={17} />
        </a>
        <a href="#security" aria-label="Security information">
          <ShieldCheck size={17} />
        </a>
        <a href="#github" aria-label="GitHub project">
          <Code2 size={17} />
        </a>
      </div>
    </footer>
  );
}
