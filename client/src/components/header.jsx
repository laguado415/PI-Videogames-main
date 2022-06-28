import React from "react";
import style from "../style/home/header.module.css";
import { TbDeviceGamepad2 } from "react-icons/tb";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <div className={style.logo}>
          <IconContext.Provider value={{ className: style.logo_icon }}>
            <TbDeviceGamepad2 />
          </IconContext.Provider>
        </div>
        <div className={style.menu}>
          <Link to="/">
            <label>Home</label>
          </Link>
          <Link to="/create">
            <label>Create Game</label>
          </Link>
        </div>
      </nav>
    </header>
  );
}
