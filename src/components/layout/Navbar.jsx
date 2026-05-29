import { Bell, MessageCircle, Search, Settings, UserCircle } from 'lucide-react';

const navItems = ['Chats', 'Contacts', 'Groups'];

export function Navbar() {
  return (
    <header className="navbar">
      <a className="navbar-brand" href="/" aria-label="Realtime Chat home">
        <span className="brand-mark" aria-hidden="true">
          <MessageCircle size={22} />
        </span>
        <span>
          <span className="navbar-title">Realtime Chat</span>
          <span className="navbar-subtitle">React client scaffold</span>
        </span>
      </a>

      <nav className="navbar-links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>
            {item}
          </a>
        ))}
      </nav>

      <div className="navbar-actions">
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
