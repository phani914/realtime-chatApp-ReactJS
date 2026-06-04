import {
  Bell,
  CheckCircle2,
  Circle,
  FileText,
  Inbox,
  ListTodo,
  Paperclip,
  Phone,
  Pin,
  Search,
  Send,
  Smile,
  Video,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MessageBubble } from './MessageBubble.jsx';
import { useChatMessages } from '../hooks/useChatMessages.js';

export function ChatWindow() {
  const {
    activeRoom,
    activeRoomId,
    connectionStatus,
    deleteMessage,
    editMessage,
    isTyping,
    messages,
    awayCount,
    offlineCount,
    onlineCount,
    reactToMessage,
    receiveMessage,
    rooms,
    sendMessage,
    switchRoom,
    toggleTask,
    typingAuthor,
    updateDraftTyping,
  } = useChatMessages();
  const [searchQuery, setSearchQuery] = useState('');
  const [draft, setDraft] = useState('');
  const messageListRef = useRef(null);
  const quickReplies = useMemo(
    () => [
      'I am on it.',
      'Can you share more context?',
      `Posting an update in ${activeRoom?.name ?? 'this room'}.`,
    ],
    [activeRoom?.name],
  );
  const taskSummary = useMemo(() => {
    const tasks = activeRoom?.tasks ?? [];
    const completedTasks = tasks.filter((task) => task.done).length;

    return {
      completedTasks,
      totalTasks: tasks.length,
    };
  }, [activeRoom?.tasks]);

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
    updateDraftTyping('');
  }

  function handleDraftChange(event) {
    const nextDraft = event.target.value;

    setDraft(nextDraft);
    updateDraftTyping(nextDraft);
  }

  function handleQuickReply(reply) {
    sendMessage(reply);
    setDraft('');
    updateDraftTyping('');
  }

  return (
    <section className="chat-window" aria-label="Chat window">
      <nav className="room-switcher" aria-label="Chat rooms">
        {rooms.map((room) => (
          <button
            type="button"
            className={room.id === activeRoomId ? 'active' : ''}
            key={room.id}
            onClick={() => switchRoom(room.id)}
          >
            <span>{room.name}</span>
            {room.unread ? <span className="room-unread">{room.unread}</span> : null}
          </button>
        ))}
      </nav>

      <header className="chat-room-header">
        <div className="chat-room-title">
          <span className="chat-avatar" aria-hidden="true">
            {activeRoom?.initials ?? 'PR'}
          </span>
          <div>
            <h2>{activeRoom?.name ?? 'Pulse Room'}</h2>
            <p>
              <span className="presence-dot online" aria-hidden="true" /> {onlineCount} online · {connectionStatus}
              {isTyping ? ` · ${typingAuthor} is typing` : ''}
            </p>
            <span className="chat-room-description">
              {activeRoom?.description ?? 'Live team messages and room updates.'}
            </span>
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
        <span className="presence-chip room">
          <Bell size={14} aria-hidden="true" />
          {activeRoom?.category ?? 'Channel'} · {activeRoom?.members ?? 0} members
        </span>
      </div>

      <section className="room-context" aria-label="Room context">
        <div className="room-context-topline">
          <div className="pinned-note">
            <Pin size={15} aria-hidden="true" />
            <span>{activeRoom?.pinned ?? 'Pinned updates will appear here.'}</span>
          </div>
          <span className="room-progress">
            {taskSummary.completedTasks}/{taskSummary.totalTasks} tasks done
          </span>
        </div>

        <div className="room-context-grid">
          <div className="room-context-panel">
            <div className="room-context-title">
              <FileText size={15} aria-hidden="true" />
              <span>Shared files</span>
            </div>
            <div className="shared-file-list">
              {(activeRoom?.files ?? []).map((file) => (
                <button type="button" key={file.id}>
                  <span>{file.name}</span>
                  <small>{file.size}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="room-context-panel">
            <div className="room-context-title">
              <ListTodo size={15} aria-hidden="true" />
              <span>Room tasks</span>
            </div>
            <div className="room-task-list">
              {(activeRoom?.tasks ?? []).map((task) => {
                const TaskIcon = task.done ? CheckCircle2 : Circle;

                return (
                  <button
                    type="button"
                    className={task.done ? 'done' : ''}
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                  >
                    <TaskIcon size={15} aria-hidden="true" />
                    <span>{task.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

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
              <MessageBubble
                key={message.id}
                message={message}
                searchQuery={searchQuery}
                onDelete={deleteMessage}
                onEdit={editMessage}
                onReact={reactToMessage}
              />
            ))}
            {isTyping && !searchQuery ? (
              <div className="typing-indicator" role="status" aria-label={`${typingAuthor} is typing`}>
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

      <div className="quick-replies" aria-label="Quick replies">
        {quickReplies.map((reply) => (
          <button type="button" key={reply} onClick={() => handleQuickReply(reply)}>
            {reply}
          </button>
        ))}
      </div>

      <form className="message-composer" onSubmit={handleSubmit}>
        <button className="composer-tool" type="button" aria-label="Attach file">
          <Paperclip size={18} />
        </button>
        <input
          type="text"
          placeholder={`Message ${activeRoom?.name ?? 'Pulse Room'}`}
          aria-label="Message"
          value={draft}
          onChange={handleDraftChange}
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
