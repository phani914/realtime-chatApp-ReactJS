import { Bell, House, MessageCircle, Search, Settings, UserCircle } from 'lucide-react';

const navItems = ['Chats', 'Contacts', 'Groups'];

export function Navbar({ onShowHome, onShowLogin, onShowRegistration }) {
  return (
    <header className="navbar">
      <button className="navbar-brand" type="button" onClick={onShowHome}>
        <span className="brand-mark" aria-hidden="true">
          <MessageCircle size={22} />
        </span>
        <span>
          <span className="navbar-title">Realtime Chat</span>
          <span className="navbar-subtitle">Team messaging workspace</span>
        </span>
      </button>

      <nav className="navbar-links" aria-label="Primary navigation">
        <button className="navbar-home-link" type="button" onClick={onShowHome}>
          <House size={16} />
          Home
        </button>
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>
            {item}
          </a>
        ))}
      </nav>

      <div className="navbar-actions">
        <button className="navbar-auth-button" type="button" onClick={onShowLogin}>
          Login
        </button>
        <button className="navbar-auth-button primary" type="button" onClick={onShowRegistration}>
          Sign up
        </button>
        <button type="button" aria-label="Search">
          <Search size={18} />
        </button>
        <button type="button" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <button type="button" aria-label="Settings">
          <Settings size={18} />
        </button>
        <button type="button" aria-label="Profile">
          <UserCircle size={20} />
        </button>
      </div>
    </header>
  );
}
