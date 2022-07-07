import React, { useEffect } from "react";
import style from "../../style/home/home.module.css";
import Conteiner from "./conteiner.jsx";
import Filter from "./filters/filter";
import Order from "./order";
import Pagination from "./pagination";
import Search from "../home/search.jsx";
import { useDispatch, useSelector } from "react-redux";
import { find } from "../../redux/acctions/actions";

export default function Home() {
  let dispatch = useDispatch();
  let { url, countGames } = useSelector((state) => state);

  //renderiza solo la primero vez
  useEffect(() => {
    //-------------page previus ------------------------------
    let page = url.page.length ? url.page.split("=")[1] : 0;
    page = parseInt(page, 10);
    dispatch(find(url, page));
  }, []);

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
        {<Pagination />}
        {
          <label>
            <b>{"Games: "}</b>
            {`${countGames}`}
          </label>
        }
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
