'use client'

import { createContext, useContext, useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { PokemonListContext } from "./PokemonListContext";

export const FilterContext = createContext();

export const FilterContextProvider = (props) => {

    const [types, setTypes] = useState([])
    const [searchText, setSearchText] = useState('');
    const [filtering, setFiltering] = useState(false)
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [isPokemonFilterVisible, setIsPokemonFilterVisible] = useState(false);

    const { setPokemonList, setOffset, favoritePokemon, limit } = useContext(PokemonListContext)

    const { getTypes, getPokemonList, getPokemonByType } = useApi()

    const togglePokemonFilter = () => {
        console.log(isPokemonFilterVisible)
        setIsPokemonFilterVisible(!isPokemonFilterVisible);
    }

    const toggleTypesOff = () => {
        const updateTypes = types.map(t => ({ ...t, checked: false }));
        setTypes(updateTypes);
    };

    const getCheckedTypes = () => {
        let checkedTypes = []
        for (const t of types) {
            if (t.checked === true) {
                checkedTypes = [...checkedTypes, t]
            }
        }
        return checkedTypes
    };

    const filterByTypes = async (checkedTypes) => {
        // Pokemon with 3 types doesnt exists
        if (checkedTypes.length >= 3) {
            return [];
        }

        const commonPokemonSet = new Set();
        const uniquePokemonMap = new Map();

        for (const type of checkedTypes) {
            const pokemonOfType = await getPokemonByType(type.name);

            for (const pokemon of pokemonOfType) {
                if (uniquePokemonMap.has(pokemon.name)) {
                    commonPokemonSet.add(pokemon.name);
                } else {
                    uniquePokemonMap.set(pokemon.name, { ...pokemon, types: [type.name] });
                }
            }
        }
        if (checkedTypes.length === 1) {
            return Array.from(uniquePokemonMap.values());
        }
        const commonPokemonList = Array.from(commonPokemonSet).map((pokemonName) =>
            uniquePokemonMap.get(pokemonName)
        );

        return commonPokemonList;
    };

    const filterByName = (list) => {
        return list.filter((p) => p.name.includes(searchText.toLowerCase()));
    };

    const filterByFavorite = (list) => {
        const updateList = list.filter((p) => favoritePokemon.includes(p.name));
        return updateList
    };

    const updateTypes = async () => {
        const newTypes = await getTypes()
        setTypes(newTypes)
    }

    const filterPokemon = async () => {
        console.log(`=> filterPokemon(${searchText})`);
        const checkedTypes = getCheckedTypes();


        if (checkedTypes.length === 0 && searchText.length === 0 && !showOnlyFavorites) {
            setFilteredPokemon(await getPokemonList(12, 0))
            return;
        } else setFiltering(true)

        let updatedFilteredPokemon = await getPokemonList(1010, 0);

        if (checkedTypes.length > 0) {
            updatedFilteredPokemon = await filterByTypes(checkedTypes);
        }

        if (searchText.length > 0) {
            updatedFilteredPokemon = filterByName(updatedFilteredPokemon);
        }

        if (showOnlyFavorites) {
            updatedFilteredPokemon = filterByFavorite(updatedFilteredPokemon);
        }

        setFilteredPokemon(updatedFilteredPokemon);
    };

    const handleShowFavoritesChange = () => {
        setShowOnlyFavorites(!showOnlyFavorites)
    }

    const handleTypeChange = (updatedType) => {
        console.log(`=> handleTypeChange(${updatedType})`);
        const updatedTypes = types.map((type) => {
            if (type.name === updatedType.name) {
                return { ...type, checked: !type.checked };
            } else {
                return type;
            }
        });
        setTypes(updatedTypes);
    };

    const handleSubmitFilter = (e) => {
        console.log('=> handleSubmitFilter()');
        e.preventDefault();
        filterPokemon()
    };

    const handleClearFilter = async (e) => {
        console.log(`=> handleClearFilter()`);
        e.preventDefault()
        setSearchText('')
        toggleTypesOff()
        const updateFilteredList = await getPokemonList(limit, 0);
        setFilteredPokemon(updateFilteredList)
        setOffset(0)
        setFiltering(false)
        setShowOnlyFavorites(false)
    };

    const filterLog = () => {
        console.log('=> filterLog()')
        const tableData = Array.isArray(types)
            ? types.map((type) => ({
                Name: type.name,
                Checked: type.checked,
            }))
            : [];

        console.log('--- FILTER SETTINGS --- ');
        console.log(`   filter name: ${searchText}`);
        console.log(`   favorites Only: ${showOnlyFavorites}`);
        console.log('   filter type: ');


        if (tableData.length > 0) {
            console.table(tableData);
        } else {
            console.log('   no types for display');
        }
    }

    useEffect(() => {
        // LOGS
        filterLog()
        console.log(filteredPokemon)
    }, [searchText, types]);

    useEffect(() => {
        setPokemonList(filteredPokemon)

    }, [filteredPokemon])


    useEffect(() => {
        updateTypes()
    }, [])

    const contextValues = {
        types,
        showOnlyFavorites,
        filtering,
        filteredPokemon,
        searchText,
        handleTypeChange,
        handleSubmitFilter,
        handleClearFilter,
        handleShowFavoritesChange,
        setSearchText,
        isPokemonFilterVisible,
        setIsPokemonFilterVisible,
        togglePokemonFilter
    }

    return (
        <FilterContext.Provider value={contextValues}>
            {props.children}
        </FilterContext.Provider>
    )
}