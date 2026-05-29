import { Search, Send, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { MessageBubble } from './MessageBubble.jsx';
import { useChatMessages } from '../hooks/useChatMessages.js';

export function ChatWindow() {
  const { messages } = useChatMessages();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return messages;
    }

    return messages.filter((message) =>
      `${message.author} ${message.text}`.toLowerCase().includes(normalizedQuery),
    );
  }, [messages, searchQuery]);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="chat-window" aria-label="Chat window">
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

      <div className="message-list">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <MessageBubble key={message.id} message={message} searchQuery={searchQuery} />
          ))
        ) : (
          <div className="empty-search-state" role="status">
            <strong>No messages found</strong>
            <span>Try searching by sender or message text.</span>
          </div>
        )}
      </div>

      <form className="message-composer" onSubmit={handleSubmit}>
        <input type="text" placeholder="Type a message" aria-label="Message" />
        <button type="submit" aria-label="Send message">
          <Send size={18} />
        </button>
      </form>
    </section>
  );
}
