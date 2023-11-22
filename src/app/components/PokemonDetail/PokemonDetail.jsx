'use client'
import React, { useContext, useEffect } from 'react';
import './styles.css'
import useGetDetail from '@/app/hooks/useGetDetail';
import { PokemonListContext } from '@/app/context/PokemonListContext';


const PokemonDetail = ({ name }) => {

    const { detail, fetchDetail } = useGetDetail()
    const { toggleFromFavorite } = useContext(PokemonListContext)

    useEffect(() => {
        fetchDetail(name);
    }, [name, toggleFromFavorite]);

    if (!detail) {
        return <div>Loading...</div>;
    }

    const { id, height, weight, base_experience, sprites, favorite, stats, moves, types } = detail;
    const imgUrl = sprites.other['official-artwork'].front_default

    return (
        <div className='page-container'>
            <div className='name-container'>
                <h2 className='pokemon-name'>{name.toUpperCase()}</h2>
                <span>{favorite ?
                    <button onClick={() => toggleFromFavorite(name)} className='fav-button'>Remove to favorite</button> :
                    <button onClick={() => toggleFromFavorite(name)} className='fav-button'>Add to favorite</button>}
                </span>
            </div>
            <div className='detailsPage-container'>
                {imgUrl ?
                    (<img className={favorite?'detailsPage__img detailsPage__img--fav':'detailsPage__img'} src={imgUrl} alt={imgUrl} />) :
                    <div>Loading image...</div>}

                <div className='info__container'>
                    <div>
                        <h3 className='info__title'>Basic Info</h3>
                        <ul className='info__details'>
                            <li>{`Name: ${name.toUpperCase()}`}</li>
                            <li>{`Height: ${height * 10} cm`}</li>
                            <li>{`Weight: ${weight / 10} kg`}</li>
                            <li>{`Exp: ${base_experience}`}</li>
                            <li>{`ID: ${id}`}</li>
                        </ul>
                        <h3 className='info__title'>Types</h3>
                        <ul className='info__details'>
                            {types.map((t, index) => <li key={t.type.name + index}>{`${t.type.name.toUpperCase()}`}</li>)}
                        </ul>
                        <h3 className='info__title'>Stats</h3>
                        <ul className='info__details'>
                            {stats.map((s, index) => <li key={s.stat.name + index}>{`${s.stat.name} ${s.base_stat}`}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
            <h3 className='info__title-moves'>Moves</h3>
            <ul className='info__moves'>
                {moves.map((m, index) => <li key={'moves' + index}>{`${m.move.name}`}</li>)}
            </ul>
        </div >
    );
};

export default PokemonDetail;
