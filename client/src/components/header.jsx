import React, { useState } from "react";
import style from "../style/header.module.css";
import { useDispatch } from "react-redux";
import { find, filterAll } from "../redux/acctions/actions.js";

export default function Header() {
  let [search, setSearch] = useState({
    find: "",
    currentFind: "",
    filter: {
      genre: {},
      added: "",
    },
  });

  let dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  //#region
  // filter: {
  //   action: "",
  //   indie: "",
  //   adventure: "",
  //   rpg: "",
  //   strategy: "",
  //   shooter: "",
  //   casual: "",
  //   simulation: "",
  //   puzzle: "",
  //   arcade: "",
  //   platformer: "",
  //   racing: "",
  //   massively_Multiplayer: "",
  //   sports: "",
  //   fighting: "",
  //   family: "",
  //   board_Games: "",
  //   educational: "",
  //   card: "",
  // },
  //#endregion
  //e.target [value,checked,name]
  const handleClickGenre = (e) => {
    let { filter } = search;
    if (e.target.checked) {
      setSearch({
        ...search,
        filter: {
          ...filter,
          genre: { ...filter.genre, [e.target.name]: e.target.value },
        },
      });
    } else {
      setSearch({
        ...search,
        filter: {
          ...filter,
          genre: { ...filter.genre, [e.target.name]: "" },
        },
      });
    }
    // dispatch(filterAll({ find: search.currentFind, filter: search.filter }));
  };

  const handleClickAdded = (e) => {
    if (e.target.checked) {
      setSearch({
        ...search,
        filter: { ...search.filter, [e.target.name]: e.target.value },
      });
    } else {
      setSearch({
        ...search,
        filter: { ...search.filter, [e.target.name]: "" },
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(find(search.find));
    setSearch({ ...search, currentFind: search.find, find: "" });
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
          <ul className={style.filter}>
            <li>
              <label>Filter</label>
              <ul>
                <li>
                  <label>GENRE</label>
                  <ul>
                    <li>
                      <input
                        onClick={handleClickGenre}
                        type="checkbox"
                        name="action"
                        value="Action"
                      />
                      <label>ACTION</label>
                    </li>
                    <li>
                      <input
                        onClick={handleClickGenre}
                        type="checkbox"
                        name="indie"
                        value="Indie"
                      />
                      <label>INDE</label>
                    </li>
                    <li>
                      <input
                        onClick={handleClickGenre}
                        type="checkbox"
                        name="rpg"
                        value="RPG"
                      />
                      <label>RPG</label>
                    </li>
                  </ul>
                </li>
                <li>
                  <input
                    onClick={handleClickAdded}
                    type="checkbox"
                    name="added"
                    value="false"
                  />
                  <label>EXISTENTE</label>
                </li>
                <li>
                  <input
                    onClick={handleClickAdded}
                    type="checkbox"
                    name="added"
                    value="true"
                  />
                  <label>AGREGADO</label>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
