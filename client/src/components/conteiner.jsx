import React from "react";
import { useSelector } from "react-redux";
import style from "../style/conteiner.module.css";
import Card from "./card";

export default function Container() {
  let games = useSelector((state) => state.games);

  return (
    <div className={style.conteiner}>
      {games?.map((game) => (
        <Card
          key={game.id}
          name={game.name}
          image={game.image}
          genres={game.genres}
        />
      ))}
    </div>
  );
}
