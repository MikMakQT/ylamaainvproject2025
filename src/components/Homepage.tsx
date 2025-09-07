import React from 'react';
import './Homepage.css';
import { getAuth, signOut } from 'firebase/auth';
import { NavLink } from 'react-router-dom';
import InventoryCarousel from "./InventoryCarousel";

const Homepage: React.FC = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                window.location.reload();
            })
            .catch((error) => {
                // An error happened.
                console.error('Logout error:', error);
            });
    };

    return (
        <div className="homepage">
            <header className="topbar">
                <div className="page-title-placeholder">Homepage</div>
                <div className="user-info">
                    {user ? (
                        <div className="user-name">
                            <svg
                                className="user-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                width="24px"
                                height="24px"
                                aria-hidden="true"
                            >
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            {user.displayName || user.email}
                        </div>
                    ) : (
                        <div className="user-name">Not logged in</div>
                    )}
                </div>
            </header>
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? 'sidebar-link active' : 'sidebar-link'
                        }
                        end
                    >
                        Homepage
                    </NavLink>
                    <NavLink
                        to="/inventory"
                        className={({ isActive }) =>
                            isActive ? 'sidebar-link active' : 'sidebar-link'
                        }
                    >
                        Inventory
                    </NavLink>
                    <NavLink
                        to="/add"
                        className={({ isActive }) =>
                            isActive ? 'sidebar-link active' : 'sidebar-link'
                        }
                    >
                        Add
                    </NavLink>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </nav>
            </div>
            <main className="homepage-content">
                <InventoryCarousel />
                <div className="welcome-message">
                    <h1>Tähän tulee aloitussivun näkymä</h1>
                    <p>Tälle sivulle päivittyvät uusimmat tallennetut tiedot.</p>
                </div>
            </main>
        </div>
    );
};

export default Homepage;
