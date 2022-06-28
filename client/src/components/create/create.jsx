import React, { useState } from "react";

export default function Create() {
  let [newGame, setNewGame] = useState({
    name: "", //*
    description: "", //*
    image: "",
    realsed: "", //*
    rating: "", //*
    genres: [], //*
    platforms: [], //*
  });

  const handleChange = (e) => {};
  const handleSubmit = (e) => {};
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={newGame.name}
          placeholder=""
          name="name"
        />
        <input
          onChange={handleChange}
          value={newGame.description}
          placeholder=""
          name="realsed"
        />
        <input
          onChange={handleChange}
          value={newGame.image}
          placeholder=""
          name="image"
        />
        <textarea
          onChange={handleChange}
          value={newGame.realsed}
          placeholder=""
          name="description"
        />
        <input
          onChange={handleChange}
          value={newGame.platforms}
          placeholder=""
          name="platforms"
        />
        <input
          onChange={handleChange}
          value={newGame.genres}
          placeholder=""
          name="genres"
        />
        <button>Create</button>
      </form>
    </>
  );
}
