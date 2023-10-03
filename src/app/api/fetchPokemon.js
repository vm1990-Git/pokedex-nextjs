const fetchPokemon = async (limit = 20, offset = 0) => {
    const controller = new AbortController();
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`,
        {
          signal: controller.signal,
        }
      );
  
      const data = await response.json();
      const { results } = data;
  
      return results;
    } catch (error) {
      console.error(error);
      return [];
    } finally {
      () => controller.abort();
    }
  };
  
  export default fetchPokemon;