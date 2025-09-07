import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './Homepage.css';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface InventoryItem {
    id: string;
    varikoodi: string;
    pituus: string;
    leveys: string;
    paksuus: string;
    // add other fields if needed
}

const Inventory: React.FC = () => {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [search, setSearch] = useState({
        varikoodi: '',
        pituus: '',
        leveys: '',
        paksuus: ''
    });

    useEffect(() => {
        const fetchItems = async () => {
            const querySnapshot = await getDocs(collection(db, 'inventory'));
            const data: InventoryItem[] = [];
            querySnapshot.forEach(doc => {
                data.push({ id: doc.id, ...doc.data() } as InventoryItem);
            });
            setItems(data);
        };
        fetchItems();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearch(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filteredItems = items.filter(item =>
        item.varikoodi.toLowerCase().includes(search.varikoodi.toLowerCase()) &&
        item.pituus.toLowerCase().includes(search.pituus.toLowerCase()) &&
        item.leveys.toLowerCase().includes(search.leveys.toLowerCase()) &&
        item.paksuus.toLowerCase().includes(search.paksuus.toLowerCase())
    );

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
                    <p>Tällä sivulla voi hakea varaston saldoja ja tuotteita mitä varastossa on.</p>
                </div>
                <div style={{ margin: '20px 0' }}>
                    <h3>Hae tuotteita</h3>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <input
                            type="text"
                            name="varikoodi"
                            placeholder="Värikoodi"
                            value={search.varikoodi}
                            onChange={handleSearchChange}
                        />
                        <input
                            type="text"
                            name="pituus"
                            placeholder="Pituus"
                            value={search.pituus}
                            onChange={handleSearchChange}
                        />
                        <input
                            type="text"
                            name="leveys"
                            placeholder="Leveys"
                            value={search.leveys}
                            onChange={handleSearchChange}
                        />
                        <input
                            type="text"
                            name="paksuus"
                            placeholder="Paksuus"
                            value={search.paksuus}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Värikoodi</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Pituus</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Leveys</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Paksuus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', padding: '16px' }}>Ei tuloksia</td>
                                </tr>
                            ) : (
                                filteredItems.map(item => (
                                    <tr key={item.id}>
                                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.varikoodi}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.pituus}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.leveys}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.paksuus}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default Inventory;
