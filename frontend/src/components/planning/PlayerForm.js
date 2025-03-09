import React, { useState, useRef } from 'react';

const PlayerForm = ({ color, players, onPlayerChange, errors }) => {
    const [capWarning, setCapWarning] = useState('');
    const [reorderingPlayer, setReorderingPlayer] = useState(null);
    const inputRefs = useRef({});

    const checkDuplicateCaps = (updatedPlayers, currentIndex, newCapsNumber) => {
        const capsNumber = parseInt(newCapsNumber, 10);
        if (isNaN(capsNumber)) return false;
        
        return updatedPlayers.some((player, index) => 
            index !== currentIndex && 
            player.capsNumber === capsNumber
        );
    };

    const handleChange = (index, field, value) => {
        const updatedPlayers = [...players];
        updatedPlayers[index] = {
            ...updatedPlayers[index],
            [field]: field === 'capsNumber' ? parseInt(value, 10) : value
        };

        if (field === 'capsNumber') {
            if (checkDuplicateCaps(updatedPlayers, index, value)) {
                setCapWarning(`Warning: Cap number ${value} is already in use in this team`);
            } else {
                setCapWarning('');
            }

            // Store the current player before sorting
            const player = updatedPlayers[index];
            setReorderingPlayer(player);

            // Sort players
            updatedPlayers.sort((a, b) => {
                const capA = a.capsNumber || 999;
                const capB = b.capsNumber || 999;
                return capA - capB;
            });

            // Find new index of the player after sorting
            const newIndex = updatedPlayers.findIndex(p => p === player);
            
            // Schedule focus restoration after reordering
            setTimeout(() => {
                inputRefs.current[`${field}-${newIndex}`]?.focus();
                setReorderingPlayer(null);
            }, 300); // Match transition duration
        }
        
        onPlayerChange(color, updatedPlayers);
    };

    const addPlayer = () => {
        if (players.length < 15) {
            onPlayerChange(color, [...players, { name: '', capsNumber: '' }]);
        }
    };

    return (
        <div className="team-section" data-team={color}>
            {capWarning && (
                <div className="cap-warning">{capWarning}</div>
            )}
            <div className="player-list">
                {players.map((player, index) => (
                    <div 
                        key={player.capsNumber || index}
                        className={`player-row ${player === reorderingPlayer ? 'reordering' : ''}`}
                    >
                        <div className="player-input">
                            <input
                                ref={el => inputRefs.current[`name-${index}`] = el}
                                type="text"
                                placeholder="Player Name"
                                value={player.name || ''}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                                className={errors?.validation?.includes('Player name is required') ? 'error' : ''}
                            />
                        </div>
                        <div className="player-input">
                            <input
                                ref={el => inputRefs.current[`capsNumber-${index}`] = el}
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
            </div>
            {players.length < 15 && (
                <button type="button" onClick={addPlayer}>
                    Add Player
                </button>
            )}
        </div>
    );
};

export default PlayerForm;