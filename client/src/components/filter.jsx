import React from "react";
import style from "../style/filter.module.css";
import OriginFilter from "./originFilter";
import GenreFilter from "./genreFilter";
import useUrl from "../hooks/useUrl";
import { useDispatch, useSelector } from "react-redux";
import { find } from "../redux/acctions/actions.js";

export default function Filter() {
  let dispatch = useDispatch();
  let { url } = useSelector((state) => state);
  let { resetRequest } = useUrl(url);

  const handleSubmit = (e) => {
    e?.preventDefault();
    url = resetRequest("All");
    resetCheckFilters();
    dispatch(find(url));
  };

  const resetCheckFilters = () => {
    document
      .querySelectorAll("form input[type=checkbox]")
      .forEach((checkbox) => (checkbox.checked = false));

    let radio = document.querySelector("form input[type=radio][name=added]");
    radio.checked = true;
  };

  return (
    <div className={style.filter_conteiner}>
      <label>
        <b>Filter</b>
      </label>
      <form onSubmit={handleSubmit}>
        <button type="submit">Clear</button>
        <GenreFilter />
        <OriginFilter />
      </form>
    </div>
  );
}
