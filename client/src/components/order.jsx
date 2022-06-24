import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUrl from "../hooks/useUrl";
import { order } from "../redux/acctions/actions";

export default function Order() {
  let [state, setState] = useState({
    order: {
      name: "",
      value: "",
    },
  });

  let column = ["name", "rating"];
  let direction = ["ASC", "DESC"];

  useEffect(() => {
    handleSubmit();
  }, [state]);

  let dispatch = useDispatch();
  let { url, countGames } = useSelector((state) => state);
  let { addUrl, resetRequest } = useUrl(url);

  const handleChange = (e) => {
    let { value } = e.target;
    value === "none" &&
      setState({ order: { name: "none", value: `${value}` } });
    column.includes(value) &&
      setState({ order: { name: "column", value: `${value}` } });
    direction.includes(value) &&
      setState({ order: { name: "direction", value: `${value}` } });
  };

  const handleSubmit = () => {
    let { name, value } = state.order;
    if (name && value && countGames) {
      if (name === "none") {
        url = resetRequest("order");
        console.log(url);
        dispatch(order(url));
      } else {
        url = addUrl(state);
        dispatch(order(url));
      }
    }
  };

  return (
    <>
      <select id="Order" onChange={handleChange}>
        <option value="none">none</option>
        <option value="ASC">Ascendente</option>
        <option value="DESC">Descendente</option>
        <option value="name">Alfabetic</option>
        <option value="rating">Rating</option>
      </select>
    </>
  );
}
