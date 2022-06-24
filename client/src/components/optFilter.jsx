import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../redux/acctions/actions";

export default function OptFilter() {
  let [optFilter, setOptFilter] = useState({
    added: "",
    values: ["none", "true", "false"],
  });

  let { url } = useSelector((state) => state);
  let dispatch = useDispatch();

  const handleChange = (e) => {
    if (optFilter.values.includes(e.target.value)) {
      setOptFilter({ ...optFilter, added: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    let { added } = optFilter;
    url[4] = "";
    console.log(optFilter.values.includes(added));
    if (optFilter.values.includes(added)) {
      // added === "none" ? "":
      url[2] = `&filter[added]=${added}`;
      console.log(url);
      dispatch(filter(url));
    }
  };

  return (
    <form onChange={handleSubmit}>
      <select id="added" onChange={handleChange}>
        <option value="none">none</option>
        <option value="true">created </option>
        <option value="false">existing</option>
      </select>
    </form>
  );
}
