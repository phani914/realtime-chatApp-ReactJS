import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchMessages, fetchRooms, sendMessage as persistMessage } from '../services/chatApi.js';
import { createSocketClient } from '../services/socketClient.js';

export function useChatMessages() {
  const [rooms, setRooms] = useState([]);
  const [activeRoomId, setActiveRoomId] = useState('pulse');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingAuthor, setTypingAuthor] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const socketRef = useRef(null);
  const activeRoomRef = useRef('pulse');
  const statusTimersRef = useRef([]);
  const typingTimerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const socket = createSocketClient();

    socketRef.current = socket;

    async function loadInitialData() {
      const [fetchedRooms, fetchedMessages] = await Promise.all([
        fetchRooms(),
        fetchMessages(activeRoomRef.current),
      ]);

      if (isMounted) {
        setRooms(fetchedRooms);
        setMessages(fetchedMessages);
      }
    }

    const unsubscribeMessages = socket.onMessage((message) => {
      if (message.roomId === activeRoomRef.current) {
        setMessages((currentMessages) => [...currentMessages, message]);
      }
    });
    const unsubscribeTyping = socket.onTyping(({ author, isTyping: nextIsTyping, roomId }) => {
      if (roomId !== activeRoomRef.current) {
        return;
      }

      setTypingAuthor(nextIsTyping ? author : '');
      setIsTyping(nextIsTyping);
    });

    socket.connect();
    loadInitialData();

    return () => {
      isMounted = false;
      unsubscribeMessages();
      unsubscribeTyping();
      socket.disconnect();
      statusTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      statusTimersRef.current = [];
      window.clearTimeout(typingTimerRef.current);
    };
  }, []);

  const activeRoom = rooms.find((room) => room.id === activeRoomId) ?? rooms[0];

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

  const switchRoom = useCallback(async (roomId) => {
    activeRoomRef.current = roomId;
    setActiveRoomId(roomId);
    setIsTyping(false);
    setTypingAuthor('');
    setMessages(await fetchMessages(roomId));
  }, []);

  const sendMessage = useCallback(async (text) => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    const ownMessage = await persistMessage(trimmedText, activeRoomRef.current);

    setMessages((currentMessages) => [...currentMessages, ownMessage]);
    queueStatusUpdate(ownMessage.id, 'delivered', 500);
    queueStatusUpdate(ownMessage.id, 'read', 1300);
    socketRef.current?.sendMessage(ownMessage);
  }, [queueStatusUpdate]);

  const receiveMessage = useCallback(() => {
    socketRef.current?.receiveMessage(activeRoomRef.current);
  }, []);

  const reactToMessage = useCallback((messageId, reaction) => {
    setMessages((currentMessages) =>
      currentMessages.map((message) => {
        if (message.id !== messageId) {
          return message;
        }

        const currentCount = message.reactions?.[reaction] ?? 0;

        return {
          ...message,
          reactions: {
            ...message.reactions,
            [reaction]: currentCount + 1,
          },
        };
      }),
    );
  }, []);

  const editMessage = useCallback((messageId, nextText) => {
    const trimmedText = nextText.trim();

    if (!trimmedText) {
      return;
    }

    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === messageId ? { ...message, text: trimmedText, edited: true } : message,
      ),
    );
  }, []);

  const deleteMessage = useCallback((messageId) => {
    setMessages((currentMessages) => currentMessages.filter((message) => message.id !== messageId));
  }, []);

  const toggleTask = useCallback((taskId) => {
    setRooms((currentRooms) =>
      currentRooms.map((room) =>
        room.id === activeRoomRef.current
          ? {
              ...room,
              tasks: room.tasks.map((task) =>
                task.id === taskId ? { ...task, done: !task.done } : task,
              ),
            }
          : room,
      ),
    );
  }, []);

  const updateDraftTyping = useCallback((text) => {
    window.clearTimeout(typingTimerRef.current);

    if (!text.trim()) {
      setConnectionStatus('connected');
      return;
    }

    setConnectionStatus('typing locally');
    typingTimerRef.current = window.setTimeout(() => {
      setConnectionStatus('connected');
    }, 900);
  }, []);

  return {
    activeRoom,
    activeRoomId,
    connectionStatus,
    deleteMessage,
    editMessage,
    isTyping,
    messages,
    offlineCount: activeRoom?.offlineCount ?? 0,
    awayCount: activeRoom?.awayCount ?? 0,
    onlineCount: activeRoom?.onlineCount ?? 0,
    reactToMessage,
    receiveMessage,
    rooms,
    sendMessage,
    switchRoom,
    toggleTask,
    typingAuthor,
    updateDraftTyping,
  };
}
