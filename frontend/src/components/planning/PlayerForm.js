import React, { useState } from 'react';

const PlayerForm = ({ color, players, onPlayerChange, errors }) => {
    const [validationError, setValidationError] = useState('');

    const validateUniqueCaps = (updatedPlayers, currentIndex, newCapsNumber) => {
        const capsNumber = parseInt(newCapsNumber, 10);
        if (isNaN(capsNumber)) return true;
        
        return !updatedPlayers.some((player, index) => 
            index !== currentIndex && 
            player.capsNumber === capsNumber
        );
    };

    const handleChange = (index, field, value) => {
        if (field === 'capsNumber' && !validateUniqueCaps(players, index, value)) {
            setValidationError(`Cap number ${value} is already in use in this team`);
            return;
        }
        
        setValidationError(''); // Clear error when input is valid
        const updatedPlayers = [...players];
        updatedPlayers[index] = {
            ...updatedPlayers[index],
            [field]: field === 'capsNumber' ? parseInt(value, 10) : value
        };
        onPlayerChange(color, updatedPlayers);
    };

    const addPlayer = () => {
        if (players.length < 15) {
            onPlayerChange(color, [...players, { name: '', capsNumber: '' }]);
        }
    };

    return (
        <div className="team-section">
            <h3>{color === 'white' ? 'White Team' : 'Blue Team'}</h3>
            {validationError && (
                <div className="validation-error">{validationError}</div>
            )}
            {players.map((player, index) => (
                <div key={index} className="player-row">
                    <div className="player-input">
                        <input
                            type="text"
                            placeholder="Player Name"
                            value={player.name || ''}
                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                            className={errors?.validation?.includes('Player name is required') ? 'error' : ''}
                        />
                    </div>
                    <div className="player-input">
                        <input
                            type="number"
                            min="1"
                            max="15"
                            placeholder="Cap #"
                            value={player.capsNumber || ''}
                            onChange={(e) => handleChange(index, 'capsNumber', e.target.value)}
                            className={errors?.validation?.some(err => 
                                err.includes('cap') || err.includes('Duplicate')
                            ) ? 'error' : ''}
                        />
                    </div>
                </div>
            ))}
            {players.length < 15 && (
                <button type="button" onClick={addPlayer}>
                    Add Player
                </button>
            )}
        </div>
    );
};

export default PlayerForm;