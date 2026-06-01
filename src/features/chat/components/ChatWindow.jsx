import { Inbox, Paperclip, Phone, Search, Send, Smile, Video, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MessageBubble } from './MessageBubble.jsx';
import { useChatMessages } from '../hooks/useChatMessages.js';

export function ChatWindow() {
  const {
    connectionStatus,
    isTyping,
    messages,
    awayCount,
    offlineCount,
    onlineCount,
    receiveMessage,
    sendMessage,
    typingAuthor,
  } = useChatMessages();
  const [searchQuery, setSearchQuery] = useState('');
  const [draft, setDraft] = useState('');
  const messageListRef = useRef(null);

  const filteredMessages = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return messages;
    }

    return messages.filter((message) =>
      `${message.author} ${message.text}`.toLowerCase().includes(normalizedQuery),
    );
  }, [messages, searchQuery]);

  useEffect(() => {
    if (!messageListRef.current || searchQuery) {
      return;
    }

    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages, isTyping, searchQuery]);

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(draft);
    setDraft('');
  }

  return (
    <section className="chat-window" aria-label="Chat window">
      <header className="chat-room-header">
        <div className="chat-room-title">
          <span className="chat-avatar" aria-hidden="true">
            PR
          </span>
          <div>
            <h2>Pulse Room</h2>
            <p>
              <span className="presence-dot online" aria-hidden="true" /> {onlineCount} online · {connectionStatus}
              {isTyping ? ` · ${typingAuthor} is typing` : ''}
            </p>
          </div>
        </div>

        <div className="chat-room-actions">
          <button type="button" aria-label="Receive demo message" onClick={receiveMessage}>
            <Inbox size={17} />
          </button>
          <button type="button" aria-label="Start voice call">
            <Phone size={17} />
          </button>
          <button type="button" aria-label="Start video call">
            <Video size={17} />
          </button>
        </div>
      </header>

      <div className="presence-summary" aria-label="Online status summary">
        <span className="presence-chip online">
          <span className="presence-dot" aria-hidden="true" />
          {onlineCount} online
        </span>
        <span className="presence-chip away">
          <span className="presence-dot" aria-hidden="true" />
          {awayCount} away
        </span>
        <span className="presence-chip offline">
          <span className="presence-dot" aria-hidden="true" />
          {offlineCount} offline
        </span>
      </div>

      <div className="chat-search-bar">
        <label className="chat-search-input">
          <Search size={17} aria-hidden="true" />
          <input
            type="search"
            placeholder="Search messages"
            value={searchQuery}
            aria-label="Search messages"
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </label>

        <span className="chat-search-count" aria-live="polite">
          {filteredMessages.length} of {messages.length}
        </span>

        {searchQuery ? (
          <button
            className="chat-search-clear"
            type="button"
            aria-label="Clear search"
            onClick={() => setSearchQuery('')}
          >
            <X size={16} />
          </button>
        ) : null}
      </div>

      <div className="message-list" ref={messageListRef}>
        {filteredMessages.length > 0 ? (
          <>
            <div className="message-day-divider">Today</div>
            {filteredMessages.map((message) => (
              <MessageBubble key={message.id} message={message} searchQuery={searchQuery} />
            ))}
            {isTyping && !searchQuery ? (
              <div className="typing-indicator" role="status" aria-label="Maya is typing">
                <span />
                <span />
                <span />
              </div>
            ) : null}
          </>
        ) : (
          <div className="empty-search-state" role="status">
            <strong>No messages found</strong>
            <span>Try searching by sender or message text.</span>
          </div>
        )}
      </div>

      <form className="message-composer" onSubmit={handleSubmit}>
        <button className="composer-tool" type="button" aria-label="Attach file">
          <Paperclip size={18} />
        </button>
        <input
          type="text"
          placeholder="Message Pulse Room"
          aria-label="Message"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button className="composer-tool" type="button" aria-label="Add emoji">
          <Smile size={18} />
        </button>
        <button className="composer-send" type="submit" aria-label="Send message" disabled={!draft.trim()}>
          <Send size={18} />
        </button>
      </form>
    </section>
  );
}
