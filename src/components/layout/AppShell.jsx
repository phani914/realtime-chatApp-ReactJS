import { Navbar } from './Navbar.jsx';
import { Sidebar } from './Sidebar.jsx';

export function AppShell({ children }) {
  return (
    <main className="app-shell">
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <div className="app-content">{children}</div>
      </div>
    </main>
  );
}
