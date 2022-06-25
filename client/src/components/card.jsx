import React from "react";
import style from "../style/card.module.css";
import Genre from "./genres";

export default function Card({ name, image, genres }) {
  return (
    <div className={style.card}>
      <div className={style.card_image_conteiner}>
        <img className={style.card_image} src={image} alt="game" />
      </div>
      <div className={style.card_title}>
        <label>
          <b>{name}</b>
        </label>
      </div>
      <div className={style.card_genre_conteiner}>
        {genres?.map((genre) => (
          <Genre key={genre.id} name={genre.name} image={genre.image} />
        ))}
      </div>
    </div>
  );
}
