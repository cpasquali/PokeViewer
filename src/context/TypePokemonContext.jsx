import { createContext, useState } from "react";

export const TypePokemonContext = createContext()

export const TypePokemonProvider = ({children}) => {
    const [type, setType] = useState(null)

    return(
        <TypePokemonContext.Provider value={{type, setType}}>
            {children}
        </TypePokemonContext.Provider>
    )
}