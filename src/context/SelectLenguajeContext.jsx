import { createContext, useState } from "react";

export const SelectLenguajeContext = createContext();

export const SelectLenguajeProvider = ({ children }) => {
  const [lenguaje, setLenguaje] = useState("english");

  const toggleLenguaje = () => {
    setLenguaje((prevLenguaje) =>
      prevLenguaje === "english" ? "spanish" : "english"
    );
  };

  return (
    <SelectLenguajeContext.Provider value={{ lenguaje, toggleLenguaje }}>
      {children}
    </SelectLenguajeContext.Provider>
  );
};
