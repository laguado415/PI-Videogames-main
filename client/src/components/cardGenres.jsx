import React from "react";
import style from "../style/genre.module.css";

export default function CardGenre({ image, name }) {
  return (
    <div className={style.genre_conteiner}>
      <div className={style.genre_image_conteiner}>
        <img className={style.genre_image} src={image} alt="genre" />
      </div>
      <div className={style.genre_title}>
        <span>
          <b>{name}</b>
        </span>
      </div>
    </div>
  );
}
