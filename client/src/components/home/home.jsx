import React from "react";
import style from "../../style/home/home.module.css";
import Conteiner from "./conteiner.jsx";
import Filter from "./filters/filter";
import Order from "./order";
import Pagination from "./pagination";
import Search from "../home/search.jsx";

export default function Home() {
  return (
    <div className={style.home}>
      <div className={style.search}>
        <Search />
      </div>
      <div className={style.filter}>
        <Filter />
      </div>
      <div className={style.order}>
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
