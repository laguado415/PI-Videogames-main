import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUrl from "../hooks/useUrl";
import { filter } from "../redux/acctions/actions";

export default function Origin() {
  let [origin, setOrigin] = useState({
    filter: {
      name: "",
      value: "",
      checked: false,
    },
  });

  let dispatch = useDispatch();
  let { countGames, url } = useSelector((state) => state);
  let { addUrl } = useUrl(url);

  useEffect(() => {
    handleSubmit();
  }, [origin]);

  const handleClickOrigin = (e) => {
    let { name, value, checked } = e.target;
    setOrigin({ filter: { name: name, value: value, checked: checked } });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (countGames) {
      url = addUrl(origin);
      dispatch(filter(url));
    }
  };

  return (
    <>
      <ul>
        <label>Origin</label>
        <li>
          <input
            onChange={handleClickOrigin}
            name="added"
            type="checkbox"
            id="Original"
            value="false"
          />
          <label htmlFor="Original">Original</label>
        </li>
        <li>
          <input
            onChange={handleClickOrigin}
            name="added"
            type="checkbox"
            id="Created"
            value="true"
          />
          <label htmlFor="Created">Created</label>
        </li>
      </ul>
    </>
  );
}
