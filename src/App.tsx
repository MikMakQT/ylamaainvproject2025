import React, { useEffect, useState } from 'react';
import './App.css';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Inventory from './components/Inventory';
import Add from './components/Add';
import { app } from './firebase';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

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
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/add" element={<Add />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
