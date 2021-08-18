import { Repeat } from "../types";
import { makeAutoObservable } from "mobx";


export class BarModule {
  bar: string[];
  goal?: string;
  repeat: Repeat;

  constructor(chordsPerBar: number) {
    makeAutoObservable(this);
    this.bar = new Array(chordsPerBar).fill("");
    this.repeat = [false, false] as Repeat;
  }

  setBar(barData: string[]) {
    this.bar = barData;
  }

  setChordsPerBar(newChordsPerBar: number) {
    if (newChordsPerBar > this.bar.length) {
      this.bar = this.bar.concat(new Array(newChordsPerBar - this.bar.length));
    } else {
      this.bar = this.bar.slice(0, newChordsPerBar);
    }
  }

  setGoal(newGoal?: string) {
    this.goal = newGoal;
  }

  setRepeat(newRepeat: Repeat) {
    this.repeat = newRepeat;
  }

  toggleRepeat(index: 0 | 1) {
    this.repeat[index] = !this.repeat[index];
  }
}

