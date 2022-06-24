import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pagination } from "../redux/acctions/actions";

export default function Pagination() {
  let dispatch = useDispatch();
  let { url, page, countGames: count } = useSelector((state) => state);

  const handleClick = (e) => {
    if (e.target.name === "next") {
      // multiplica la pagina por el size permitido  y lo compara con la cantidada de elementos
      // si el numero de elemento es menor al resultado no entra
      if ((page + 1) * 15 < count) {
        page++;
        url[4] = `&page=${page}`;
        dispatch(pagination(url, page));
      }
    } else {
      if (page > 0) {
        page--;
        console.log(page);
        url[4] = `&page=${page}`;
        dispatch(pagination(url, page));
      }
    }
  };

  return (
    <>
      <button type="button" name="previus" onClick={handleClick}>
        anterior
      </button>
      <button type="button" name="next" onClick={handleClick}>
        siguiente
      </button>
    </>
  );
}
