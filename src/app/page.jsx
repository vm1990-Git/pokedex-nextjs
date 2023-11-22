'use client'

import React, { useContext } from 'react';
import Filter from './components/Filter/Filter';
import PokemonList from './components/PokemonList/PokemonList';
import OffsetMenu from './components/OffsetMenu/OffsetMenu';
import { FilterContext } from './context/FilterContext';
import './global.css'

const HomePage = () => {

  const { filtering, filteredPokemon } = useContext(FilterContext)

  return (
    <div>
      {!filtering ? <OffsetMenu /> : (<div>Pokemon Found: {filteredPokemon.length} </div>)}
      <div className='pokemon-container'>
        <Filter />
        <PokemonList />
      </div>
    </div>
  );
};

export default HomePage;
