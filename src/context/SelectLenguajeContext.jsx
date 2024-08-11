import { createContext, useState, useEffect } from "react";

export const SelectLenguajeContext = createContext();

export const SelectLenguajeProvider = ({ children }) => {
  const saveLenguaje = () => {
    const data = localStorage.getItem("lenguaje");
    return data ? JSON.parse(data) : "english";
  };

  const [lenguaje, setLenguaje] = useState(saveLenguaje);

  useEffect(() => {
    localStorage.setItem("lenguaje", JSON.stringify(lenguaje));
  }, [lenguaje]);

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
