import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./PokemonMovementPage.css"


const PokemonMovementPage = () => {
  const [ownerNames, setOwnerNames] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState('');
  const [ownerPokemons, setOwnerPokemons] = useState([]);

  useEffect(() => {
    const fetchOwnerNames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pokemons/owners'); 
        setOwnerNames(response.data);
      } catch (error) {
        console.error('Error fetching owner names', error);
      }
    };

    fetchOwnerNames();
  }, []);

  useEffect(() => {
    if (selectedOwner) {
      const fetchOwnerPokemons = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/pokemons/owners/${selectedOwner}/pokemons`);
          setOwnerPokemons(response.data);
        } catch (error) {
          console.error('Error fetching owner pokemons', error);
        }
      };

      fetchOwnerPokemons();
    } else {
      setOwnerPokemons([]);
    }
  }, [selectedOwner]);

  return (
    <div>
      <h1>Pokemon Movement Page</h1>
      <div>
        <label>Select Pokemon Owner</label>
        <select value={selectedOwner} onChange={(e) => setSelectedOwner(e.target.value)}>
          <option value="">Select an owner</option>
          {ownerNames.map((ownerName, index) => (
            <option key={index} value={ownerName}>
              {ownerName}
            </option>
          ))}
        </select>
      </div>

      {ownerPokemons.length > 0 && (
        <div>
          <h2>Pokémon for {selectedOwner}</h2>
          <ul>
            {ownerPokemons.map(pokemon => (
              <li key={pokemon.id}>
                <strong>{pokemon.name}</strong>: {pokemon.ability} (Position: {pokemon.positionX}, {pokemon.positionY})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonMovementPage;
