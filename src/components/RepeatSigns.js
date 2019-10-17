import React, { useState } from "react";
import "../css/RepeatSigns.scss";
import RepeatStart from "../assets/repeat-sign-start.png";
import RepeatEnd from "../assets/repeat-sign-end.png";

export const RepeatSignStart = ({ repeat }) => {
  const [show, toggleShow] = useState(false);

  function setRepeat() {
    toggleShow(x => !x);
    repeat[0] = !repeat[0];
  }

  return (
    <div
      className={`repeat-sign-start ${show ? "active" : ""}`}
      onClick={() => setRepeat()}
    >
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 19.3 100"
        style={{ enableBackground: "new 0 0 19.3 100" }}
        space="preserve"
      >
        <rect width="5.6" height="100" />
        <rect x="7.7" width="2.9" height="100" />
        <circle cx="15.8" cy="38.5" r="3.6" />
        <circle cx="15.8" cy="61.5" r="3.6" />
      </svg>
    </div>
  );
};

export const RepeatSignEnd = ({ repeat }) => {
  const [show, toggleShow] = useState(false);

  function setRepeat() {
    toggleShow(x => !x);
    repeat[1] = !repeat[1];
  }

  return (
    <div
      className={`repeat-sign-end ${show ? "active" : ""}`}
      onClick={() => setRepeat()}
    >
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 19.3 100"
        space="preserve"
      >
        <rect
          x="13.7"
          transform="matrix(-1 -1.224647e-16 1.224647e-16 -1 32.9707 100)"
          width="5.6"
          height="100"
        />
        <rect
          x="8.8"
          transform="matrix(-1 -1.224647e-16 1.224647e-16 -1 20.3831 100)"
          width="2.9"
          height="100"
        />
        <circle cx="3.6" cy="38.5" r="3.6" />
        <circle cx="3.6" cy="61.5" r="3.6" />
      </svg>
    </div>
  );
};

export const RepeatSignStartRaster = ({ repeat }) => {
  const [show, toggleShow] = useState(false);

  function setRepeat() {
    toggleShow(x => !x);
    repeat[0] = !repeat[0];
  }

  return (
    <img
      src={RepeatStart}
      alt="repeat-start"
      className={`repeat-sign-start ${show ? "active" : ""}`}
      onClick={() => setRepeat()}
    />
  );
};

export const RepeatSignEndRaster = ({ repeat }) => {
  const [show, toggleShow] = useState(false);

  function setRepeat() {
    toggleShow(x => !x);
    repeat[1] = !repeat[1];
  }

  return (
    <img
      src={RepeatEnd}
      alt="repeat-end"
      className={`repeat-sign-end ${show ? "active" : ""}`}
      onClick={() => setRepeat()}
    />
  );
};
