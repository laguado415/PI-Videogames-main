import React from "react";
import { useSelector } from "react-redux";
import style from "../style/conteiner.module.css";
import Card from "./card";

export default function Container() {
  let { games, errorMessage } = useSelector((state) => state);
  console.log(games[0]?.name);

  return (
    <div className={style.conteiner}>
      {!errorMessage.value ? (
        games?.map((game) => (
          <Card
            key={game.id}
            name={game.name}
            image={game.image}
            genres={game.genres}
          />
        ))
      ) : (
        <img src={errorMessage.image} alt="NOT FOUNT" />
      )}
    </div>
  );
}
