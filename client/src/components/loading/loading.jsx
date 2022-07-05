import React from "react";
import { Link } from "react-router-dom";
import IMAGE_LOADING from "../../image/GAME.gif";
import CLICK_HERE from "../../image/CLICK_HERE.gif";
import style from "../../style/loading/loading.module.css";

export default function Loading() {
  return (
    <>
      <div className={style.conteiner_loading}>
        <Link to="/game/home">
          <img src={IMAGE_LOADING} alt="IMAGE_LOADING" />
        </Link>
        <div className={style.click_here}>
          <img src={CLICK_HERE} alt="CLICK_HERE" />
        </div>
      </div>
    </>
  );
}
