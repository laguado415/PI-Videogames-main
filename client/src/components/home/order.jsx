import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUrl from "../../hooks/useUrl";
import { order } from "../../redux/acctions/actions";
import Style from "../../style/home/order.module.css";

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
    if (url.order.length) {
      let value = url.order.split("=")[1];
      previusOrder(value);
    }
  }, []);

  useEffect(() => {
    handleSubmit();
  }, [state]);

  let dispatch = useDispatch();
  let { url, countGames } = useSelector((state) => state);
  let { addUrl, resetRequest } = useUrl(url);

  //-------- previus order -----------------------
  const previusOrder = (value) => {
    document.getElementById("Order").value = value;
  };

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
        dispatch(order(url));
      } else {
        url = addUrl(state);
        dispatch(order(url));
      }
    }
  };

  return (
    <>
      <select
        id="Order"
        onChange={handleChange}
        className={Style.order_conteiner}
      >
        <option value="none">All</option>
        <option value="ASC">Ascendente</option>
        <option value="DESC">Descendente</option>
        <option value="name">Alfabetic</option>
        <option value="rating">Rating</option>
      </select>
    </>
  );
}
