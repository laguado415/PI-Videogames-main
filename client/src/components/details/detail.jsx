import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { gameId } from "../../redux/acctions/actions.js";
import ConteinerLogo from "../home/conteinerLogo";
import style from "../../style/details/detail.module.css";
import LOUDING from "../../image/loading.gif";

export default function Detail() {
  let [state, setState] = useState({
    name: "",
    released: "",
    image: "",
    description: "",
    rating: "",
    genres: "",
    platforms: "",
  });

  let [previus, setPrevius] = useState(false);
  let [loading, setLoding] = useState(false);

  let { id } = useParams();

  let dispatch = useDispatch();
  let { game } = useSelector((state) => state);

  useEffect(() => {
    dispatch(gameId(id));
    scrollTop();
  }, []);

  useEffect(() => {
    //evita la primera iteracion ya que game en el primer cambio es lo que ereda del estado global
    !previus && setPrevius(true);
    if (Object.values(game).length && previus) {
      setState({
        name: game.name,
        released: game.released,
        image: game.image,
        description: game.description,
        rating: game.rating,
        genres: [...game.genres],
        platforms: [...game.platforms],
      });
      setLoding(true);
    }
  }, [game]);

  const scrollTop = () => {
    document.documentElement.scrollTop = 0;
  };

  return (
    <div className={style.conteiner_details}>
      {!loading && (
        <div className={style.conteiner_loading}>
          <img src={LOUDING} alt="LOADNG" />
        </div>
      )}
      {state.name && (
        <div className={style.conteiner}>
          <div className={style.btn_back}>
            <Link to="/game/home">
              <b>BACK</b>
            </Link>
          </div>
          <div className={style.conteiner_img}>
            <img src={state.image} alt="ERROR_IMAGE" />
          </div>
          <h2>{state.name}</h2>
          <span>{state.released}</span>
          <p>{state.description}</p>
          <span>Rating: {state.rating}</span>
          <span>Genres</span>
          <div className={style.genres}>
            {state?.genres?.map((genre) => (
              <ConteinerLogo
                key={genre.id}
                name={genre.name}
                image={genre.image}
              />
            ))}
          </div>
          <span>Platform</span>
          <div className={style.platforms}>
            {state?.platforms?.map((platform) => (
              <ConteinerLogo key={platform} name={platform} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
