import React from "react";
import { useSelector } from "react-redux";
import style from "../style/home.module.css";
import Conteiner from "./conteiner.jsx";
import Pagination from "./pagination";

export default function Home() {
  return (
    <div className={style.home}>
      <span>hola</span>
      <div className={style.conteiner}>
        <Conteiner />
      </div>
      <div className={style.pagination}>
        <Pagination />
      </div>
    </div>
  );
}
