import { Activity, MessagesSquare, ShieldCheck } from 'lucide-react';

const cards = [
  {
    title: 'Online now',
    value: '128',
    detail: 'Teammates currently active',
    trend: '+18 since morning',
    icon: Activity,
    tone: 'teal',
  },
  {
    title: 'Active channels',
    value: '24',
    detail: 'Groups moving today',
    trend: '6 high-priority rooms',
    icon: MessagesSquare,
    tone: 'coral',
  },
  {
    title: 'Delivery rate',
    value: '99%',
    detail: 'Messages synced instantly',
    trend: 'Read receipts healthy',
    icon: ShieldCheck,
    tone: 'gold',
  },
];

export function CardsSection() {
  return (
    <section className="cards-section" aria-label="Chat overview">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article className={`info-card ${card.tone}`} key={card.title}>
            <div className="info-card-icon" aria-hidden="true">
              <Icon size={20} />
            </div>
            <div>
              <span className="info-card-title">{card.title}</span>
              <strong>{card.value}</strong>
              <p>{card.detail}</p>
              <span className="info-card-trend">{card.trend}</span>
            </div>
          </article>
        );
      })}
    </section>
  );
}
