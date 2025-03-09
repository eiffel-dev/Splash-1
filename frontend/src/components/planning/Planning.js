import React, { useState } from 'react';
import { createGame } from '../../services/gameService';
import PlayerForm from './PlayerForm';
import './Planning.css';

const Planning = () => {
    const [gameData, setGameData] = useState({
        title: '',
        date: '',
        location: '',
        teams: [
            { color: 'white', name: '', players: [] },
            { color: 'blue', name: '', players: [] }
        ],
        notes: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');
        setIsLoading(true);

        try {
            const response = await createGame(gameData);
            setSuccessMessage(`Game created successfully! Game ID: ${response._id}`);
            // Clear form after successful submission
            setGameData({
                title: '',
                date: '',
                location: '',
                teams: [
                    { color: 'white', name: '', players: [] },
                    { color: 'blue', name: '', players: [] }
                ],
                notes: ''
            });
        } catch (error) {
            console.error('API Error:', error); // For debugging
            
            if (error.details) {
                setErrors({
                    validation: Array.isArray(error.details) ? error.details : [error.details]
                });
            } else {
                setErrors({
                    general: error.error || 'Failed to create game. Please try again.'
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handlePlayerChange = (color, players) => {
        setGameData(prev => ({
            ...prev,
            teams: prev.teams.map(team => 
                team.color === color ? { ...team, players } : team
            )
        }));
    };

    const handleTeamNameChange = (color, name) => {
        setGameData(prev => ({
            ...prev,
            teams: prev.teams.map(team => 
                team.color === color ? { ...team, name } : team
            )
        }));
    };

    return (
        <div className="planning">
            <h2>Game Planning</h2>
            
            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}
            
            {errors.validation && (
                <div className="error-messages">
                    {errors.validation.map((error, index) => (
                        <div key={index} className="error-message">{error}</div>
                    ))}
                </div>
            )}
            
            {errors.general && (
                <div className="error-message">{errors.general}</div>
            )}

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
                
                <div className="teams-section">
                    <div className="team-section">
                        <h3>White Team</h3>
                        <input
                            type="text"
                            placeholder="Team Name"
                            value={gameData.teams[0].name}
                            onChange={(e) => handleTeamNameChange('white', e.target.value)}
                            className="team-name-input"
                        />
                        <PlayerForm 
                            color="white"
                            players={gameData.teams[0].players}
                            onPlayerChange={handlePlayerChange}
                            errors={errors}
                        />
                    </div>
                    <div className="team-section">
                        <h3>Blue Team</h3>
                        <input
                            type="text"
                            placeholder="Team Name"
                            value={gameData.teams[1].name}
                            onChange={(e) => handleTeamNameChange('blue', e.target.value)}
                            className="team-name-input"
                        />
                        <PlayerForm 
                            color="blue"
                            players={gameData.teams[1].players}
                            onPlayerChange={handlePlayerChange}
                            errors={errors}
                        />
                    </div>
                </div>

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