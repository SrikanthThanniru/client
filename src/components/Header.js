import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add-pokemon">Add Pokemon</Link></li>
          <li><Link to="/pokemon-list">Pokemon List</Link></li>
          <li><Link to="/pokemon-movement">Pokemon Movement</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
