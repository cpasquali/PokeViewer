import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Switch, Route } from "wouter";
import { Navbar } from "./components/Navbar/Navbar";
import { PokemonDetails } from "./components/Pokemons/PokemonDetails";
import { PokemonList } from "./components/Pokemons/PokemonList";

function App() {
  const themeSave = () => {
    const data = localStorage.getItem("theme");
    return data ? JSON.parse(data) : "light";
  };

  const [type, setType] = useState(null);
  const [searchPokemon, setSearchPokemon] = useState(null);
  const [theme, setTheme] = useState(themeSave);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <>
      <Navbar
        setType={setType}
        setSearchPokemon={setSearchPokemon}
        setTheme={setTheme}
        theme={theme}
      />
      <Switch>
        <Route
          path="/"
          component={() => (
            <PokemonList
              type={type}
              searchPokemon={searchPokemon}
              theme={theme}
            />
          )}
        />
        <Route path="/pokemon/:id" component={PokemonDetails} />
      </Switch>
    </>
  );
}

export default App;
