import React from "react";
import style from "../style/card.module.css";

export default function Card({ name }) {
  return (
    <div className={style.card}>
      <span>{name}</span>
    </div>
  );
}
