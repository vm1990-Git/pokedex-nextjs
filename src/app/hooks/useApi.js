import fetchTypes from "../api/fetchTypes";
import fetchPokemon from "../api/fetchPokemon";
import fetchDetail from "../api/fetchDetail";
import fetchByType from "../api/fetchByType";

const useApi = () => {

    const getTypes = async () => {
        console.log('=> getTypes()')
        try {
            const typesData = await fetchTypes();
            const types = typesData.map(type => ({ ...type, checked: false }));
            return types;
        } catch (error) {
            console.error('Error fetching or updating types:', error);
        }
    }

    const getPokemonList = async (limit = 20, offset = 0) => {
        console.log(`=> getPokemonList  ( limit=${limit} offset=${offset} )`);
        const pokemonList = await fetchPokemon(limit, offset);
        return pokemonList;
    };

    const getPokemonDetail = async (pokemonName) => {
        // console.log(`=> getPokemonDetail    ( pokemonName=${pokemonName} )`);
        const detail = await fetchDetail(pokemonName);
        return detail;
    };

    const getPokemonByType = async (type) => {
        console.log(`=> getPokemonByType    (type${type}) `);
        const pokemonList = await fetchByType(type);
        return pokemonList;
    }

    return (
        {
            getTypes,
            getPokemonList,
            getPokemonDetail,
            getPokemonByType
        }
    )
}

export default useApi