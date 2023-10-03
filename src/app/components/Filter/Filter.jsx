'use client'

import React, { useContext } from 'react'
import { FilterContext } from '../../context/FilterContext'
import './styles.css'

const Filter = () => {

    const {
        types,
        searchText,
        setSearchText,
        handleTypeChange,
        handleSubmitFilter,
        handleClearFilter,
        handleShowFavoritesChange,
        showOnlyFavorites,
        isPokemonFilterVisible } = useContext(FilterContext)

    return (
        <form className={isPokemonFilterVisible ? 'pokemon-filter' : 'pokemon-filter pokemon-filter--hidden'} onSubmit={handleSubmitFilter} >
            <input
                className='filter__name'
                type="text"
                placeholder="Search Name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <br />

            <label className='filter__type'>
                <input
                    className='filter__checkbox'
                    type="checkbox"
                    name={`favorites`}
                    checked={showOnlyFavorites}
                    onChange={handleShowFavoritesChange}
                />
                Only Favorites
            </label>

            <br />
            --- Types ---
            {types && types.map((type, index) => (
                <label className='filter__type' key={index}>
                    <input
                        className='filter__checkbox'
                        type="checkbox"
                        name={`type${index}`}
                        checked={type.checked}
                        onChange={() => handleTypeChange(type)}
                    />
                    {type.name.toUpperCase()}
                </label>
            ))}

            <br />

            <div className='filter__button-container'>
                <button className='filter__button' type="submit">Submit</button>
                <button className='filter__button' onClick={handleClearFilter}>Clear</button>
            </div>
        </form>
    )
}

export default Filter