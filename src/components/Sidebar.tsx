import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './Homepage.css';

interface SidebarProps {
    activePage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
    const auth = getAuth();
    const navRef = useRef<HTMLElement>(null);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error('Logout error:', error);
            });
    };

    // Keyboard navigation handler
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!navRef.current) return;

            const links = navRef.current.querySelectorAll('.sidebar-link, .logout-button');
            const currentIndex = Array.from(links).findIndex(link =>
                document.activeElement === link
            );

            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    const nextIndex = (currentIndex + 1) % links.length;
                    (links[nextIndex] as HTMLElement).focus();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    const prevIndex = currentIndex <= 0 ? links.length - 1 : currentIndex - 1;
                    (links[prevIndex] as HTMLElement).focus();
                    break;
                case 'Tab':
                    // Allow default tab behavior
                    break;
                case 'Enter':
                case ' ':
                    if (document.activeElement?.classList.contains('sidebar-link')) {
                        event.preventDefault();
                        (document.activeElement as HTMLElement).click();
                    }
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="sidebar">
            <nav className="sidebar-nav" ref={navRef}>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? 'sidebar-link active' : 'sidebar-link'
                    }
                    end
                    tabIndex={0}
                >
                    Homepage
                </NavLink>
                <NavLink
                    to="/inventory"
                    className={({ isActive }) =>
                        isActive ? 'sidebar-link active' : 'sidebar-link'
                    }
                    tabIndex={0}
                >
                    Inventory
                </NavLink>
                <NavLink
                    to="/add"
                    className={({ isActive }) =>
                        isActive ? 'sidebar-link active' : 'sidebar-link'
                    }
                    tabIndex={0}
                >
                    Add
                </NavLink>
                <button
                    className="logout-button"
                    onClick={handleLogout}
                    tabIndex={0}
                >
                    Logout
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;
