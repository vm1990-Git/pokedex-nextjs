import React, { useContext, useEffect } from "react";
import Link from 'next/link'
import './styles.css'
import { PokemonListContext } from "@/app/context/PokemonListContext";
import useGetDetail from "@/app/hooks/useGetDetail";

const PokemonCard = ({ pokemonName }) => {

  const { pokemonQuantity } = useContext(PokemonListContext);
  const { detail, fetchDetail } = useGetDetail()

  useEffect(() => {
    fetchDetail(pokemonName);
  }, [pokemonName]);

  if (!detail) {
    return <li>Loading...</li>;
  }

  const { name, id, favorite } = detail;
  const altUrl = "https://thenounproject.com/api/private/icons/140281/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0";
  const imgUrl = detail && detail.sprites && detail.sprites.other && detail.sprites.other["official-artwork"].front_default ? detail.sprites.other["official-artwork"].front_default : altUrl;

  if (id < pokemonQuantity + 1) {
    return (
      <Link href={`/pokemon/${name}`} className="custom-link">
        <div className={favorite ? 'pokemon-card pokemon-card--fav' : 'pokemon-card'}>
          <img className="pokemon__img" src={imgUrl} alt={`image of ${name}`} />{" "}
          <span className="pokemon__name">{name.toUpperCase()}</span>
          <span className="pokemon__id">{`- ${id} -`}</span>
        </div>
      </Link>
    );
  }

  return null;
};

export default PokemonCard;
