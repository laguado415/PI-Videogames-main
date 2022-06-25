import React from "react";
import style from "../style/header.module.css";

export default function Header() {
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <div className={style.logo}>logo</div>
        <div className={style.menu}>
          <span>Home</span>
          {"|"}
          <span>Create Game</span>
        </div>
      </nav>
    </header>
  );
}
