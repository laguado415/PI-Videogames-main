import React, { useState } from "react";
import style from "../style/header.module.css";
import { useDispatch } from "react-redux";
import { find } from "../redux/acctions/actions.js";

export default function Header() {
  let [search, setSearch] = useState("");

  let dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(find(search));
    setSearch("");
  };

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <div className={style.logo}>logo</div>
        <form className={style.search} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search name"
            value={search}
            onChange={handleChange}
          />
          <button type="submit" onSubmit={handleSubmit}>
            Buscar
          </button>
        </form>
        <div className={style.filter}>
          <p>filter | order</p>
        </div>
      </nav>
    </header>
  );
}
