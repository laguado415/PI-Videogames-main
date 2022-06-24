import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { order } from "../redux/acctions/actions";

export default function Order() {
  let column = ["name", "rating", "none"];
  let direction = ["ASC", "DESC"];

  let dispatch = useDispatch();
  let { url } = useSelector((state) => state);

  const handleChange = (e) => {
    if (column.includes(e.target.value)) {
      url[4] = "";
      if (e.target.value === "none") {
        url[3] = "";
        dispatch(order(url));
      } else {
        url[3] = `&order[column]=${e.target.value}`;
        dispatch(order(url));
      }
    } else {
      url[4] = "";
      if (direction.includes(e.target.value)) {
        url[3] = `&order[direction]=${e.target.value}`;
        dispatch(order(url));
      }
    }
  };

  return (
    <>
      {/* <label for="Order">Order</label> */}
      <select name="Order" id="Order" onChange={handleChange}>
        <option name="none" value="none">
          none
        </option>
        <option name="direction" value="ASC">
          Ascendente
        </option>
        <option name="direction" value="DESC">
          Descendente
        </option>
        <option name="column" value="name">
          Alfabetic
        </option>
        <option name="column" value="rating">
          Rating
        </option>
      </select>
    </>
  );
}
