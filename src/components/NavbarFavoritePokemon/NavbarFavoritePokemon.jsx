import React, { useContext, useEffect, useState } from "react";
import { PokemonCard } from "../Pokemons/PokemonCard";
import "./NavbarFavoritePokemon.css";
import Swal from "sweetalert2";
import { ThemeContext } from "../../context/ThemeContext";
import { SelectLenguajeContext } from "../../context/SelectLenguajeContext";

export const NavbarFavoritePokemon = ({
  favoritePokemon,
  setFavoritesPokemon,
  removeFavoritePokemon,
}) => {
  const [countFavorite, setCountFavorite] = useState(0);
  const { theme } = useContext(ThemeContext);
  const { lenguaje } = useContext(SelectLenguajeContext);

  const deleteAllFavotiresPokemon = () => {
    setFavoritesPokemon((prevFavorites) => (prevFavorites = []));
    if (lenguaje === "english") {
      Swal.fire({
        title: "¡Removed!",
        text: `All favorites pokemons are removed`,
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "¡Eliminado!",
        text: `Todos los Pokémon favoritos han sido eliminados`,
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    setCountFavorite(favoritePokemon.length);
  }, [favoritePokemon]);

  if (lenguaje === "english") {
    return (
      <nav className="navbarFavo floating-navbar">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className={`toggleBtn ${theme}`}>
              <ion-icon name="bookmark-outline"></ion-icon>
              <p className="countFavorite">{countFavorite}</p>
            </span>
          </button>
          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Favorites Pokemon
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            {favoritePokemon.length !== 0 && (
              <button
                className="btn btnDelete"
                onClick={deleteAllFavotiresPokemon}
              >
                Delete All
              </button>
            )}

            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-center align-items-center flex-grow-1 pe-3">
                {favoritePokemon.length !== 0 ? (
                  favoritePokemon.map((pokemon) => (
                    <PokemonCard
                      key={pokemon}
                      name={pokemon}
                      deleteFavoritePokemon={removeFavoritePokemon}
                    />
                  ))
                ) : (
                  <h2>NO POKEMONS HAVE BEEN ADDED YET D:</h2>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbarFavo floating-navbar">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className={`toggleBtn ${theme}`}>
              <ion-icon name="bookmark-outline"></ion-icon>
              <p className="countFavorite">{countFavorite}</p>
            </span>
          </button>
          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Pokémon Favoritos
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Cerrar"
              ></button>
            </div>
            {favoritePokemon.length !== 0 && (
              <button
                className="btn btnDelete"
                onClick={deleteAllFavotiresPokemon}
              >
                Eliminar Todos
              </button>
            )}

            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-center align-items-center flex-grow-1 pe-3">
                {favoritePokemon.length !== 0 ? (
                  favoritePokemon.map((pokemon) => (
                    <PokemonCard
                      key={pokemon}
                      name={pokemon}
                      deleteFavoritePokemon={removeFavoritePokemon}
                    />
                  ))
                ) : (
                  <h2>NO SE HAN AGREGADO POKEMONES TODAVÍA D:</h2>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};
