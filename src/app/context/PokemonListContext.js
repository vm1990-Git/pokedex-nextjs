'use client'

import { createContext, useEffect, useState } from "react";
import useApi from "../hooks/useApi";

export const PokemonListContext = createContext();

export const PokemonListContextProvider = (props) => {

    const [limit, setLimit] = useState(12);
    const [offset, setOffset] = useState(0);
    const [pokemonList, setPokemonList] = useState([])
    const [favoritePokemon, setFavoritePokemon] = useState([]);
    const pokemonQuantity = 1010

    const { getPokemonList, getPokemonDetail } = useApi()

    const getFavorites = () => {
        if (localStorage.getItem('favorites')) {

            const updateFavorites = localStorage.getItem('favorites');
            setFavoritePokemon(JSON.parse(updateFavorites));
        }
    }

    const toggleFromFavorite = (name) => {
        let updateFavorites = [...favoritePokemon];
        const isFavorite = updateFavorites.includes(name);
        if (isFavorite) {
            updateFavorites = updateFavorites.filter(pokemon => pokemon !== name);
        } else {
            updateFavorites.push(name);
        }
        localStorage.setItem('favorites', JSON.stringify(updateFavorites))
        setFavoritePokemon(updateFavorites);
    }


    const updatePokemonList = async () => {
        const newPokemonList = await getPokemonList(limit, offset)
        setPokemonList(newPokemonList)
    }

    const updatePokemonDetail = async (name) => {
        try {
            const detail = await getPokemonDetail(name);
            const isFavorite = checkFavorites(name);

            const updatedDetail = {
                ...detail,
                favorite: isFavorite,
            };

            return (updatedDetail);
        } catch (error) {
            console.error('Error updatePokemonDetail:', error);
        }
    };

    const checkFavorites = (pokemonName) => {
        if (favoritePokemon.includes(pokemonName)) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        getFavorites()
    }, [])

    useEffect(() => {
        updatePokemonList()
    }, [offset, limit])

    const contextValues = {
        pokemonList,
        setPokemonList,
        updatePokemonDetail,
        limit,
        setLimit,
        offset,
        setOffset,
        pokemonQuantity,
        favoritePokemon,
        toggleFromFavorite
    }

    return (
        <PokemonListContext.Provider value={contextValues}>
            {props.children}
        </PokemonListContext.Provider>
    )
}