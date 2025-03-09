import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <li><Link to="/planning">Game Planning</Link></li>
        <li><Link to="/tracking">Game Tracking</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;