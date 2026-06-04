import { useState } from 'react';
import { ChatPage } from './pages/ChatPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { RegistrationPage } from './pages/RegistrationPage.jsx';

export default function App() {
  const [page, setPage] = useState('home');

  if (page === 'login') {
    return (
      <LoginPage
        onLogin={() => setPage('home')}
        onShowHome={() => setPage('home')}
        onShowRegistration={() => setPage('register')}
      />
    );
  }

  if (page === 'register') {
    return (
      <RegistrationPage
        onRegister={() => setPage('home')}
        onShowHome={() => setPage('home')}
        onShowLogin={() => setPage('login')}
      />
    );
  }

  return (
    <ChatPage
      onShowHome={() => setPage('home')}
      onShowLogin={() => setPage('login')}
      onShowRegistration={() => setPage('register')}
    />
  );
}
