const initialMessages = [
  {
    id: 'welcome',
    author: 'System',
    text: 'Your React chat app structure is ready.',
    isOwn: false,
  },
  {
    id: 'reply',
    author: 'You',
    text: 'Next step: connect sockets and auth.',
    isOwn: true,
  },
];

export function useChatMessages() {
  return {
    messages: initialMessages,
  };
}
