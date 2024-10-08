import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { Link } from "wouter";
import { ThemeContext } from "../../context/ThemeContext";
import { TypePokemonContext } from "../../context/TypePokemonContext";

export const Navbar = ({ setSearchPokemon }) => {
  const API_URL = "https://pokeapi.co/api/v2/type/";
  const [types, setTypes] = useState([]);
  const [value, setValue] = useState("");
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { setType } = useContext(TypePokemonContext);

  const getType = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Error fetching types");
      }
      const data = await response.json();
      setTypes(data.results);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    setSearchPokemon(value.toLowerCase());
    setType(null);
    setValue("");
  };

  useEffect(() => {
    getType();
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg ${theme}`}>
      <div className="container-fluid">
        <Link className={`navbar-brand ${theme}`} to="/">
          PokeViewer
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className={`nav-link active ${theme}`}
                aria-current="page"
                onClick={() => setType(null)}
              >
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${theme}`}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={() => setSearchPokemon(null)}
              >
                Types
              </a>
              <ul className="dropdown-menu">
                {types.map(
                  (type) =>
                    type.name !== "stellar" &&
                    type.name !== "unknown" && (
                      <li
                        className="dropdown-item"
                        key={type.name}
                        onClick={() => setType(type.name)}
                      >
                        <a>{type.name}</a>
                      </li>
                    )
                )}
              </ul>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link toggle ${theme}`}
                role="button"
                aria-expanded="false"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <ion-icon name="sunny-outline"></ion-icon>
                ) : (
                  <ion-icon name="moon-outline"></ion-icon>
                )}
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="english"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            <button className="btn btn-outline-success" onClick={handleInput}>
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
