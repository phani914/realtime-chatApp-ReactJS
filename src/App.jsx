import { useState } from 'react';
import { ChatPage } from './pages/ChatPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { RegistrationPage } from './pages/RegistrationPage.jsx';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authView, setAuthView] = useState('login');

  if (!isLoggedIn) {
    if (authView === 'register') {
      return (
        <RegistrationPage
          onRegister={() => setIsLoggedIn(true)}
          onShowLogin={() => setAuthView('login')}
        />
      );
    }

    return (
      <LoginPage
        onLogin={() => setIsLoggedIn(true)}
        onShowRegistration={() => setAuthView('register')}
      />
    );
  }

  return <ChatPage />;
}
