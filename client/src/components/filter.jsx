import React, { useState } from "react";
import OptFilter from "./optFilter";

export default function Filter() {
  let [filter, setFilter] = useState(false);

  const handleClick = (e) => {
    setFilter(!filter);
  };

  return (
    <>
      <button type="button" onClick={handleClick}>
        filter
      </button>
      {filter && <OptFilter />}
    </>
  );
}
