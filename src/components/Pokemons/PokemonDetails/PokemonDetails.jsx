import React, { useContext, useEffect, useState } from "react";
import { Link } from "wouter";
import Swal from "sweetalert2";
import { ThemeContext } from "../../../context/ThemeContext";
import "./PokemonDetails.css";

export const PokemonDetails = ({ params }) => {
  const { name } = params;
  const [namePokeon] = useState(name);
  const [pokemonData, setPokemonData] = useState(null);
  const { theme } = useContext(ThemeContext)
  const API_URL = `https://pokeapi.co/api/v2/pokemon/${namePokeon}/`;
  const pokemonType =
    pokemonData && pokemonData.types ? pokemonData.types[0].type.name : "";

  const getDataFromLocalStorage = () => {
    const data = localStorage.getItem("localPokemons")
    return data ? JSON.parse(data) : []
  }

  const [favoritesPokemon, setFavoritesPokemon] = useState(getDataFromLocalStorage)

  const removePokemonFromFavorites = (pokemon) => {
    const newFavorites = favoritesPokemon.filter((p) => p !== pokemon)
    setFavoritesPokemon(newFavorites)
  }

  const addFavoritePokemon = (pokemon) => {
    setFavoritesPokemon((prevFavorite) => [...prevFavorite, pokemon]);
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

  useEffect(()=>{
    localStorage.setItem("localPokemons", JSON.stringify(favoritesPokemon))
  },[favoritesPokemon])

  useEffect(() => {
    getDataPokemonById();
  }, [namePokeon]);

  return (
    <main className={`main-pokemon-details ${theme}`}>
      <div className={`pokemon-details ${pokemonType}`}>
        {pokemonData && (
          <>
            <img
              src={pokemonData.sprites.front_default}
              alt={`imagen de ${pokemonData.name}`}
              className="poke-img front"
            />
            <section className={`containt ${theme}`}>
              {pokemonData.stats.map((hability, index) => (
                <section key={index} className="habilities-pokemon">
                  <p>{hability.stat.name}</p>
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow={hability.base_stat}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar"
                      style={{ width: `${hability.base_stat}%` }}
                    ></div>
                  </div>
                </section>
              ))}
              <div className="btn-container">
                <Link className={`go-back-button ${theme}`} to="/"><ion-icon className={`icon-color ${theme}`} name="arrow-back-circle-outline"></ion-icon></Link>
                {
                  favoritesPokemon.includes(pokemonData.name) ?   (<button onClick={()=>removePokemonFromFavorites(pokemonData.name)} className={`btn-favorite ${theme}`}>Eliminar de Favoritos</button>) : (<button onClick={()=>addFavoritePokemon(pokemonData.name)} className={`btn-favorite ${theme}`}>Añadir a Favoritos</button>)
                }
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
};
