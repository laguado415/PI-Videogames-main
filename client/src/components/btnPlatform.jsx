import React from "react";
import * as Images from "../image/index";
import "./btnCheckForm.css";

export default function BtnPlatform({ name, fnClick, image, value, id }) {
  let idCorrection = id.split(" ").join("_");
  return (
    <>
      <label htmlFor={id} className="BtnPLataform_conteiner_check">
        <input
          className="BtnPLataform_input"
          type="checkbox"
          id={id}
          name={name}
          value={value ? value : id}
          onClick={fnClick}
        />
        <div>
          <img
            src={image ? image : Images[idCorrection]}
            alt={"IMAGE_ERROR"}
            className="BtnPLataform_image_Check"
          />
        </div>
        <label htmlFor={id}>{id}</label>
      </label>
    </>
  );
}
