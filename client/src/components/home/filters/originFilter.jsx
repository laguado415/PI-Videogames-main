import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUrl from "../../../hooks/useUrl";
import { filter } from "../../../redux/acctions/actions";

export default function OriginFilter() {
  let [origin, setOrigin] = useState({
    filter: {
      name: "",
      value: "",
    },
  });

  let [previusState, setPrevius] = useState({
    filter: {
      name: "",
      value: "",
    },
  });

  let dispatch = useDispatch();
  let { countGames, url, errorMessage } = useSelector((state) => state);
  let { addUrl, resetRequest } = useUrl(url);

  useEffect(() => {
    handleSubmit();
  }, [origin]);

  const handleClickOrigin = (e) => {
    let { name, value } = e.target;
    origin.filter.name && setPrevius({ ...origin });
    setOrigin({ filter: { name: name, value: value } });
  };

  const handleSubmit = () => {
    if (countGames || errorMessage.value) {
      if (previusState.filter.value) {
        url = resetRequest("filter", previusState);
      }
      if (origin.filter.value) {
        url = addUrl(origin);
      }
      dispatch(filter(url));
    }
  };

  return (
    <>
      <h4>Origin</h4>
      <ul>
        <li>
          <input
            onChange={handleClickOrigin}
            name="added"
            type="radio"
            id="All"
            value=""
          />
          <label htmlFor="All">All</label>
        </li>
        <li>
          <input
            onChange={handleClickOrigin}
            name="added"
            type="radio"
            id="Original"
            value="false"
          />
          <label htmlFor="Original">Original</label>
        </li>
        <li>
          <input
            onChange={handleClickOrigin}
            name="added"
            type="radio"
            id="Created"
            value="true"
          />
          <label htmlFor="Created">Created</label>
        </li>
      </ul>
    </>
  );
}
