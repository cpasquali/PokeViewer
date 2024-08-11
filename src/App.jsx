import "./App.css";
import { Switch, Route } from "wouter";
import { Navbar } from "./components/Navbar/Navbar";
import { PokemonDetails } from "./components/Pokemons/PokemonDetails";
import { PokemonList } from "./components/Pokemons/PokemonList";
import { useState } from "react";
import { AppProviders } from "./components/AppProviders";

function App() {
  const [searchPokemon, setSearchPokemon] = useState(null);

  return (
    <AppProviders>
      <Navbar setSearchPokemon={setSearchPokemon} />
      <Switch>
        <Route
          path="/"
          component={() => <PokemonList searchPokemon={searchPokemon} />}
        />
        <Route path="/pokemon/:id" component={PokemonDetails} />
      </Switch>
    </AppProviders>
  );
}

export default App;
