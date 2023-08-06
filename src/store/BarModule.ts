import { Repeat } from "../types";
import { makeAutoObservable } from "mobx";
import { transposeBar } from "../utils/chords.utils";

export class BarModule {
  bar: string[];
  goal?: string;
  repeat: Repeat = [false, false];
  repeatTimes: number | null = null;

  constructor(chordsPerBar: number) {
    makeAutoObservable(this);
    this.bar = new Array(chordsPerBar).fill("");
  }

  read(barData: Partial<BarModule>) {
    this.bar = barData.bar ?? new Array(4).fill("");
    this.goal = barData.goal;
    this.repeat = barData.repeat ?? [false, false];
    this.repeatTimes = barData.repeatTimes ?? null;
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

  transpose(interval: number) {
    this.bar = transposeBar(this.bar, interval);
  }

  setGoal(newGoal?: string) {
    this.goal = newGoal;
  }

  setRepeat(newRepeat: Repeat) {
    this.repeat = newRepeat;
    if (!newRepeat[1]) {
      this.repeatTimes = null;
    }
  }

  setRepeatTimes(times: number) {
    if (this.repeat[1]) {
      this.repeatTimes = times;
    }
  }

  toggleRepeat(index: 0 | 1) {
    this.repeat[index] = !this.repeat[index];
  }
}
