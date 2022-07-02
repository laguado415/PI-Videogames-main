import React, { useEffect } from "react";
import style from "../../../style/home/filter.module.css";
import OriginFilter from "./originFilter";
import GenreFilter from "./genreFilter";
import useUrl from "../../../hooks/useUrl";
import { useDispatch, useSelector } from "react-redux";
import { find } from "../../../redux/acctions/actions.js";
import { FiTrash2 } from "react-icons/fi";
import { IconContext } from "react-icons";

export default function Filter() {
  let dispatch = useDispatch();
  let { url } = useSelector((state) => state);
  let { resetRequest } = useUrl(url);

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = (e) => {
    e?.preventDefault();
    url = resetRequest("All");
    resetCheckFilters();
    dispatch(find(url));
    console.log("clear");
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
      <form onSubmit={handleSubmit} className={style.filter_form}>
        <h2 className={style.filter_title}>
          <b>Filter</b>
        </h2>
        <button type="submit" className={style.filter_btn_clear}>
          <IconContext.Provider
            value={{ className: style.filter_btn_icon_clear }}
          >
            <FiTrash2 />
          </IconContext.Provider>
        </button>
        <div>
          <div>
            <GenreFilter />
          </div>
          <div>
            <OriginFilter />
          </div>
        </div>
      </form>
    </div>
  );
}
