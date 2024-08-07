import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon?limit=1000`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    return [];
  }
};

export const fetchPokemonAbilities = async (pokemonName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${pokemonName}`);
    return response.data.abilities.map(ability => ability.ability.name);
  } catch (error) {
    console.error(`Error fetching abilities for ${pokemonName}:`, error);
    return [];
  }
};
