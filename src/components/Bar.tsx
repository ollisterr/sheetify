import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import { RepeatSignStart, RepeatSignEnd } from "./RepeatSigns";
import "../css/Bar.scss";
import { BarModule } from "../store/BarModule";
import { observer } from "mobx-react-lite";

interface Bar {
  bar: BarModule,
  addBar: () => void;
  deleteBar?: () => void;
  isLastBar: boolean;
}

const Bar: React.FC<Bar> = observer(({ 
  bar, 
  addBar, 
  deleteBar,
  isLastBar = false
}) => {
  function updateBar(index: number, value: string) {
    const chord = value
      .replace(/ /g, "")
      .split("/")
      .map(x => x.charAt(0).toUpperCase() + x.slice(1))
      .join("/");
    const newBar = [...bar.bar];
    newBar[index] = chord;
    bar.setBar(newBar);
  }

  function addBarOnTab(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Tab") {
      e.preventDefault();
      addBar();
    }
  }

  return (
    <div className='bar'>
      <div className='bar-controls'>
        <FontAwesomeIcon
          icon={faPlus}
          className='add-bar-inbetween'
          onClick={addBar}
        />

        {deleteBar && (
          <FontAwesomeIcon
            icon={faMinus}
            className='remove-bar'
            onClick={() => deleteBar()}
          />
        )}
        <input
          className={"section-goal " + (bar.goal ? "defined-goal" : "")}
          value={bar.goal ?? ""}
          onChange={e => bar.setGoal(e.target.value)}
          placeholder='goal'
          tabIndex={-1}
        />
      </div>
       
      <div className='bar-content'>
        <RepeatSignStart repeat={bar.repeat} />

        {bar.bar.map((chord: string, i: number, array: string[]) => (
          <input
            value={chord}
            key={i}
            className='bar-block'
            onChange={e => updateBar(i, e.target.value)}
            autoFocus={i === 0}
            onKeyDown={
              i === array.length - 1 && isLastBar
                ? addBarOnTab
                : undefined
            }
          />
        ))}

        <RepeatSignEnd repeat={bar.repeat} />
      </div>
    </div>
  );
});

export default Bar;
