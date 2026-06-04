const incomingMessages = [
  {
    author: 'Maya',
    text: 'I received your message. The team can see it now.',
  },
  {
    author: 'Arjun',
    text: 'Received on my side. I will pick up the frontend task.',
  },
  {
    author: 'Nina',
    text: 'New update received. I am reviewing the screen states.',
  },
  {
    author: 'Leo',
    text: 'Message received. Backend events are looking good.',
  },
];

const roomReplies = {
  pulse: incomingMessages,
  design: [
    {
      author: 'Nina',
      text: 'That direction works. I added a note for the review pass.',
    },
    {
      author: 'Maya',
      text: 'The interaction states are easier to scan now.',
    },
  ],
  support: [
    {
      author: 'Leo',
      text: 'I checked the incident queue. The live update is coming through.',
    },
    {
      author: 'Maya',
      text: 'Support can see the latest customer context now.',
    },
  ],
};

function createIncomingMessage(messageSeed, roomId) {
  return {
    id: `${roomId}-received-${Date.now()}`,
    author: messageSeed.author,
    text: messageSeed.text,
    roomId,
    isOwn: false,
    status: 'delivered',
    sentAt: new Date().toISOString(),
    reactions: {},
  };
}

export function createSocketClient() {
  const messageListeners = new Set();
  const typingListeners = new Set();
  const timers = new Set();
  let isConnected = false;
  const replyIndexes = new Map();

  function notifyMessages(message) {
    messageListeners.forEach((listener) => listener(message));
  }

  function notifyTyping(isTyping, author = 'Maya', roomId = 'pulse') {
    typingListeners.forEach((listener) => listener({ author, isTyping, roomId }));
  }

  function queueIncomingMessage(roomId = 'pulse', delay = 1200) {
    const replies = roomReplies[roomId] ?? incomingMessages;
    const replyIndex = replyIndexes.get(roomId) ?? 0;
    const messageSeed = replies[replyIndex % replies.length];

    notifyTyping(true, messageSeed.author, roomId);

    const timer = window.setTimeout(() => {
      replyIndexes.set(roomId, replyIndex + 1);
      timers.delete(timer);
      notifyTyping(false, messageSeed.author, roomId);
      notifyMessages(createIncomingMessage(messageSeed, roomId));
    }, delay);

    timers.add(timer);
  }

  return {
    connect() {
      isConnected = true;
    },
    disconnect() {
      isConnected = false;
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
      notifyTyping(false);
    },
    onMessage(listener) {
      messageListeners.add(listener);

      return () => messageListeners.delete(listener);
    },
    onTyping(listener) {
      typingListeners.add(listener);

      return () => typingListeners.delete(listener);
    },
    receiveMessage(roomId) {
      if (!isConnected) {
        return;
      }

      queueIncomingMessage(roomId, 450);
    },
    sendMessage(message) {
      if (!isConnected) {
        return;
      }

      queueIncomingMessage(message.roomId);
    },
  };
}
