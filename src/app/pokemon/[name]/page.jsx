import PokemonDetail from '@/app/components/PokemonDetail/PokemonDetail'
import React from 'react'

const DetailPage = ({ params }) => {
    return (
        <PokemonDetail name={params.name} />
    )
}

export default DetailPage