import { createContext, useState } from "react";

export const SearchPokemonContext = createContext()

export const SearchPokemonProvider = ({children}) => {
    const [searchPokemon, setSearchPokemon] = useState(null);

    return(
        <SearchPokemonContext.Provider value={{searchPokemon, setSearchPokemon}}>
            {children}
        </SearchPokemonContext.Provider>
    )
}