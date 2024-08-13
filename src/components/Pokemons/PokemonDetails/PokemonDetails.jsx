import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import "./PokemonDetails.css"

export const PokemonDetails = ({ params }) => {
  const { name } = params;
  const [idPokemon, setIdPokemon] = useState(name);
  const [pokemonData, setPokemonData] = useState(null);
  const API_URL = `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`;
  const pokemonType =
    pokemonData && pokemonData.types ? pokemonData.types[0].type.name : "";
  
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
    <main className={`main-pokemon-details ${pokemonType}`}>
      <div className="pokemon-details">
      {pokemonData && (
        <>
          <img
            src={pokemonData.sprites.front_default}
            alt={`imagen de ${pokemonData.name}`}
            className="poke-img"
          />
          <h2>{pokemonData.name.toUpperCase()}</h2>
          <Link to="/">Go Back</Link>
        </>
      )}
    </div>
    </main>
  );
};
