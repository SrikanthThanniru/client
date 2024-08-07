import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AddPokemonPage from './pages/AddPokemonPage/AddPokemonPage';
import PokemonListPage from './pages/PokemonListPage/PokemonListPage';
import PokemonMovementPage from './pages/PokemonMovementPage/PokemonMovementPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-pokemon" element={<AddPokemonPage />} />
        <Route path="/pokemon-list" element={<PokemonListPage />} />
        <Route path="/pokemon-movement" element={<PokemonMovementPage />} />
      </Routes>
    </Router>
  );
}

export default App;
