import React, { useState } from 'react';

const GameTracker = ({ game }) => {
  const [score, setScore] = useState({
    blue: 0,
    white: 0
  });

  const updateScore = (team, points) => {
    setScore(prev => ({
      ...prev,
      [team]: prev[team] + points
    }));
  };

  return (
    <div className="game-tracker">
      <div className="score-board">
        <div className="team-score team-blue">
          <h3>Blue Team</h3>
          <p>{score.blue}</p>
          <button onClick={() => updateScore('blue', 1)}>+1</button>
        </div>
        <div className="team-score team-white">
          <h3>White Team</h3>
          <p>{score.white}</p>
          <button onClick={() => updateScore('white', 1)}>+1</button>
        </div>
      </div>
    </div>
  );
};

export default GameTracker;