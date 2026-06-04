import { Check, CheckCheck, Edit3, Eye, Heart, PartyPopper, Save, Trash2, X } from 'lucide-react';
import { useState } from 'react';
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

const reactionOptions = [
  { id: 'heart', label: 'Love', icon: Heart },
  { id: 'clap', label: 'Celebrate', icon: PartyPopper },
  { id: 'eyes', label: 'Watching', icon: Eye },
];

export function MessageBubble({
  message,
  searchQuery = '',
  onDelete,
  onEdit,
  onReact,
}) {
  const MessageStatusIcon = message.status === 'read' ? CheckCheck : Check;
  const [isEditing, setIsEditing] = useState(false);
  const [editDraft, setEditDraft] = useState(message.text);

  function handleEditSubmit(event) {
    event.preventDefault();
    onEdit(message.id, editDraft);
    setIsEditing(false);
  }

  return (
    <article className={`message-bubble ${message.isOwn ? 'own' : ''}`}>
      <div className="message-meta">
        <span className="message-author">
          <HighlightedText text={message.author} query={searchQuery} />
        </span>
        <span className="message-time-row">
          <time dateTime={message.sentAt}>{formatTime(new Date(message.sentAt))}</time>
          {message.edited ? <span>edited</span> : null}
        </span>
      </div>
      {isEditing ? (
        <form className="message-edit-form" onSubmit={handleEditSubmit}>
          <input
            aria-label="Edit message"
            value={editDraft}
            onChange={(event) => setEditDraft(event.target.value)}
          />
          <button type="submit" aria-label="Save message">
            <Save size={14} />
          </button>
          <button
            type="button"
            aria-label="Cancel edit"
            onClick={() => {
              setEditDraft(message.text);
              setIsEditing(false);
            }}
          >
            <X size={14} />
          </button>
        </form>
      ) : (
        <p>
          <HighlightedText text={message.text} query={searchQuery} />
        </p>
      )}

      <div className="message-reactions" aria-label="Message reactions">
        {reactionOptions.map((reaction) => {
          const Icon = reaction.icon;
          const count = message.reactions?.[reaction.id] ?? 0;

          return (
            <button
              type="button"
              key={reaction.id}
              aria-label={`${reaction.label} reaction`}
              onClick={() => onReact(message.id, reaction.id)}
            >
              <Icon size={13} />
              {count > 0 ? <span>{count}</span> : null}
            </button>
          );
        })}
      </div>

      {message.isOwn ? (
        <div className="message-footer">
          <span className="message-status">
            <MessageStatusIcon size={14} aria-hidden="true" />
            {message.status}
          </span>
          <span className="message-actions">
            <button type="button" aria-label="Edit message" onClick={() => setIsEditing(true)}>
              <Edit3 size={13} />
            </button>
            <button type="button" aria-label="Delete message" onClick={() => onDelete(message.id)}>
              <Trash2 size={13} />
            </button>
          </span>
        </div>
      ) : null}
    </article>
  );
}
