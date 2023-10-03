const fetchTypes = async () => {
    console.log('=> fetchTypes()');
    const controller = new AbortController();
    try {
      const response = await fetch('https://pokeapi.co/api/v2/type', {
        signal: controller.signal,
      });
      const data = await response.json();
      const { results } = data;
      const updateResults = results.map((r) => ({ ...r, checked: false }));
      return updateResults;
    } catch (error) {
      console.error(error);
      return {};
    } finally {
      controller.abort();
    }
  };
  
  export default fetchTypes;
  