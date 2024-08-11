import React, { useContext, useEffect, useState } from "react";
import { PokemonCard } from "./PokemonCard";
import "../../App.css";
import Swal from "sweetalert2";
import { STATUS, MAINCLASES } from "../../utils/utils";
import PokemonListSkeleton from "../../skeletons/PokemonListSkeleton";
import { NavbarFavoritePokemon } from "../NavbarFavoritePokemon/NavbarFavoritePokemon";
import { Paginacion } from "../Paginacion/Paginacion";
import { Accordion } from "../Accordion/Accordion";
import { ThemeContext } from "../../context/ThemeContext";
import { TypePokemonContext } from "../../context/TypePokemonContext";
import { SelectLenguajeContext } from "../../context/SelectLenguajeContext";

export const PokemonList = ({ searchPokemon }) => {
  const pokemonsSave = () => {
    const data = localStorage.getItem("localPokemons");
    return data ? JSON.parse(data) : [];
  };

  const currentPageSave = () => {
    const dataPage = localStorage.getItem("page");
    return dataPage ? JSON.parse(dataPage) : 0;
  };

  const countPageSave = () => {
    const countPage = localStorage.getItem("countPage");
    return countPage ? JSON.parse(countPage) : 1;
  };

  const [countPage, setCountPage] = useState(countPageSave);
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnePokemon, setIsOnePokemon] = useState(false);
  const [paginacionOff, setPaginacionOff] = useState(false);
  const [error, setError] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [favoritesPokemons, setFavoritesPokemon] = useState(pokemonsSave);
  const [currentPage, setCurrentPage] = useState(currentPageSave);
  const { type } = useContext(TypePokemonContext);
  const { lenguaje } = useContext(SelectLenguajeContext);
  const API_URL = `https://pokeapi.co/api/v2/pokemon/?offset=${currentPage}&limit=20`;
  const API_URL_BY_TYPE = `https://pokeapi.co/api/v2/type/${type}`;
  const API_URL_BY_NAME = `https://pokeapi.co/api/v2/pokemon/${searchPokemon}/`;
  let saveData;

  const nextPage = () => {
    setCurrentPage((prevCurrentPage) => prevCurrentPage + 20);
    setCountPage((prevCountPage) => prevCountPage + 1);
  };

  const backPage = () => {
    setCurrentPage((prevCurrentPage) => prevCurrentPage - 20);
    setCountPage((prevCountPage) => prevCountPage - 1);
  };

  const addFavoritePokemon = (pokemon) => {
    const repetido = favoritesPokemons.some((p) => p === pokemon);
    if (repetido) {
      if (lenguaje === "english") {
        Swal.fire({
          title: "¡Error!",
          text: `${pokemon.toUpperCase()} already added`,
          icon: "warning",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "¡Error!",
          text: `${pokemon.toUpperCase()} ya está añadido`,
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
    } else {
      setFavoritesPokemon((prevFavorite) => [...prevFavorite, pokemon]);
      if (lenguaje === "english") {
        Swal.fire({
          title: "¡Success!",
          text: `${pokemon.toUpperCase()} has been added to your favorites.`,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "¡Éxito!",
          text: `${pokemon.toUpperCase()} ha sido añadido a tus favoritos.`,
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const removeFavoritePokemon = (pokemon) => {
    setFavoritesPokemon((prevFavorite) =>
      prevFavorite.filter((poke) => poke !== pokemon)
    );
    if (lenguaje === "english") {
      Swal.fire({
        title: "¡Removed!",
        text: `${pokemon.toUpperCase()} has been removed from your favorites.`,
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "¡Eliminado!",
        text: `${pokemon.toUpperCase()} ha sido eliminado de tus favoritos.`,
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
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
        setPaginacionOff(true);
      } else {
        saveData = data.results;
      }
      setPokemonList(saveData);
    } catch (error) {
      setError(true);
      setPaginacionOff(true);
      console.error("Error fetching data...", error);
      setPokemonList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataPokemon();
  }, [currentPage, type]);

  useEffect(() => {
    localStorage.setItem("page", currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem("localPokemons", JSON.stringify(favoritesPokemons));
    localStorage.setItem("countPage", JSON.stringify(countPage));
  }, [favoritesPokemons, countPage]);

  useEffect(() => {
    if (isOnePokemon) {
      document.body.classList.add("hide-scrollbar");
    } else {
      document.body.classList.remove("hide-scrollbar");
    }

    return () => {
      document.body.classList.remove("hide-scrollbar");
    };
  }, [isOnePokemon]);

  const classOnePokemon =
    isOnePokemon || error ? MAINCLASES.TRUE : MAINCLASES.FALSE;
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

  return (
    <>
      <NavbarFavoritePokemon
        favoritePokemon={favoritesPokemons}
        removeFavoritePokemon={removeFavoritePokemon}
      />
      <main className={`${classOnePokemon} ${theme}`}>
        {searchPokemon && pokemonList ? (
          favoritesPokemons.includes(pokemonList) ? (
            <PokemonCard
              name={pokemonList}
              deleteFavoritePokemon={removeFavoritePokemon}
            />
          ) : (
            <PokemonCard
              name={pokemonList}
              addFavoritePokemon={addFavoritePokemon}
            />
          )
        ) : (
          <>
            {pokemonList.map((pokemon) =>
              favoritesPokemons.includes(pokemon.name) ? (
                <PokemonCard
                  key={pokemon.name}
                  name={pokemon.name}
                  deleteFavoritePokemon={removeFavoritePokemon}
                />
              ) : (
                <PokemonCard
                  key={pokemon.name}
                  name={pokemon.name}
                  addFavoritePokemon={addFavoritePokemon}
                />
              )
            )}
          </>
        )}
      </main>
      <Paginacion
        paginacionOff={paginacionOff}
        backPage={backPage}
        nextPage={nextPage}
        classNext={classNext}
        classBack={classBack}
        disabledBackButton={disabledBackButton}
        disabledNextButton={disabledNextButton}
        countPage={countPage}
      />
      <Accordion />
    </>
  );
};
