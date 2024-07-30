import React from "react";
import PokemonCardSkeleton from "./PokemonCardSkeleton";

const PokemonListSkeleton = () => {
  return (
    <div className="pokemon-list">
      {[...Array(20)].map((_, index) => (
        <PokemonCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default PokemonListSkeleton;
