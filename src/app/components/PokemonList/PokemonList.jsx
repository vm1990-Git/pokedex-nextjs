'use client'

import React, { useContext } from 'react';
import './styles.css'
import { PokemonListContext } from '@/app/context/PokemonListContext';
import PokemonCard from '../PokemonCard/PokemonCard';

const PokemonList = () => {
  const { pokemonList } = useContext(PokemonListContext);

  if (pokemonList && pokemonList.length > 0) {
    const updateList = pokemonList.map((p, i) => {
      return <PokemonCard pokemonName={p.name} key={i} count={i} />;
    });
    return <div className="pokemon-list">{updateList}</div>;
  } else {
    return <div className="pokemon-list pokemon-list--empty">NO POKEMON</div>;
  }
};

export default PokemonList;