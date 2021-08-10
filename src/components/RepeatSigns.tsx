import React, { useState } from "react";

import "../css/RepeatSigns.scss";
import RepeatStart from "../assets/repeat-sign-start.png";
import RepeatEnd from "../assets/repeat-sign-end.png";
import { Repeat } from "../types";

export const RepeatSignStart: React.FC<{repeat: Repeat}> = ({ repeat }) => {
  const [show, toggleShow] = useState(false);

  function setRepeat() {
    toggleShow((x: boolean) => !x);
    repeat[0] = !repeat[0];
  }

  return (
    <div
      className={`repeat-sign-start ${show ? "active" : ""}`}
      onClick={() => setRepeat()}
    >
      <img src={RepeatStart} />
    </div>
  );
};

export const RepeatSignEnd: React.FC<{repeat: Repeat}> = ({ repeat }) => {
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
      <img src={RepeatEnd} />
    </div>
  );
};
