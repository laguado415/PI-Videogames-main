import React from "react";
import style from "../../style/home/genre.module.css";
import * as Image from "../../image/index";

export default function CardGenre({ image, name }) {
  let nameCorrection = name.split(" ").join("_");
  return (
    <div className={style.genre_conteiner}>
      <div className={style.genre_image_conteiner}>
        <img
          className={style.genre_image}
          src={image ? image : Image[nameCorrection]}
          alt="genre"
        />
      </div>
      <div className={style.genre_title}>
        <span>
          <b>{name}</b>
        </span>
      </div>
    </div>
  );
}
