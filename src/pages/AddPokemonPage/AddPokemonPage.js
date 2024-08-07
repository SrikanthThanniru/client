import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchPokemonList, fetchPokemonAbilities } from '../../api/pokemonApi';
import "./AddPokemonPage.css"


const AddPokemonPage = () => {
  const [ownerName, setOwnerName] = useState('');
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonAbility, setPokemonAbility] = useState('');
  const [initialPositionX, setInitialPositionX] = useState(0);
  const [initialPositionY, setInitialPositionY] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [direction, setDirection] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [abilitiesList, setAbilitiesList] = useState([]);

  useEffect(() => {
    const getPokemonList = async () => {
      const pokemons = await fetchPokemonList();
      setPokemonList(pokemons);
    };

    getPokemonList();
  }, []);

  const handlePokemonChange = async (e) => {
    const selectedPokemon = e.target.value;
    setPokemonName(selectedPokemon);

    if (selectedPokemon) {
      const abilities = await fetchPokemonAbilities(selectedPokemon);
      setAbilitiesList(abilities);
      setPokemonAbility(abilities.length === 1 ? abilities[0] : '');
    } else {
      setAbilitiesList([]);
      setPokemonAbility('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPokemon = {
      ownerName,
      name: pokemonName,
      ability: pokemonAbility,
      positionX: initialPositionX,
      positionY: initialPositionY,
      speed: speed,
      direction: direction,
    };
    try {
      await axios.post('http://localhost:5000/api/pokemons', newPokemon);
      alert('Pokemon added successfully');
    } catch (error) {
      console.error('Error adding pokemon', error);
    }
  };

  return (
    <div>
      <h2>Add Pokemon</h2>
      <form onSubmit={handleSubmit}>
        <label>Owner Name: </label>
        <input
          type="text"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          required
        />
        <label>Pokemon Name: </label>
        <select value={pokemonName} onChange={handlePokemonChange} required>
          <option value="">Select a Pokémon</option>
          {pokemonList.map((pokemon) => (
            <option key={pokemon.name} value={pokemon.name}>{pokemon.name}</option>
          ))}
        </select>
        <label>Pokemon Ability: </label>
        {abilitiesList.length > 1 ? (
          <select value={pokemonAbility} onChange={(e) => setPokemonAbility(e.target.value)} required>
            <option value="">Select an ability</option>
            {abilitiesList.map((ability) => (
              <option key={ability} value={ability}>{ability}</option>
            ))}
          </select>
        ) : (
          <input type="text" value={pokemonAbility} readOnly />
        )}
        <label>Initial Position X: </label>
        <input
          type="number"
          value={initialPositionX}
          onChange={(e) => setInitialPositionX(e.target.value)}
          required
        />
        <label>Initial Position Y: </label>
        <input
          type="number"
          value={initialPositionY}
          onChange={(e) => setInitialPositionY(e.target.value)}
          required
        />
        <label>Speed: </label>
        <input
          type="number"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          required
        />
        <label>Direction: </label>
        <input
          type="text"
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          required
        />
        <button type="submit">Add Pokemon</button>
      </form>
    </div>
  );
};

export default AddPokemonPage;
