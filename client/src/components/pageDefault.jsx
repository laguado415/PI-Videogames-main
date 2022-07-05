import React from "react";
import style from "../style/pageDefault.module.css";
import { TbDeviceGamepad2 } from "react-icons/tb";
import { IconContext } from "react-icons";
import { Link, Outlet } from "react-router-dom";

export default function PageDefault() {
  return (
    <>
      <header className={style.header}>
        <nav className={style.nav}>
          <div className={style.logo}>
            <IconContext.Provider value={{ className: style.logo_icon }}>
              <TbDeviceGamepad2 />
            </IconContext.Provider>
          </div>
          <div className={style.menu}>
            <Link to="/game/home">
              <label>Home</label>
            </Link>
            <Link to="/game/create">
              <label>Create Game</label>
            </Link>
          </div>
        </nav>
      </header>
      <footer className={style.footer}>
        <h5>Individual project Jonathan Laguado</h5>
      </footer>
      <Outlet />
    </>
  );
}
