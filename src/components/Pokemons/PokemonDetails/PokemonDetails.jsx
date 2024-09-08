import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import "./PokemonDetails.css";

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
    <main className={`main-pokemon-details`}>
      <div className={`pokemon-details ${pokemonType}`}>
        {pokemonData && (
          <>
            <section className="info-pokemon">
              <img
                src={pokemonData.sprites.front_default}
                alt={`imagen de ${pokemonData.name}`}
                className="poke-img front"
              />
              <img
                src={pokemonData.sprites.back_default}
                alt={`imagen de ${pokemonData.name}`}
                className="poke-img back"
              />
            </section>
            <section>
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
            </section>
          </>
        )}
        <Link to="/">Go Back</Link>
      </div>
    </main>
  );
};
