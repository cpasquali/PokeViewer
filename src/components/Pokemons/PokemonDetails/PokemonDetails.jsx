import React, { useEffect, useState } from "react";
import { Link } from "wouter";

export const PokemonDetails = ({ params }) => {
  const { id } = params;
  const [idPokemon, setIdPokemon] = useState(id);
  const [pokemonData, setPokemonData] = useState(null);
  const API_URL = `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`;

  const handleIdPokemon = () => {
    setIdPokemon(Number(idPokemon) + 1);
  };

  const getDataPokemonById = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        console.error("Network error....");
      }
      const data = await response.json();
      setPokemonData(data);
    } catch {
      console.error("Error fetching data...");
    }
  };

  useEffect(() => {
    getDataPokemonById();
  }, [idPokemon]);

  return (
    <div className="pokemon-details">
      {pokemonData && (
        <>
          <img
            src={pokemonData.sprites.front_default}
            alt={`imagen de ${pokemonData.name}`}
          />
          <h2>{pokemonData.name.toUpperCase()}</h2>
          <Link to="/">Go Back</Link>
          <button onClick={handleIdPokemon}>{idPokemon}</button>
        </>
      )}
    </div>
  );
};
