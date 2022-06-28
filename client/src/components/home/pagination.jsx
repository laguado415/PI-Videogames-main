import React from "react";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { useDispatch, useSelector } from "react-redux";
import useUrl from "../../hooks/useUrl";
import { pagination } from "../../redux/acctions/actions";
import style from "../../style/home/pagination.module.css";

export default function Pagination() {
  let dispatch = useDispatch();
  let { url, page, countGames: count } = useSelector((state) => state);
  let { addUrl } = useUrl(url);

  const scrollTop = () => {
    document.documentElement.scrollTop = 0;
  };

  const handleClick = (e) => {
    let { id } = e.target.id ? e.target : e.target.viewportElement;
    if (id === "next") {
      // multiplica la pagina por el size permitido  y lo compara con la cantidada de elementos
      // si el numero de elemento es menor al resultado no entra
      if ((page + 1) * 15 < count) {
        page++;
        url = addUrl({ page });
        dispatch(pagination(url, page));
        scrollTop();
      }
    } else {
      if (page > 0 && id === "previus") {
        page--;
        url = addUrl({ page });
        dispatch(pagination(url, page));
        scrollTop();
      }
    }
  };

  return (
    <>
      <IconContext.Provider value={{ className: style.pagination_icon }}>
        <div className={style.pagination_btn_conteiner}>
          <button
            className={style.pagination_btn}
            type="button"
            id="previus"
            onClick={handleClick}
          >
            <FaChevronCircleLeft id="previus" />
          </button>
        </div>
        <div className={style.pagination_btn_conteiner}>
          <button
            className={style.pagination_btn}
            type="button"
            id="next"
            onClick={handleClick}
          >
            <FaChevronCircleRight id="next" />
          </button>
        </div>
      </IconContext.Provider>
    </>
  );
}
