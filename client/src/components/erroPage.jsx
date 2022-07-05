import react from "react";
import ERRORPAGE from "../image/PAGE NOT FOUND.gif";
import "./errorPage.css";

export default function ErrorPage() {
  return (
    <>
      <div className="errorPage">
        <img src={ERRORPAGE} alt="ERROR_PAGE" />
      </div>
    </>
  );
}
