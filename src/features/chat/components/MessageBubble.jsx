export function MessageBubble({ message }) {
  return (
    <article className={`message-bubble ${message.isOwn ? 'own' : ''}`}>
      <span className="message-author">{message.author}</span>
      <p>{message.text}</p>
    </article>
  );
}
