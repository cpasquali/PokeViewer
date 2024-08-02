import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Switch, Route } from "wouter";
import { Navbar } from "./components/Navbar/Navbar";
import { PokemonDetails } from "./components/Pokemons/PokemonDetails";
import { PokemonList } from "./components/Pokemons/PokemonList";

function App() {
  const [type, setType] = useState(null);
  const [searchPokemon, setSearchPokemon] = useState(null);
  const [theme, setTheme] = useState("light")
  return (
    <>
      <Navbar setType={setType} setSearchPokemon={setSearchPokemon} setTheme={setTheme} theme={theme}/>
      <Switch>
        <Route
          path="/"
          component={() => (
            <PokemonList type={type} searchPokemon={searchPokemon} theme={theme}/>
          )}
        />
        <Route path="/pokemon/:id" component={PokemonDetails} />
      </Switch>
    </>
  );
}

export default App;
