import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import TodoListPage from './TodoListPage';
import Header from './Header'; // <-- 1. Import Header
import Footer from './Footer'; // <-- 2. Import Footer
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      {/* This flex layout ensures the footer stays at the bottom */}
      <div className="flex flex-col min-h-screen">
        {/* 3. Render Header and pass props */}
        <Header user={user} onLogout={handleLogout} />

        {/* This makes the main content area grow to fill available space */}
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route 
              path="/" 
              element={<TodoListPage user={user} />} // Logout prop is no longer needed here
            />
          </Routes>
        </main>
        
        {/* 4. Render Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;