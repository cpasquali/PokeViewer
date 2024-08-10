import "./App.css";
import { Switch, Route } from "wouter";
import { Navbar } from "./components/Navbar/Navbar";
import { PokemonDetails } from "./components/Pokemons/PokemonDetails";
import { PokemonList } from "./components/Pokemons/PokemonList";
import { ThemeProvider } from "./context/ThemeContext";
import { TypePokemonProvider } from "./context/TypePokemonContext";
import { useState } from "react";

function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <TypePokemonProvider>{children}</TypePokemonProvider>
    </ThemeProvider>
  );
}

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
