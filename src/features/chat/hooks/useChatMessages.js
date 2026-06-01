import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchMessages, sendMessage as persistMessage } from '../services/chatApi.js';
import { createSocketClient } from '../services/socketClient.js';

export function useChatMessages() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingAuthor, setTypingAuthor] = useState('');
  const socketRef = useRef(null);
  const statusTimersRef = useRef([]);

  useEffect(() => {
    let isMounted = true;
    const socket = createSocketClient();

    socketRef.current = socket;

    async function loadMessages() {
      const fetchedMessages = await fetchMessages();

      if (isMounted) {
        setMessages(fetchedMessages);
      }
    }

    const unsubscribeMessages = socket.onMessage((message) => {
      setMessages((currentMessages) => [...currentMessages, message]);
    });
    const unsubscribeTyping = socket.onTyping(({ author, isTyping: nextIsTyping }) => {
      setTypingAuthor(nextIsTyping ? author : '');
      setIsTyping(nextIsTyping);
    });

    socket.connect();
    loadMessages();

    return () => {
      isMounted = false;
      unsubscribeMessages();
      unsubscribeTyping();
      socket.disconnect();
      statusTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      statusTimersRef.current = [];
    };
  }, []);

  const markMessageStatus = useCallback((messageId, status) => {
    setMessages((currentMessages) =>
      currentMessages.map((message) => (message.id === messageId ? { ...message, status } : message)),
    );
  }, []);

  const queueStatusUpdate = useCallback(
    (messageId, status, delay) => {
      const timer = window.setTimeout(() => {
        statusTimersRef.current = statusTimersRef.current.filter((savedTimer) => savedTimer !== timer);
        markMessageStatus(messageId, status);
      }, delay);

      statusTimersRef.current.push(timer);
    },
    [markMessageStatus],
  );

  const sendMessage = useCallback(async (text) => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    const ownMessage = await persistMessage(trimmedText);

    setMessages((currentMessages) => [...currentMessages, ownMessage]);
    queueStatusUpdate(ownMessage.id, 'delivered', 500);
    queueStatusUpdate(ownMessage.id, 'read', 1300);
    socketRef.current?.sendMessage(ownMessage);
  }, [queueStatusUpdate]);

  const receiveMessage = useCallback(() => {
    socketRef.current?.receiveMessage();
  }, []);

  return {
    connectionStatus: 'connected',
    isTyping,
    messages,
    offlineCount: 1,
    awayCount: 1,
    onlineCount: 8,
    receiveMessage,
    sendMessage,
    typingAuthor,
  };
}
