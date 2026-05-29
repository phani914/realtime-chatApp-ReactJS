import {
  Archive,
  Hash,
  Inbox,
  MessageSquare,
  Plus,
  Star,
  Users,
} from 'lucide-react';

const spaces = [
  { label: 'All chats', icon: Inbox, count: 12, active: true },
  { label: 'Direct messages', icon: MessageSquare, count: 7 },
  { label: 'Groups', icon: Users, count: 4 },
  { label: 'Channels', icon: Hash, count: 3 },
];

const shortcuts = [
  { label: 'Starred', icon: Star },
  { label: 'Archived', icon: Archive },
];

function SidebarSection({ title, items }) {
  return (
    <section className="sidebar-section" aria-label={title}>
      <div className="sidebar-section-header">
        <h2>{title}</h2>
        <button type="button" aria-label={`Add ${title.toLowerCase()}`}>
          <Plus size={15} />
        </button>
      </div>

      <div className="sidebar-list">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <a
              className={`sidebar-item ${item.active ? 'active' : ''}`}
              href={`#${item.label.toLowerCase().replaceAll(' ', '-')}`}
              key={item.label}
            >
              <Icon size={17} />
              <span>{item.label}</span>
              {typeof item.count === 'number' ? (
                <span className="sidebar-count">{item.count}</span>
              ) : null}
            </a>
          );
        })}
      </div>
    </section>
  );
}

export function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Chat sidebar">
      <SidebarSection title="Messages" items={spaces} />
      <SidebarSection title="Shortcuts" items={shortcuts} />
    </aside>
  );
}
