import { Footer } from './Footer.jsx';
import { Navbar } from './Navbar.jsx';
import { Sidebar } from './Sidebar.jsx';

export function AppShell({ children, onShowHome, onShowLogin, onShowRegistration }) {
  return (
    <main className="app-shell">
      <Navbar
        onShowHome={onShowHome}
        onShowLogin={onShowLogin}
        onShowRegistration={onShowRegistration}
      />
      <div className="app-layout">
        <Sidebar />
        <div className="app-content">{children}</div>
      </div>
      <Footer />
    </main>
  );
}
