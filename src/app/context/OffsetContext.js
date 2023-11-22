'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { PokemonListContext } from "./PokemonListContext";

export const OffsetContext = createContext();

export const OffsetContextProvider = (props) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(85)

    const {
        limit,
        setLimit,
        offset,
        setOffset,
        pokemonQuantity,
    } = useContext(PokemonListContext)

    const offsetToFirst = () => {
        const updateOffset = 0;
        setOffset(updateOffset);
    };

    const offsetToLast = () => {
        const updateOffset = pokemonQuantity - parseInt(limit);
        setOffset(updateOffset);
    };

    const increaseOffset = () => {
        const updateOffset = parseInt(offset) + parseInt(limit);
        if (updateOffset > pokemonQuantity + limit) {
            offsetToFirst();
        } else setOffset(updateOffset);
    };

    const decreaseOffset = () => {
        const updateOffset = offset - limit;
        if (updateOffset < 0) {
            offsetToLast();
        } else setOffset(updateOffset);
    };

    const changeLimit = (newLimit) => {
        const updateLimit = newLimit;
        setLimit(updateLimit);
    };

    useEffect(() => {
        setTotalPages(Math.ceil(parseInt(pokemonQuantity) / parseInt(limit)))
        setCurrentPage(1)
        setOffset(0);
    }, [limit])

    useEffect(() => {
        setCurrentPage(Math.ceil(offset / limit) + 1)

        if (offset >= pokemonQuantity) {
            setOffset(0)
        }
    }, [offset])

    const contextValues = {
        currentPage,
        totalPages,
        offsetToFirst,
        offsetToLast,
        increaseOffset,
        decreaseOffset,
        changeLimit,
    }

    return (
        <OffsetContext.Provider value={contextValues}>
            {props.children}
        </OffsetContext.Provider>
    )
}