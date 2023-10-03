const fetchByType = async (type) => {
    console.log('fetchByType');
    console.log(type);
  
    const controller = new AbortController();
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`, {
        signal: controller.signal,
      });
      const data = await response.json();
      const { pokemon } = await data;
  
      //ignoring unwanted data
      let pokemonList = [];
      for (const p of pokemon) {
        pokemonList.push(p.pokemon);
      }
      // console.log(pokemonList);
      return pokemonList;
    } catch (error) {
      console.error(error);
      return {};
    } finally {
      () => controller.abort();
    }
  };
  
  export default fetchByType;
  