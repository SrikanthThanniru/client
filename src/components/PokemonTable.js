import React from 'react';
import axios from 'axios';

const PokemonTable = ({ pokemons, onRefresh }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/pokemons/${id}`);
      onRefresh(); 
    } catch (error) {
      console.error('Error deleting Pokémon:', error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Owner Name</th>
          <th>Pokemon Name</th>
          <th>Ability</th>
          <th>Initial Position X</th>
          <th>Initial Position Y</th>
          <th>Speed</th>
          <th>Direction</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            <tr key={pokemon.id}>
              <td>{pokemon.ownerName}</td>
              <td>{pokemon.name}</td>
              <td>{pokemon.ability}</td>
              <td>{pokemon.positionX}</td>
              <td>{pokemon.positionY}</td>
              <td>{pokemon.speed}</td>
              <td>{pokemon.direction}</td>
              <td>
                <button onClick={() => handleDelete(pokemon.id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8">No Pokémon found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default PokemonTable;
