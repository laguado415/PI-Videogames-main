import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUrl from "../hooks/useUrl";
import { filter } from "../redux/acctions/actions";

export default function GenreFilter() {
  let [genre, setGenre] = useState({
    filter: {
      name: "",
      value: "",
      checked: false,
    },
  });

  let dispatch = useDispatch();
  let { countGames, url, errorMessage } = useSelector((state) => state);
  let { addUrl, resetRequest } = useUrl(url);

  useEffect(() => {
    handleSubmit();
  }, [genre]);

  const handleClick = (e) => {
    let { name, value, checked } = e.target;
    setGenre({ filter: { name: name, value: value, checked: checked } });
  };

  const handleSubmit = () => {
    if (countGames || errorMessage) {
      if (genre.filter.checked) {
        url = addUrl(genre);
        dispatch(filter(url));
      } else {
        // resetRequest "request",data; data(solo en caso de ser filter)
        url = resetRequest("filter", genre);
        dispatch(filter(url));
      }
    }
  };
  return (
    <>
      <h4>Genres</h4>
      <ul>
        <li>
          <input
            onChange={handleClick}
            name="genre"
            type="checkbox"
            id="Action"
            value="Action"
          />
          <label htmlFor="Action">Action</label>
        </li>
        <li>
          <input
            onChange={handleClick}
            name="genre"
            type="checkbox"
            id="Indie"
            value="Indie"
          />
          <label htmlFor="Indie">Indie</label>
        </li>
        <li>
          <input
            onChange={handleClick}
            name="genre"
            type="checkbox"
            id="Adventure"
            value="Adventure"
          />
          <label htmlFor="Adventure">Adventure</label>
        </li>
        <li>
          <input
            onChange={handleClick}
            name="genre"
            type="checkbox"
            id="RPG"
            value="RPG"
          />
          <label htmlFor="RPG">RPG</label>
        </li>
        <li>
          <input
            onChange={handleClick}
            name="genre"
            type="checkbox"
            id="Strategy"
            value="Strategy"
          />
          <label htmlFor="Strategy">Strategy</label>
        </li>
        <li>
          <input
            onChange={handleClick}
            name="genre"
            type="checkbox"
            id="Shooter"
            value="Shooter"
          />
          <label htmlFor="Shooter">Shooter</label>
        </li>
        <li>
          <input
            onChange={handleClick}
            name="genre"
            type="checkbox"
            id="Casual"
            value="Casual"
          />
          <label htmlFor="Casual">Casual</label>
        </li>
        <li>
          <input
            onChange={handleClick}
            name="genre"
            type="checkbox"
            id="Simulation"
            value="Simulation"
          />
          <label htmlFor="Simulation">Simulation</label>
        </li>
        <li>
          <input
            onChange={handleClick}
            name="genre"
            type="checkbox"
            id="Puzzle"
            value="Puzzle"
          />
          <label htmlFor="Puzzle">Puzzle</label>
        </li>
        <li>
          <input
            onChange={handleClick}
            name="genre"
            type="checkbox"
            id="Arcade"
            value="Arcade"
          />
          <label htmlFor="Arcade">Arcade</label>
        </li>
        <li>
          <input
            onChange={handleClick}
            name="genre"
            type="checkbox"
            id="Platformer"
            value="Platformer"
          />
          <label htmlFor="Platformer">Platformer</label>
        </li>
        <li>
          <input
            onChange={handleClick}
            name="genre"
            type="checkbox"
            id="Racing"
            value="Racing"
          />
          <label htmlFor="Racing">Racing</label>
        </li>
        <li>
          <input
            onChange={handleClick}
            name="genre"
            type="checkbox"
            id="Massively_Multiplayer"
            value="Massively Multiplayer"
          />
          <label htmlFor="Massively_Multiplayer">Massively Multiplayer</label>
        </li>
        <li>
          <input
            onChange={handleClick}
            name="genre"
            type="checkbox"
            id="Sports"
            value="Sports"
          />
          <label htmlFor="Sports">Sports</label>
        </li>
        <li>
          <input
            onChange={handleClick}
            name="genre"
            type="checkbox"
            id="Fighting"
            value="Fighting"
          />
          <label htmlFor="Fighting">Fighting</label>
        </li>
        <li>
          <input
            onChange={handleClick}
            name="genre"
            type="checkbox"
            id="Family"
            value="Family"
          />
          <label htmlFor="Family">Family</label>
        </li>
        <li>
          <input
            onChange={handleClick}
            name="genre"
            type="checkbox"
            id="Board_Games"
            value="Board Games"
          />
          <label htmlFor="Board_Games">Board Games</label>
        </li>
        <li>
          <input
            onChange={handleClick}
            name="genre"
            type="checkbox"
            id="Educational"
            value="Educational"
          />
          <label htmlFor="Educational">Educational</label>
        </li>
        <li>
          <input
            onChange={handleClick}
            name="genre"
            type="checkbox"
            id="Card"
            value="Card"
          />
          <label htmlFor="Card">Card</label>
        </li>
      </ul>
    </>
  );
}
