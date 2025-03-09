import React, { useState, useEffect } from 'react';

const Tracking = () => {
  const [games, setGames] = useState([]);
  const [activeGame, setActiveGame] = useState(null);

  useEffect(() => {
    // TODO: Add API call to fetch planned games
  }, []);

  return (
    <div className="tracking">
      <h2>Game Tracking</h2>
      {!activeGame ? (
        <div className="game-list">
          <h3>Select a Game to Track</h3>
          {games.map(game => (
            <div 
              key={game.id} 
              className="game-item"
              onClick={() => setActiveGame(game)}
            >
              <h4>{game.title}</h4>
              <p>{new Date(game.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="game-tracker">
          <h3>{activeGame.title}</h3>
          {/* Add game tracking interface here */}
        </div>
      )}
    </div>
  );
};

export default Tracking;