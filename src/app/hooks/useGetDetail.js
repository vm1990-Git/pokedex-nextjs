import React, { useContext, useState } from 'react'
import { PokemonListContext } from '../context/PokemonListContext';

const useGetDetail = () => {
    const { updatePokemonDetail } = useContext(PokemonListContext);
    const [detail, setDetail] = useState(null);

    const fetchDetail = async (name) => {
        try {
            const updateDetail = await updatePokemonDetail(name);
            setDetail(updateDetail);
        } catch (error) {
            console.error(error);
        }
    };

    return {
        detail,
        fetchDetail
    }

}

export default useGetDetail