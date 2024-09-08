import React, { useContext, useEffect, useState } from "react";
import PokemonCardSkeleton from "../../skeletons/PokemonCardSkeleton";
import "../../App.css";
import { SelectLenguajeContext } from "../../context/SelectLenguajeContext";
import { Link } from "wouter";

export const PokemonCard = ({
  name,
  addFavoritePokemon,
  deleteFavoritePokemon,
}) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { lenguaje } = useContext(SelectLenguajeContext);
  const API_URL = `https://pokeapi.co/api/v2/pokemon/${name}/`;
  const pokemonType =
    pokemonData && pokemonData.types ? pokemonData.types[0].type.name : "";

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

  if (!pokemonData || !pokemonData.name || !pokemonData.types) {
    return <h2 className="pokemon-card error">No data available</h2>;
  }

  if (lenguaje === "english") {
    return (
      <section className={`pokemon-card ${pokemonType}`}>
        {pokemonData.sprites && (
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        )}
        <h2>{pokemonData.name.toUpperCase()}</h2>
        <section className="btnCardContainer">
          {addFavoritePokemon ? (
            <button
              className={`btn-hability favorite ${pokemonType}`}
              onClick={() => addFavoritePokemon(pokemonData.name)}
            >
              <ion-icon name="heart-outline"></ion-icon>
            </button>
          ) : deleteFavoritePokemon ? (
            <button
              className={`btn-hability favorite ${pokemonType}`}
              onClick={() => deleteFavoritePokemon(pokemonData.name)}
            >
              <ion-icon name="heart-dislike-outline"></ion-icon>
            </button>
          ) : (
            ""
          )}
          <Link to={`/pokemon/${name}`} className={`btn-link ${pokemonType}`}>
            See
          </Link>
        </section>
      </section>
    );
  }

  return (
    <section className={`pokemon-card ${pokemonType}`}>
      {pokemonData.sprites && (
        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      )}
      <h2>{pokemonData.name.toUpperCase()}</h2>
      <section className="btnCardContainer">
        {addFavoritePokemon ? (
          <button
            className={`btn-hability favorite ${pokemonType}`}
            onClick={() => addFavoritePokemon(pokemonData.name)}
          >
            <ion-icon name="heart-outline"></ion-icon>
          </button>
        ) : deleteFavoritePokemon ? (
          <button
            className={`btn-hability favorite ${pokemonType}`}
            onClick={() => deleteFavoritePokemon(pokemonData.name)}
          >
            <ion-icon name="heart-dislike-outline"></ion-icon>
          </button>
        ) : (
          ""
        )}
        <Link to={`/pokemon/${name}`} className={`btn-link ${pokemonType}`}>
          Ver
        </Link>
      </section>
    </section>
  );
};
