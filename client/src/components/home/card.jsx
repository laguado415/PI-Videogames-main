import React from "react";
import style from "../../style/home/card.module.css";
import CardGenre from "./cardGenres";

export default function Card({ name, image, genres }) {
  return (
    <div className={style.card}>
      <div className={style.card_image_conteiner}>
        <img className={style.card_image} src={image} alt={"IMAGE_CARD"} />
      </div>
      <div className={style.card_title}>
        <label>
          <b>{name}</b>
        </label>
      </div>
      <div className={style.card_genre_conteiner}>
        {genres?.map((genre) => (
          <CardGenre key={genre.id} name={genre.name} image={genre.image} />
        ))}
      </div>
    </div>
  );
}
