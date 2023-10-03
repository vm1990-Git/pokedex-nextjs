'use client'

import React, { useContext } from 'react';
import './styles.css'
import { OffsetContext } from '@/app/context/OffsetContext';
import { PokemonListContext } from '@/app/context/PokemonListContext';
import { FilterContext } from '@/app/context/FilterContext';

const OffsetMenu = () => {
  const {
    offsetToFirst,
    offsetToLast,
    increaseOffset,
    decreaseOffset,
    changeLimit,
    currentPage,
    totalPages,
  } = useContext(OffsetContext);

  const {

    togglePokemonFilter
  } = useContext(FilterContext);


  const {
    limit,
  } = useContext(PokemonListContext)


  return (
    <div className="offset-menu">
      <div className='offset-sub-container'>
        <button className='show-filter-button' onClick={togglePokemonFilter}>Filter</button>
      </div>
      {limit != 1010 &&
        <div className='offset-sub-container'>
          <button className='offset-menu__button--arrow' onClick={decreaseOffset}>←</button>
          <button className='offset-menu__button' onClick={offsetToFirst}>...</button>
          <span className='offset-menu__pages'>{currentPage}/{totalPages}</span>
          <button className='offset-menu__button' onClick={offsetToLast}>...</button>
          <button className='offset-menu__button--arrow' onClick={increaseOffset}>→</button>
        </div>
      }

      <div className='offset-sub-container'>
        <span className='offset-menu__quantity'>Quantity</span>
        <select className='offset-menu__select' onChange={(e) => changeLimit(e.target.value)}>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="151">151</option>
          <option value="1010">All</option>
        </select>

      </div>

    </div>
  )

}


export default OffsetMenu;
