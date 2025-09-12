import { useEffect, useState } from "react";
import { getPokemonByName } from "../../services/fetchServices";
import { Link } from "wouter";
import "./PokemonCard.css";

export const PokemonCard = ({ name }) => {
  const [pokemon, setPokemon] = useState({});

  const fetchPokemon = async () => {
    const pokemonData = await getPokemonByName(name);
    setPokemon(pokemonData);
  };

  useEffect(() => {
    fetchPokemon();
  }, [name]);

  const pokemonType =
    pokemon && pokemon.types ? pokemon.types[0].type.name : "";

  return (
    <article className={`pokemon-card ${pokemonType}`}>
      {pokemon.sprites && (
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      )}
      <h2>{pokemon.name}</h2>
      <section className="btnCardContainer">
        <button className={`btn-hability favorite ${pokemonType}`}>
          <ion-icon name="heart-outline"></ion-icon>
        </button>

        <Link to={`/pokemon/${name}`} className={`btn-link ${pokemonType}`}>
          See
        </Link>
      </section>
    </article>
  );
};
