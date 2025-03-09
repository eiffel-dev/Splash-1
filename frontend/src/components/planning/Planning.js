import React, { useState } from 'react';

const Planning = () => {
  const [gameData, setGameData] = useState({
    title: '',
    date: '',
    location: '',
    teams: [],
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add API call to save game plan
  };

  return (
    <div className="planning">
      <h2>Game Planning</h2>
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
        <button type="submit">Save Game Plan</button>
      </form>
    </div>
  );
};

export default Planning;