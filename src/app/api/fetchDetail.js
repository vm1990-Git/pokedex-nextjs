const fetchPokemonDetails = async (pokemonName) => {
    const controller = new AbortController();
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
        {
          signal: controller.signal,
        }
      );
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error(error);
      return {};
    } finally {
      () => controller.abort();
    }
  };
  
  export default fetchPokemonDetails;
  