import { Check, CheckCheck } from 'lucide-react';
import { formatTime } from '../../../utils/formatDate.js';

function HighlightedText({ text, query }) {
  if (!query.trim()) {
    return text;
  }

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={`${part}-${index}`}>{part}</mark>
    ) : (
      part
    ),
  );
}

export function MessageBubble({ message, searchQuery = '' }) {
  const MessageStatusIcon = message.status === 'read' ? CheckCheck : Check;

  return (
    <article className={`message-bubble ${message.isOwn ? 'own' : ''}`}>
      <div className="message-meta">
        <span className="message-author">
          <HighlightedText text={message.author} query={searchQuery} />
        </span>
        <time dateTime={message.sentAt}>{formatTime(new Date(message.sentAt))}</time>
      </div>
      <p>
        <HighlightedText text={message.text} query={searchQuery} />
      </p>
      {message.isOwn ? (
        <span className="message-status">
          <MessageStatusIcon size={14} aria-hidden="true" />
          {message.status}
        </span>
      ) : null}
    </article>
  );
}
