import { AppShell } from '../components/layout/AppShell.jsx';
import { CardsSection } from '../components/sections/CardsSection.jsx';
import { HeroSection } from '../components/sections/HeroSection.jsx';
import { ChatWindow } from '../features/chat/components/ChatWindow.jsx';

export function ChatPage() {
  return (
    <AppShell>
      <HeroSection />
      <CardsSection />
      <ChatWindow />
    </AppShell>
  );
}
