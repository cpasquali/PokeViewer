import React, { useEffect, useState } from "react";
import { PokemonCard } from "./PokemonCard";
import "../../App.css";
import Swal from "sweetalert2";
import { STATUS, MAINCLASES } from "../../utils/utils";
import PokemonListSkeleton from "../../skeletons/PokemonListSkeleton";
import { NavbarFavoritePokemon } from "../NavbarFavoritePokemon/NavbarFavoritePokemon";

export const PokemonList = ({ type, searchPokemon }) => {
  const pokemonsSave = () => {
    const data = localStorage.getItem("localPokemons");
    return data ? JSON.parse(data) : [];
  };

  const [count, setCount] = useState(0);
  const [countPage, setCountPage] = useState(1);
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnePokemon, setIsOnePokemon] = useState(false);
  const [favoritesPokemons, setFavoritesPokemon] = useState(pokemonsSave);
  const API_URL = `https://pokeapi.co/api/v2/pokemon/?offset=${count}&limit=20`;
  const API_URL_BY_TYPE = `https://pokeapi.co/api/v2/type/${type}`;
  const API_URL_BY_NAME = `https://pokeapi.co/api/v2/pokemon/${searchPokemon}/`;
  let saveData;

  const nextPage = () => {
    setCount(count + 20);
    setCountPage(countPage + 1);
  };

  const backPage = () => {
    setCount(count - 20);
    setCountPage(countPage - 1);
  };

  const addFavoritePokemon = (pokemon) => {
    const repetido = favoritesPokemons.some((p) => p === pokemon);
    if (repetido) {
      Swal.fire({
        title: "¡Error!",
        text: `${pokemon.toUpperCase()} already added`,
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      setFavoritesPokemon((prevFavorite) => [...prevFavorite, pokemon]);
      Swal.fire({
        title: "¡Success!",
        text: `${pokemon.toUpperCase()} has been added to your favorites.`,
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  const removeFavoritePokemon = (pokemon) => {
    setFavoritesPokemon((prevFavorite) =>
      prevFavorite.filter((poke) => poke !== pokemon)
    );
    Swal.fire({
      title: "¡Removed!",
      text: `${pokemon.toUpperCase()} has been removed from your favorites.`,
      icon: "warning",
      confirmButtonText: "OK",
    });
  };

  const getDataPokemon = async () => {
    try {
      const response = await fetch(
        type ? API_URL_BY_TYPE : searchPokemon ? API_URL_BY_NAME : API_URL
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (type) {
        saveData = data.pokemon.map((p) => p.pokemon);
      } else if (searchPokemon) {
        saveData = data.name;
        setIsOnePokemon(true);
      } else {
        saveData = data.results;
      }
      setPokemonList(saveData);
    } catch (error) {
      console.error("Error fetching data...", error);
      setPokemonList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataPokemon();
  }, [count, type]);

  useEffect(() => {
    localStorage.setItem("localPokemons", JSON.stringify(favoritesPokemons));
  }, [favoritesPokemons]);

  const classOnePokemon = isOnePokemon ? MAINCLASES.TRUE : MAINCLASES.FALSE;
  const classBack =
    countPage === 1 || type || searchPokemon ? STATUS.DISABLED : STATUS.ACTIVE;
  const classNext =
    countPage === 20 || type || searchPokemon ? STATUS.DISABLED : STATUS.ACTIVE;
  const disabledBackButton =
    countPage === 1 || type || searchPokemon ? true : false;
  const disabledNextButton =
    countPage === 20 || type || searchPokemon ? true : false;

  if (isLoading) {
    return <PokemonListSkeleton />;
  }

  console.log(favoritesPokemons);

  return (
    <>
      <NavbarFavoritePokemon
        favoritePokemon={favoritesPokemons}
        removeFavoritePokemon={removeFavoritePokemon}
      />
      <main className={classOnePokemon}>
        {searchPokemon && pokemonList ? (
          <PokemonCard name={pokemonList} />
        ) : (
          <>
            {" "}
            {pokemonList.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                addFavoritePokemon={addFavoritePokemon}
              />
            ))}
          </>
        )}
      </main>
      <section className="paginacion">
        <button
          onClick={backPage}
          className={`btn ${classBack}`}
          disabled={disabledBackButton}
        >
          Back
        </button>
        <p>{countPage}</p>
        <button
          onClick={nextPage}
          className={`btn ${classNext}`}
          disabled={disabledNextButton}
        >
          Next
        </button>
      </section>
    </>
  );
};
