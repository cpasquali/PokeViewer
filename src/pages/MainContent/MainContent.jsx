import { useContext, useEffect, useState } from "react";
import { PokemonCard } from "../../components/PokemonCard/PokemonCard";
import "./MainContent.css";
import PokemonListSkeleton from "../../skeletons/PokemonListSkeleton";
import { Paginacion } from "../../components/Paginacion/Paginacion";
import { ThemeContext } from "../../context/ThemeContext";
import { getAllPokemons } from "../../services/fetchServices";

export const MainContent = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const { theme } = useContext(ThemeContext);

  const fetchPokemonList = async () => {
    try {
      const pokemonList = await getAllPokemons(currentPage);
      setPokemonList(pokemonList);
      console.log(pokemonList);
    } catch (error) {
      console.error("Error fetching data...", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  if (isLoading) {
    return <PokemonListSkeleton />;
  }

  return (
    <main className={`main-post-list ${theme}`}>
      <section className="pokemon-list-container">
        {pokemonList &&
          pokemonList.map((p) => <PokemonCard key={p.name} name={p.name} />)}
      </section>
      <Paginacion currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </main>
  );
};
