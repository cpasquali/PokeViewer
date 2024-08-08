import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Switch, Route } from "wouter";
import { Navbar } from "./components/Navbar/Navbar";
import { PokemonDetails } from "./components/Pokemons/PokemonDetails";
import { PokemonList } from "./components/Pokemons/PokemonList";
import { ThemeProvider } from "./context/ThemeContext";
import { TypePokemonProvider } from "./context/TypePokemonContext";
import { SearchPokemonProvider } from "./context/SearchPokemonContext";

function App() {
  return (
  <ThemeProvider>
    <TypePokemonProvider>
      <SearchPokemonProvider>
        <Navbar/>
          <Switch>
            <Route path="/" component={PokemonList}/>
            <Route path="/pokemon/:id" component={PokemonDetails} />
        </Switch>
      </SearchPokemonProvider>
    </TypePokemonProvider>
  </ThemeProvider>
  );
}

export default App;
