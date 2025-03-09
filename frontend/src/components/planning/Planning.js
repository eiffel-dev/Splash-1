import React, { useState } from 'react';
import { createGame } from '../../services/gameService';

const Planning = () => {
    const [gameData, setGameData] = useState({
        title: '',
        date: '',
        location: '',
        teams: [],
        notes: ''
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await createGame(gameData);
            console.log('Game created:', response);
            // Clear form after successful submission
            setGameData({
                title: '',
                date: '',
                location: '',
                teams: [],
                notes: ''
            });
        } catch (err) {
            setError('Failed to save game plan. Please try again.');
            console.error('Error creating game:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="planning">
            <h2>Game Planning</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Game Title"
                    value={gameData.title}
                    onChange={(e) => setGameData({...gameData, title: e.target.value})}
                />
                <input
                    type="date"
                    value={gameData.date}
                    onChange={(e) => setGameData({...gameData, date: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={gameData.location}
                    onChange={(e) => setGameData({...gameData, location: e.target.value})}
                />
                <textarea
                    placeholder="Notes"
                    value={gameData.notes}
                    onChange={(e) => setGameData({...gameData, notes: e.target.value})}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Game Plan'}
                </button>
            </form>
        </div>
    );
};

export default Planning;