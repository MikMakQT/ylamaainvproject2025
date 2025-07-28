import React from 'react';
import './Homepage.css';
import { getAuth } from 'firebase/auth';

const Homepage: React.FC = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    return (
        <div className="homepage">
            <header className="topbar">
                <div className="page-title-placeholder">{/* Reserved for page title */}</div>
                <div className="user-info">
                    {user ? (
                        <div className="user-name">{user.displayName || user.email}</div>
                    ) : (
                        <div className="user-name">Not logged in</div>
                    )}
                </div>
            </header>
            <header className="taskbar">
                <nav className="taskbar-tabs">
                    <button className="taskbar-tab" disabled>
                        Homepage
                    </button>
                </nav>
            </header>
            <main className="homepage-content">
                {/* Main content area - empty for now */}
            </main>
        </div>
    );
};

export default Homepage;
