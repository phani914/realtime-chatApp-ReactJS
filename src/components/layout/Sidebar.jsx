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

const activeUsers = [
  {
    name: 'Maya Chen',
    role: 'Product lead',
    initials: 'MC',
    status: 'online',
    activity: 'Active now',
    unread: 2,
  },
  {
    name: 'Arjun Rao',
    role: 'Frontend',
    initials: 'AR',
    status: 'online',
    activity: 'Active now',
  },
  {
    name: 'Nina Patel',
    role: 'Design',
    initials: 'NP',
    status: 'away',
    activity: 'Away 8m',
  },
  {
    name: 'Leo Grant',
    role: 'Backend',
    initials: 'LG',
    status: 'offline',
    activity: 'Offline',
  },
];

const onlineUserCount = activeUsers.filter((user) => user.status === 'online').length;

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

function UserList() {
  return (
    <section className="sidebar-section user-list-section" aria-label="Active users">
      <div className="sidebar-section-header">
        <h2>Active users</h2>
        <span className="user-list-total">{onlineUserCount} online</span>
      </div>

      <div className="user-list">
        {activeUsers.map((user) => (
          <button className="user-list-item" type="button" key={user.name}>
            <span className={`user-avatar ${user.status}`} aria-hidden="true">
              {user.initials}
            </span>
            <span className="user-details">
              <span className="user-name-row">
                <span className="user-name">{user.name}</span>
                <span className={`user-status-label ${user.status}`}>{user.status}</span>
              </span>
              <span className="user-role">{user.role} · {user.activity}</span>
            </span>
            {user.unread ? <span className="sidebar-count">{user.unread}</span> : null}
          </button>
        ))}
      </div>
    </section>
  );
}

export function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Chat sidebar">
      <SidebarSection title="Messages" items={spaces} />
      <UserList />
      <SidebarSection title="Shortcuts" items={shortcuts} />
    </aside>
  );
}
