import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Switch, Route } from "wouter";
import { Navbar } from "./components/Navbar/Navbar";
import { PokemonDetails } from "./components/Pokemons/PokemonDetails";
import { PokemonList } from "./components/Pokemons/PokemonList";
import { ThemeProvider } from "./context/ThemeContext";

function App() {

  const [type, setType] = useState(null);
  const [searchPokemon, setSearchPokemon] = useState(null);

  return (
  <ThemeProvider>
      <Navbar
        setType={setType}
        setSearchPokemon={setSearchPokemon}
      />
      <Switch>
        <Route
          path="/"
          component={() => (
            <PokemonList
              type={type}
              searchPokemon={searchPokemon}
            />
          )}
        />
        <Route path="/pokemon/:id" component={PokemonDetails} />
      </Switch>
  </ThemeProvider>
  );
}

export default App;
