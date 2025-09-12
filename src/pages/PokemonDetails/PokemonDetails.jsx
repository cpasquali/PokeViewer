import { useContext, useEffect, useState } from "react";
import { useParams } from "wouter";

import { ThemeContext } from "../../context/ThemeContext";
import "./PokemonDetails.css";
import { getPokemonByName } from "../../services/fetchServices";

export const PokemonDetails = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const { theme } = useContext(ThemeContext);
  const { name } = useParams();

  const fetchPokemon = async () => {
    const pokemon = await getPokemonByName(name);
    setPokemonData(pokemon);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <main className={`main-pokemon-details ${theme}`}>
      <article className="pokemon-details">
        {pokemonData && (
          <>
            <section className="pokemon-details-top">
              <h2>{name}</h2>
              <img
                src={pokemonData.sprites.front_default}
                alt={`imagen de ${pokemonData.name}`}
              />
            </section>

            <section className="pokemon-details-bottom">
              <h4>Puntos base</h4>
              <section className="habilities-pokemon-container">
                {pokemonData.stats.map((hability, index) => (
                  <section
                    key={hability + index}
                    className="habilities-pokemon"
                  >
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ height: hability.base_stat }}
                      ></div>
                    </div>
                    <p>{hability.stat.name}</p>
                  </section>
                ))}
              </section>
            </section>

            <section className="pokemon-types">
              {pokemonData?.types.map((typeInfo) => (
                <div
                  key={typeInfo.type.name}
                  className={`icon ${typeInfo.type.name}`}
                >
                  <img src={`/icons/${typeInfo.type.name}.svg`} />
                </div>
              ))}
            </section>
          </>
        )}
      </article>
    </main>
  );
};

/* {style={{ height }}
  favoritesPokemon.includes(pokemonData.name) ? (
    <button
      onClick={() => removePokemonFromFavorites(pokemonData.name)}
      className={`btn-favorite ${theme}`}
    >
      Eliminar de Favoritos
    </button>
  ) : (
    <button
      onClick={() => addFavoritePokemon(pokemonData.name)}
      className={`btn-favorite ${theme}`}
    >
      Añadir a Favoritos
    </button>
  );
}
 */

/*     */
