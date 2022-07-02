import React, { useEffect } from "react";
import style from "../../style/home/home.module.css";
import Conteiner from "./conteiner.jsx";
import Filter from "./filters/filter";
import Order from "./order";
import Pagination from "./pagination";
import Search from "../home/search.jsx";
import { useDispatch, useSelector } from "react-redux";
import useUrl from "../../hooks/useUrl";
import { find } from "../../redux/acctions/actions";

export default function Home() {
  let { countGames, page } = useSelector((state) => state);

  let dispatch = useDispatch();
  let { url } = useSelector((state) => state);
  let { resetUrl } = useUrl(url);

  //renderiza solo la primero vez
  useEffect(() => {
    url = resetUrl();
    dispatch(find(url));
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
        {
          <label>
            <b>{`${page + 1}/${Math.ceil(countGames / 15)}`}</b>
          </label>
        }
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
