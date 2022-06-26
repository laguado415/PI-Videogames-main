import React from "react";
import style from "../style/filter.module.css";
import Origin from "./originFilter";
import Genre from "./genreFilter";

export default function Filter() {
  const handleSubmit = (e) => {
    e?.preventDefault();
  };

  return (
    <div className={style.filter_conteiner}>
      <label>
        <b>Filter</b>
      </label>
      <form onSubmit={handleSubmit}>
        <Genre />
        <Origin />
      </form>
    </div>
  );
}
