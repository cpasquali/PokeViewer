import React, { useEffect, useState } from "react";
import { PokemonCard } from "../Pokemons/PokemonCard";
import "./NavbarFavoritePokemon.css";

export const NavbarFavoritePokemon = ({
  favoritePokemon,
  removeFavoritePokemon,
  theme,
}) => {
  const [countFavorite, setCountFavorite] = useState(0);

  useEffect(() => {
    setCountFavorite(favoritePokemon.length);
  }, [favoritePokemon]);

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
          <div className="offcanvas-body ">
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
                <h2>NO SE HAN AGREGADO POKEMONES TODAVIA D:</h2>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
