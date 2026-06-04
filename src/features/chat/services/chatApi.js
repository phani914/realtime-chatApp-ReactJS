const now = Date.now();

const rooms = [
  {
    id: 'pulse',
    name: 'Pulse Room',
    initials: 'PR',
    category: 'Channel',
    description: 'Launch standup, decisions, and delivery handoffs.',
    members: 10,
    onlineCount: 8,
    awayCount: 1,
    offlineCount: 1,
    unread: 3,
    pinned: 'Final QA starts at 4:00 PM. Drop blockers in-thread before then.',
    files: [
      { id: 'file-launch', name: 'Launch checklist.pdf', size: '2.4 MB' },
      { id: 'file-roadmap', name: 'Roadmap notes.md', size: '18 KB' },
    ],
    tasks: [
      { id: 'task-copy', label: 'Confirm release copy', done: true },
      { id: 'task-socket', label: 'Verify socket events', done: false },
      { id: 'task-mobile', label: 'Mobile composer pass', done: false },
    ],
  },
  {
    id: 'design',
    name: 'Design Review',
    initials: 'DR',
    category: 'Group',
    description: 'Interface critique and visual polish.',
    members: 6,
    onlineCount: 4,
    awayCount: 2,
    offlineCount: 0,
    unread: 1,
    pinned: 'Please review empty states and loading skeletons before signoff.',
    files: [
      { id: 'file-wireframes', name: 'Wireframes.fig', size: '14 MB' },
      { id: 'file-copy', name: 'Screen copy.csv', size: '42 KB' },
    ],
    tasks: [
      { id: 'task-icons', label: 'Icon audit', done: true },
      { id: 'task-states', label: 'Empty state polish', done: false },
    ],
  },
  {
    id: 'support',
    name: 'Support Desk',
    initials: 'SD',
    category: 'Channel',
    description: 'Customer escalations and urgent fixes.',
    members: 14,
    onlineCount: 9,
    awayCount: 3,
    offlineCount: 2,
    unread: 5,
    pinned: 'Escalations tagged priority need a first response within 10 minutes.',
    files: [
      { id: 'file-sla', name: 'SLA summary.xlsx', size: '86 KB' },
      { id: 'file-runbook', name: 'Incident runbook.md', size: '31 KB' },
    ],
    tasks: [
      { id: 'task-refund', label: 'Refund queue sweep', done: false },
      { id: 'task-status', label: 'Status page draft', done: false },
      { id: 'task-close', label: 'Close duplicate tickets', done: true },
    ],
  },
];

const roomMessages = {
  pulse: [
    {
      id: 'welcome',
      author: 'System',
      text: 'Welcome to Pulse Room. Messages now update in real time.',
      isOwn: false,
      status: 'delivered',
      sentAt: new Date(now - 1000 * 60 * 18).toISOString(),
      reactions: { clap: 2 },
    },
    {
      id: 'maya-brief',
      author: 'Maya',
      text: 'I pushed the latest design notes into the channel.',
      isOwn: false,
      status: 'delivered',
      sentAt: new Date(now - 1000 * 60 * 11).toISOString(),
      reactions: { heart: 1 },
    },
    {
      id: 'own-reply',
      author: 'You',
      text: 'Perfect. I am checking the chat flow and composer states.',
      isOwn: true,
      status: 'read',
      sentAt: new Date(now - 1000 * 60 * 7).toISOString(),
      reactions: {},
    },
  ],
  design: [
    {
      id: 'design-nina',
      author: 'Nina',
      text: 'The composer needs visible attachment and emoji states for the review.',
      isOwn: false,
      status: 'delivered',
      sentAt: new Date(now - 1000 * 60 * 24).toISOString(),
      reactions: { heart: 2 },
    },
    {
      id: 'design-you',
      author: 'You',
      text: 'I will add quick actions and keep the panel compact on mobile.',
      isOwn: true,
      status: 'read',
      sentAt: new Date(now - 1000 * 60 * 15).toISOString(),
      reactions: { clap: 1 },
    },
  ],
  support: [
    {
      id: 'support-leo',
      author: 'Leo',
      text: 'Two tickets are waiting on socket reconnect handling.',
      isOwn: false,
      status: 'delivered',
      sentAt: new Date(now - 1000 * 60 * 31).toISOString(),
      reactions: {},
    },
    {
      id: 'support-maya',
      author: 'Maya',
      text: 'Please keep the newest customer reports visible in the room.',
      isOwn: false,
      status: 'delivered',
      sentAt: new Date(now - 1000 * 60 * 13).toISOString(),
      reactions: { eyes: 3 },
    },
  ],
};

export async function fetchRooms() {
  return rooms;
}

export async function fetchMessages(roomId = 'pulse') {
  return roomMessages[roomId] ?? [];
}

export async function sendMessage(text, roomId = 'pulse') {
  return {
    id: `${roomId}-you-${Date.now()}`,
    author: 'You',
    text,
    roomId,
    isOwn: true,
    status: 'sent',
    sentAt: new Date().toISOString(),
    reactions: {},
    edited: false,
  };
}
