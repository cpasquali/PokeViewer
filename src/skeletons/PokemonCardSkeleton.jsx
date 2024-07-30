import React from "react";
import "./skeletonStyle.css"; // Asegúrate de que los estilos estén importados correctamente

const PokemonCardSkeleton = () => {
  return (
    <div className="pokemon-card skeleton">
      <div className="skeleton-img"></div>
      <div className="skeleton-text skeleton-text-title"></div>
      <div className="skeleton-btn"></div>
    </div>
  );
};

export default PokemonCardSkeleton;
