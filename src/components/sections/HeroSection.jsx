import { Activity, MessageSquarePlus, Radio, ShieldCheck, Users } from 'lucide-react';
import heroImage from '../../assets/chat-hero-bg.png';

const heroStats = [
  { label: 'Active users', value: '128', icon: Users },
  { label: 'Live rooms', value: '24', icon: Activity },
  { label: 'Delivery', value: '99%', icon: ShieldCheck },
];

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

      <div className="hero-live-panel" aria-label="Live workspace summary">
        {heroStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="hero-stat" key={stat.label}>
              <Icon size={17} aria-hidden="true" />
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          );
        })}
      </div>
    </section>
  );
}
