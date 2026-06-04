import { AppShell } from '../components/layout/AppShell.jsx';
import { CardsSection } from '../components/sections/CardsSection.jsx';
import { HeroSection } from '../components/sections/HeroSection.jsx';
import { ChatWindow } from '../features/chat/components/ChatWindow.jsx';

export function ChatPage({ onShowHome, onShowLogin, onShowRegistration }) {
  return (
    <AppShell
      onShowHome={onShowHome}
      onShowLogin={onShowLogin}
      onShowRegistration={onShowRegistration}
    >
      <HeroSection />
      <CardsSection />
      <ChatWindow />
    </AppShell>
  );
}
