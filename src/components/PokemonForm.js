import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonForm = ({ onAddPokemon }) => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonAbility, setPokemonAbility] = useState('');
  const [pokemonOwnerName, setPokemonOwnerName] = useState('');
  const [direction, setDirection] = useState('');
  const [initialPositionX, setInitialPositionX] = useState('');
  const [initialPositionY, setInitialPositionY] = useState('');
  const [speed, setSpeed] = useState('');
  const [abilities, setAbilities] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon-species/1/');
        setAbilities(response.data.abilities.map(ability => ability.ability.name));
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); 
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPokemon = {
        pokemonName,
        pokemonAbility,
        pokemonOwnerName,
        direction,
        initialPositionX,
        initialPositionY,
        speed,
      };
      await axios.post('/api/pokemons', newPokemon);
      onAddPokemon(); 
    } catch (error) {
      console.error('Error adding Pokémon:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Pokemon Owner Name</label>
        <input
          type="text"
          value={pokemonOwnerName}
          onChange={(e) => setPokemonOwnerName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Pokemon Name</label>
        <select
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          required
        >
          {users.map(user => (
            <option key={user.id} value={user.name}>{user.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Pokemon Ability</label>
        <select
          value={pokemonAbility}
          onChange={(e) => setPokemonAbility(e.target.value)}
          required
        >
          {abilities.map((ability, index) => (
            <option key={index} value={ability}>{ability}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Initial Position X</label>
        <input
          type="number"
          value={initialPositionX}
          onChange={(e) => setInitialPositionX(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Initial Position Y</label>
        <input
          type="number"
          value={initialPositionY}
          onChange={(e) => setInitialPositionY(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Speed (m/s)</label>
        <input
          type="number"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Direction</label>
        <input
          type="text"
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Pokémon</button>
    </form>
  );
};

export default PokemonForm;
