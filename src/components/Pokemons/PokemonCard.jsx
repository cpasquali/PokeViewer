import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import PokemonCardSkeleton from "../../skeletons/PokemonCardSkeleton";
import "../../App.css";

export const PokemonCard = ({
  name,
  addFavoritePokemon,
  deleteFavoritePokemon,
}) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [habilitiesOn, setHabilitiesOn] = useState(false);
  const API_URL = `https://pokeapi.co/api/v2/pokemon/${name}/`;

  const getDataPokemon = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPokemonData(data);
    } catch (error) {
      console.error("Error fetching data...", error);
      setPokemonData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataPokemon();
  }, [name]);

  if (isLoading) {
    return <PokemonCardSkeleton />;
  }

  if (!pokemonData || !pokemonData.name) {
    return <h2 className="pokemon-card error">No data available</h2>;
  }

  if (habilitiesOn) {
    return (
      <section
        className={`pokemon-card ${
          pokemonData.types ? pokemonData.types[0].type.name : ""
        } open`}
      >
        <section className="habilities">
          {pokemonData.stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <h3>{stat.stat.name}</h3>
              <p>{stat.base_stat}</p>
            </div>
          ))}
        </section>
        <button className="btn-hability" onClick={() => setHabilitiesOn(false)}>
          See Pokemon
        </button>
      </section>
    );
  }

  return (
    <section
      className={`pokemon-card ${
        pokemonData.types ? pokemonData.types[0].type.name : ""
      }`}
    >
      {pokemonData.sprites && (
        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      )}
      <h2>{pokemonData.name.toUpperCase()}</h2>
      <button className="btn-hability" onClick={() => setHabilitiesOn(true)}>
        See Skills
      </button>
      {addFavoritePokemon ? (
        <button
          className="btn-hability favorite"
          onClick={() => addFavoritePokemon(pokemonData.name)}
        >
          <ion-icon name="heart-outline"></ion-icon>
        </button>
      ) : deleteFavoritePokemon ? (
        <button
          className="btn-hability favorite"
          onClick={() => deleteFavoritePokemon(pokemonData.name)}
        >
          <ion-icon name="heart-dislike-outline"></ion-icon>
        </button>
      ) : (
        ""
      )}
    </section>
  );
};
