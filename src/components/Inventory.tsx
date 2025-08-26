import React from 'react';
import Sidebar from './Sidebar';
import './Homepage.css';

const Inventory: React.FC = () => {
    return (
        <div className="homepage">
            <header className="topbar">
                <div className="page-title-placeholder">Inventory</div>
                <div className="user-info">
                    <div className="user-name">Inventory Management</div>
                </div>
            </header>
            <Sidebar activePage="inventory" />
            <main className="homepage-content">
                <div className="welcome-message">
                    <h1>Varaston hallinta</h1>
                    <p>Tällä sivulla voi hakea varston saldoja ja tuotteita mitä varstossa on.</p>
                    <div style={{ marginTop: '20px' }}>
                        <p>Features coming soon:</p>
                        <ul>
                            <li>Etsi tuotteita</li>
                            <li>Suodata eri gatekorioittain</li>
                            <li>YMS...</li>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Inventory;
