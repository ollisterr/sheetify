import { makeAutoObservable } from "mobx";
import { BarModule } from "./BarModule";

export class SectionModule {
  name?: string;
  chordsPerBar: number;
  bars: BarModule[];

  constructor(chordsPerBar?: number) {
    makeAutoObservable(this);
    this.chordsPerBar = chordsPerBar ?? 4;
    this.bars = [new BarModule(chordsPerBar ?? 4)];
  }

  setName(newName: string) {
    this.name = newName;
  }

  addBar(index?: number) {
    this.bars = index !== undefined ?
      // eslint-disable-next-line max-len
      [...this.bars.slice(0, index), new BarModule(this.chordsPerBar), ...this.bars.slice(index)]
      : [...this.bars.slice(0, index), new BarModule(this.chordsPerBar)];
  }

  deleteBar(index: number) {
    if (this.bars.length > 1) {
      this.bars = this.bars.filter((bar, i) => i !== index);
    }
  }

  setChordsPerBar(count: number) {
    this.bars.forEach(bar => bar.setChordsPerBar(count));
    this.chordsPerBar = count;
  }
}