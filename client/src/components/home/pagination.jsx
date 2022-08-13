import React, { useEffect, useState } from "react";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { useDispatch, useSelector } from "react-redux";
import useUrl from "../../hooks/useUrl";
import { pagination } from "../../redux/acctions/actions";
import style from "../../style/home/pagination.module.css";

export default function Pagination() {
  let [state, setState] = useState({
    page: 1,
  });

  let dispatch = useDispatch();
  let { url, page, countGames: count, games } = useSelector((state) => state);
  let { addUrl } = useUrl(url);
  
  useEffect(() => {
    setState({ page: page + 1 });
  }, [games]);

  const scrollTop = () => {
    document.documentElement.scrollTop = 0;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (!isNaN(value) && value % 1 === 0 && value > 0) {
      //number && not float && positivo
      value <= Math.ceil(count / 15) && setState({ [name]: value });
    } else {
      setState({ page: "" });
    }
  };

  const handleBlur = (e) => {
    if (!e.target.value) {
      setState({
        page: page + 1,
      });
    } else {
      let newPage = e.target.value - 1;
      url = addUrl({ page: newPage });
      dispatch(pagination(url, newPage));
      scrollTop();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.page) {
      let newPage = state.page - 1;
      url = addUrl({ page: newPage });
      dispatch(pagination(url, newPage));
      scrollTop();
    }
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
    <div className={style.pagination_conteiner}>
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
      </IconContext.Provider>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="page"
            onChange={handleChange}
            onBlur={handleBlur}
            value={state.page}
          />
          <label>
            <b>{`/${Math.ceil(count / 15)}`}</b>
          </label>
        </div>
      </form>
      <IconContext.Provider value={{ className: style.pagination_icon }}>
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
    </div>
  );
}
