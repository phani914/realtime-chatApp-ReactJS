import { Send } from 'lucide-react';
import { MessageBubble } from './MessageBubble.jsx';
import { useChatMessages } from '../hooks/useChatMessages.js';

export function ChatWindow() {
  const { messages } = useChatMessages();

  return (
    <section className="chat-window" aria-label="Chat window">
      <div className="message-list">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      <form className="message-composer">
        <input type="text" placeholder="Type a message" aria-label="Message" />
        <button type="submit" aria-label="Send message">
          <Send size={18} />
        </button>
      </form>
    </section>
  );
}
