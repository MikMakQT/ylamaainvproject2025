import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Homepage.css';
import './Add.css';
import { pushData } from '../utils/database';

interface FormData {
    paksuus: string;
    varikoodi: string;
    leveys: string;
    pituus: string;
}

const Add: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        paksuus: '',
        varikoodi: '',
        leveys: '',
        pituus: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        // Basic validation
        if (!formData.paksuus || !formData.varikoodi || !formData.leveys || !formData.pituus) {
            setError('Kaikki kentät ovat pakollisia.');
            setLoading(false);
            return;
        }

        try {
            const dataToSave = {
                ...formData,
                timestamp: new Date().toISOString()
            };

            const result = await pushData('inventory', dataToSave);

            if (result.success) {
                setSuccess(true);
                setFormData({
                    paksuus: '',
                    varikoodi: '',
                    leveys: '',
                    pituus: ''
                });

                setTimeout(() => setSuccess(false), 3000);
            } else {
                setError('Virhe tallennuksessa. Yritä uudelleen.');
            }
        } catch (err) {
            setError('Tapahtui virhe. Yritä myöhemmin uudelleen.');
            console.error('Error saving data:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="homepage" style={{ backgroundColor: '#d3d3d3', minHeight: '100vh', padding: '20px' }}>
            <header className="topbar">
                <div className="page-title-placeholder">Add Item</div>
                <div className="user-info">
                    <div className="user-name">Add New Inventory</div>
                </div>
            </header>
            <Sidebar activePage="add" />
            <main className="homepage-content add-page-content">
                <div className="welcome-message">
                    <h1>Lisää tuote varastoon</h1>
                    <p>Täytä alla olevat kentät lisätäksesi uuden tuotteen varastoon.</p>

                    <form onSubmit={handleSubmit} className="add-form-container">
                        <div className="add-form-grid">
                            <div className="add-form-field">
                                <label htmlFor="varikoodi" className="add-form-label">
                                    Värikoodi
                                </label>
                                <input
                                    type="text"
                                    id="varikoodi"
                                    name="varikoodi"
                                    value={formData.varikoodi}
                                    onChange={handleInputChange}
                                    className="add-form-input"
                                    required
                                />
                            </div>

                            <div className="add-form-field">
                                <label htmlFor="pituus" className="add-form-label">
                                    Pituus
                                </label>
                                <input
                                    type="text"
                                    id="pituus"
                                    name="pituus"
                                    value={formData.pituus}
                                    onChange={handleInputChange}
                                    className="add-form-input"
                                    required
                                />
                            </div>

                            <div className="add-form-field">
                                <label htmlFor="leveys" className="add-form-label">
                                    Leveys
                                </label>
                                <input
                                    type="text"
                                    id="leveys"
                                    name="leveys"
                                    value={formData.leveys}
                                    onChange={handleInputChange}
                                    className="add-form-input"
                                    required
                                />
                            </div>

                            <div className="add-form-field">
                                <label htmlFor="paksuus" className="add-form-label">
                                    Paksuus
                                </label>
                                <input
                                    type="text"
                                    id="paksuus"
                                    name="paksuus"
                                    value={formData.paksuus}
                                    onChange={handleInputChange}
                                    className="add-form-input"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="add-form-error">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="add-form-success">
                                Tuote lisätty onnistuneesti!
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="add-form-submit"
                        >
                            {loading ? 'Tallennetaan...' : 'Lisää tuote'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Add;
