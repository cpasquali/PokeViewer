import React from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { TypePokemonProvider } from "../context/TypePokemonContext";

export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <TypePokemonProvider>
        {children}
      </TypePokemonProvider>
    </ThemeProvider>
  );
};
