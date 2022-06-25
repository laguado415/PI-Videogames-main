import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { find } from "../redux/acctions/actions.js";
import useUrl from "../hooks/useUrl";

export default function Search() {
  let [search, setSearch] = useState({
    find: "",
  });

  let dispatch = useDispatch();
  let { url } = useSelector((state) => state);
  let { addUrl } = useUrl(url);

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.find) {
      url = addUrl(search);
      dispatch(find(url));
      setSearch({ ...search, find: "" });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search name"
          name="find"
          value={search.find}
          onChange={handleChange}
        />
        <button type="submit" onSubmit={handleSubmit}>
          Buscar
        </button>
      </form>
    </>
  );
}
