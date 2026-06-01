const seededMessages = [
  {
    id: 'welcome',
    author: 'System',
    text: 'Welcome to Pulse Room. Messages now update in real time.',
    isOwn: false,
    status: 'delivered',
    sentAt: new Date(Date.now() - 1000 * 60 * 16).toISOString(),
  },
  {
    id: 'maya-brief',
    author: 'Maya',
    text: 'I pushed the latest design notes into the channel.',
    isOwn: false,
    status: 'delivered',
    sentAt: new Date(Date.now() - 1000 * 60 * 9).toISOString(),
  },
  {
    id: 'own-reply',
    author: 'You',
    text: 'Perfect. I am checking the chat flow and composer states.',
    isOwn: true,
    status: 'read',
    sentAt: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
  },
];

export async function fetchMessages() {
  return seededMessages;
}

export async function sendMessage(text) {
  return {
    id: `you-${Date.now()}`,
    author: 'You',
    text,
    isOwn: true,
    status: 'sent',
    sentAt: new Date().toISOString(),
  };
}
