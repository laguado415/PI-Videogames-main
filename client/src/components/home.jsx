import React from "react";
import style from "../style/home.module.css";
import Conteiner from "./conteiner.jsx";
import Filter from "./filter";
import Order from "./order";
import Pagination from "./pagination";

export default function Home() {
  return (
    <div className={style.home}>
      <span>hola</span>
      <div className={style.options}>
        <Filter />
        <Order />
      </div>
      <div className={style.conteiner}>
        <Conteiner />
      </div>
      <div className={style.pagination}>
        <Pagination />
      </div>
    </div>
  );
}
