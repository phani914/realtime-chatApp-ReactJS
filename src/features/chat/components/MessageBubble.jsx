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
  return (
    <article className={`message-bubble ${message.isOwn ? 'own' : ''}`}>
      <span className="message-author">
        <HighlightedText text={message.author} query={searchQuery} />
      </span>
      <p>
        <HighlightedText text={message.text} query={searchQuery} />
      </p>
    </article>
  );
}
