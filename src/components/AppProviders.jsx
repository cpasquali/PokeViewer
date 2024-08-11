import React from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { TypePokemonProvider } from "../context/TypePokemonContext";
import { SelectLenguajeProvider } from "../context/SelectLenguajeContext";

export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <TypePokemonProvider>
        <SelectLenguajeProvider>{children}</SelectLenguajeProvider>
      </TypePokemonProvider>
    </ThemeProvider>
  );
};
