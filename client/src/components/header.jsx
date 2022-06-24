import React, { useState } from "react";
import style from "../style/header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { find } from "../redux/acctions/actions.js";

export default function Header() {
  let [search, setSearch] = useState({
    find: "",
    currentFind: "",
  });

  let dispatch = useDispatch();
  let { url } = useSelector((state) => state);

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.find) {
      url[4] = "";
      url[1] = `&find[name]=${search.find}`;
      dispatch(find(url));
      setSearch({ ...search, currentFind: search.find, find: "" });
    }
  };

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <div className={style.logo}>logo</div>
        <form className={style.search} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search name"
            name="find"
            value={search.find}
            onChange={handleChange}
          />
          <button type="submit" onSubmit={handleSubmit}>
            Buscar
          </button>
        </form>
        <div className={style.menu}>
          <span>Home</span>
          {"|"}
          <span>Create Game</span>
        </div>
      </nav>
    </header>
  );
}
