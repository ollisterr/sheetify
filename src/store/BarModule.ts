import { Repeat } from "../types";
import { makeAutoObservable } from "mobx";


export class BarModule {
  chordsPerBar: number;
  bar: string[];
  goal?: string;
  repeat: Repeat;

  constructor(chordsPerBar: number) {
    makeAutoObservable(this);
    this.chordsPerBar = chordsPerBar;
    this.bar = new Array(chordsPerBar).fill("");
    this.repeat = [false, false] as Repeat;
  }

  setBar(barData: string[]) {
    this.bar = barData;
  }

  setChordsPerBar(newChordsPerBar: number) {
    this.bar = this.bar.slice(0, newChordsPerBar);
  }

  setGoal(newGoal?: string) {
    this.goal = newGoal;
  }

  setRepeat(newRepeat: Repeat) {
    this.repeat = newRepeat;
  }
}

