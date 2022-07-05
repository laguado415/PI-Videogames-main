import React from "react";
import { useSelector } from "react-redux";
import style from "../../style/home/conteiner.module.css";
import Card from "./card";

export default function Container() {
  let { games, errorMessage } = useSelector((state) => state);

  return (
    <>
      {!errorMessage.value ? (
        <div className={style.conteiner}>
          {games?.map((game) => (
            <Card
              key={game.id}
              id={game.id}
              name={game.name}
              image={game.image}
              genres={game.genres}
            />
          ))}
        </div>
      ) : (
        <img src={errorMessage.image} alt="NOT FOUNT" />
      )}
    </>
  );
}
