import React, { useEffect, useState } from "react";
import style from "../../style/create/create.module.css";
import BtnPlatform from "../btnPlatform";
import { useDispatch, useSelector } from "react-redux";
import { create, genres } from "../../redux/acctions/actions.js";

const names = ["name", "description", "image", "released", "rating"];

const validate = ({
  name,
  released,
  image,
  rating,
  description,
  platforms,
  genres,
}) => {
  let error = {};
  const RegExpName = /^[a-zA-Z\s]+$/;
  const RegExpImgUrl = /^https?:\/\/[\w]+(\.[\w]+)+[#?]?.*$/;

  if (name?.trim()) {
    if (!RegExpName.test(name)) {
      error.name = "Solo se aceptan letras";
    } else {
      error.name = "";
    }
  } else {
    if (name !== undefined) {
      error.name = "El campo name es requerido";
    }
  }

  if (released?.trim()) {
    if (isNaN(Date.parse(released))) {
      error.released = "El campo solo acepta formato dd/mm/yyyy";
    } else {
      error.released = "";
    }
  } else {
    if (released !== undefined) {
      error.released = "El campo released es requerido";
    }
  }

  if (image !== undefined) {
    if (image.length && !RegExpImgUrl.test(image)) {
      error.image = "La imagen no cumple con el formato https://example.jpg";
    } else {
      error.image = "";
    }
  }

  if (description?.trim().length) {
    if (description.length > 360) {
      error.description = "solo son permitidos 360 caracteres como maximo";
    } else {
      error.description = "";
    }
  } else {
    if (description !== undefined) {
      error.description = "El campo description requerido";
    }
  }

  if (rating?.trim().length) {
    if (isNaN(rating)) {
      // return false si es number
      error.rating = "Solo se aceptan valores numericos";
    } else {
      let arrayFloat = rating.split(".");
      if (Number(arrayFloat[0]) < 0 || Number(arrayFloat[0]) > 5) {
        error.rating = "Solo se aceptan valores 0-5";
      } else {
        error.rating =
          arrayFloat[1] > 9 ? "Se acepta maximo un digito de precision" : "";
      }
    }
  } else {
    if (rating !== undefined) {
      error.rating = "El campo es requerido";
    }
  }

  if (platforms !== undefined) {
    if (!platforms.length) {
      error.platforms = "El campo es requerido";
    }
  } else {
    if (platforms !== undefined) {
      error.platforms = "El Campo es requerido";
    }
  }

  if (genres !== undefined) {
    if (!genres.length) {
      error.genres = "El campo es requerido";
    }
  } else {
    if (genres !== undefined) {
      error.genres = "El Campo es requerido";
    }
  }

  return error;
};

export default function Create() {
  let [newGame, setNewGame] = useState({
    name: "", //*
    description: "", //*
    image: "",
    released: "", //* date
    rating: "", //*
    genres: [], //* id genres
    platforms: [], //* names platform
  });
  //------error inputs-----------------
  let [error, setError] = useState({});
  let [message, setMenssage] = useState(false);

  let dispatch = useDispatch();
  let { genres: genre, messageForm, errorForm } = useSelector((state) => state);

  useEffect(() => {
    dispatch(genres());
  }, []);

  useEffect(() => {
    const setId = setTimeout(() => {
      setMenssage(false);
    }, 10000);
    //----desmontaje---
    return () => {
      clearTimeout(setId);
    };
  }, [message]);

  const messageCreate = () => {
    if (messageForm.value) {
      return (
        <div className={style.create_form_message}>{messageForm.message}</div>
      );
    }
    if (errorForm.value) {
      return (
        <div className={style.create_form_message_error}>
          {errorForm.message}
        </div>
      );
    }
    return null;
  };

  const scrollTop = () => {
    document.documentElement.scrollTop = 0;
  };

  const clearCheckbox = () => {
    let check = document.querySelectorAll("input[type=checkbox]");
    check.forEach((checkbox) => (checkbox.checked = false));
  };

  const handleBlur = (e) => {
    handleChange(e);
    let { name, value } = e.target;
    setError({ ...error, ...validate({ [name]: value }) });
  };

  const handleChange = (e) => {
    let { name, value, checked } = e.target;
    if (name === "genres" || name === "platforms") {
      if (!checked) {
        let newValue = newGame[name].filter((options) => options !== value);
        setNewGame({ ...newGame, [name]: [...newValue] });
      } else {
        setNewGame({ ...newGame, [name]: [...newGame[name], value] });
      }
    } else {
      if (names.includes(name)) {
        setNewGame({ ...newGame, [name]: value });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    scrollTop();
    let error = validate(newGame);
    if (!Object.values(error).join("").length) {
      dispatch(create(newGame));
      clearCheckbox();
      setMenssage(true);
      setError({ ...error });
      setNewGame({
        name: "",
        description: "",
        image: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
      });
    } else {
      setMenssage(true);
      setError({ ...error });
    }
  };

  return (
    <div className={style.create_conteiner}>
      <form onSubmit={handleSubmit} className={style.create_form}>
        <div className={style.form_conteiner_message}>
          {message && messageCreate()}
        </div>
        <div className={style.create_form_form}>
          <label htmlFor="name">
            <b>Name</b>
          </label>
          <input
            id="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={newGame.name}
            placeholder=""
            name="name"
          />
          {error.name && <div className={style.error}>{error.name}</div>}
          <label htmlFor="released">
            <b>Released</b>
          </label>
          <input
            type="date"
            id="released"
            onChange={handleChange}
            onBlur={handleBlur}
            value={newGame.released}
            min="10-01-1960"
            name="released"
          />
          {error.released && (
            <div className={style.error}>{error.released}</div>
          )}
          <label htmlFor="image">
            <b>Image</b>
          </label>
          <input
            id="image"
            onChange={handleChange}
            onBlur={handleBlur}
            value={newGame.image}
            placeholder=""
            name="image"
          />
          {error.image && <div className={style.error}>{error.image}</div>}
          <label htmlFor="rating">
            <b>Rating</b>
          </label>
          <input
            id="rating"
            onChange={handleChange}
            onBlur={handleBlur}
            value={newGame.rating}
            placeholder=""
            name="rating"
          />
          {error.rating && <div className={style.error}>{error.rating}</div>}
        </div>
        <div className={style.form_conteiner_options}>
          <label>
            <b>Platform</b>
          </label>
          <div className={style.form_conteiner_genres}>
            <BtnPlatform name="platforms" id="PC" fnClick={handleChange} />
            <BtnPlatform name="platforms" id="Android" fnClick={handleChange} />
            <BtnPlatform
              name="platforms"
              id="Nintendo"
              fnClick={handleChange}
            />
            <BtnPlatform
              name="platforms"
              id="Apple Macintosh"
              value="Apple Macintosh"
              fnClick={handleChange}
            />
            <BtnPlatform name="platforms" id="Linux" fnClick={handleChange} />
            <BtnPlatform
              name="platforms"
              id="PlayStation"
              fnClick={handleChange}
            />
            <BtnPlatform name="platforms" id="Xbox" fnClick={handleChange} />
            <BtnPlatform name="platforms" id="iOS" fnClick={handleChange} />
          </div>
          {error.platforms && (
            <div className={style.error}>{error.platforms}</div>
          )}
          <label>
            <b>Genres</b>
          </label>
          <div className={style.form_conteiner_genres}>
            {genre?.map((genre) => (
              <BtnPlatform
                key={genre.id}
                value={genre.id}
                id={genre.name}
                name="genres"
                // image={genre.image}
                fnClick={handleChange}
              />
            ))}
          </div>
          {error.genres && <div className={style.error}>{error.genres}</div>}
        </div>
        <div className={style.create_form_submit}>
          <button>Create</button>
        </div>
        <div className={style.create_form_description}>
          <label htmlFor="decription">
            <b>Description</b>
          </label>
          <textarea
            id="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={newGame.description}
            placeholder=""
            name="description"
          />
          {error.description && (
            <div className={style.error}>{error.description}</div>
          )}
        </div>
      </form>
    </div>
  );
}
