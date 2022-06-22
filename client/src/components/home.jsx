import React from "react";
import { useSelector } from "react-redux";
import style from "../style/home.module.css";

export default function Home() {
  let games = useSelector((state) => state.games);
  console.log(games);
  return (
    <div className={style.conteiner}>
      <h1>hola mundo</h1>
      {games?.map((game) => (
        <h1 key={game.id}>{game.name}</h1>
      ))}
    </div>
  );
}
