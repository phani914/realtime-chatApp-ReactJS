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

function createIncomingMessage(messageSeed) {
  return {
    id: `received-${Date.now()}`,
    author: messageSeed.author,
    text: messageSeed.text,
    isOwn: false,
    status: 'delivered',
    sentAt: new Date().toISOString(),
  };
}

export function createSocketClient() {
  const messageListeners = new Set();
  const typingListeners = new Set();
  const timers = new Set();
  let isConnected = false;
  let replyIndex = 0;

  function notifyMessages(message) {
    messageListeners.forEach((listener) => listener(message));
  }

  function notifyTyping(isTyping, author = 'Maya') {
    typingListeners.forEach((listener) => listener({ author, isTyping }));
  }

  function queueIncomingMessage(delay = 1200) {
    notifyTyping(true);

    const timer = window.setTimeout(() => {
      const messageSeed = incomingMessages[replyIndex % incomingMessages.length];

      replyIndex += 1;
      timers.delete(timer);
      notifyTyping(false, messageSeed.author);
      notifyMessages(createIncomingMessage(messageSeed));
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
    receiveMessage() {
      if (!isConnected) {
        return;
      }

      queueIncomingMessage(450);
    },
    sendMessage() {
      if (!isConnected) {
        return;
      }

      queueIncomingMessage();
    },
  };
}
