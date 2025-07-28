import React, { useEffect, useState } from 'react';
import './App.css';
import Homepage from './components/Homepage';
import Login from './components/Login';
import { app } from './firebase';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';

const auth = getAuth(app);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="app-loading">Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="app">
      <Homepage />
    </div>
  );
};

export default App;
