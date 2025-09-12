export const getAllPokemons = async (page) => {
  try {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon";
    const response = await fetch(apiUrl);
    const data = await response.json(
      `https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=20`
    );
    return data.results;
  } catch (e) {
    console.log(e.message);
  }
};

export const getPokemonByName = async (name) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
      throw new Error("Error en la carga de datos");
    }
    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e.message);
  }
};

/*   const API_URL = `https://pokeapi.co/api/v2/pokemon/?offset=${currentPage}&limit=20`;
  const API_URL_BY_TYPE = `https://pokeapi.co/api/v2/type/${type}`;
  const API_URL_BY_NAME = `https://pokeapi.co/api/v2/pokemon/${searchPokemon}/`; */
