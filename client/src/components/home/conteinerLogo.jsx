import React from "react";
import style from "../../style/home/conteinerLogo.module.css";
import * as Image from "../../image/index";

export default function CardGenre({ image, name }) {
  let nameCorrection = name.split(" ").join("_");
  return (
    <div className={style.conteinerLogo_conteiner}>
      <div className={style.conteinerLogo_image_conteiner}>
        <img
          className={style.conteinerLogo_image}
          src={image ? image : Image[nameCorrection]}
          alt="genre"
        />
      </div>
      <div className={style.conteinerLogo_title}>
        <span>
          <b>{name}</b>
        </span>
      </div>
    </div>
  );
}
