import { MessageSquarePlus, Radio } from 'lucide-react';
import heroImage from '../../assets/chat-hero-bg.png';

export function HeroSection() {
  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-content">
        <span className="hero-kicker">
          <Radio size={16} />
          Live conversations
        </span>
        <h1>Chat with your team in real time</h1>
        <p>
          Keep direct messages, groups, and channels moving in one focused
          workspace.
        </p>
        <div className="hero-actions">
          <a className="hero-primary-action" href="#all-chats">
            <MessageSquarePlus size={18} />
            Start chat
          </a>
          <a className="hero-secondary-action" href="#groups">
            View groups
          </a>
        </div>
      </div>
    </section>
  );
}
