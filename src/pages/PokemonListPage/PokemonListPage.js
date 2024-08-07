import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./PokemonListPage.css"


const PokemonListPage = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pokemons');
        setPokemons(response.data);
      } catch (error) {
        console.error('Error fetching pokemons', error);
      }
    };

    fetchPokemons();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/pokemons/${id}`);
      setPokemons(pokemons.filter(pokemon => pokemon.id !== id));
    } catch (error) {
      console.error('Error deleting pokemon', error);
    }
  };

  return (
    <div>
      <h2>Pokemon List</h2>
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
          {pokemons.map((pokemon) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonListPage;
