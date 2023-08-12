import { makeAutoObservable } from 'mobx';
import { BarModule } from './BarModule';

export class SectionModule {
  name: string = '';
  chordsPerBar: number = 4;
  bars: BarModule[] = [new BarModule(4)];

  constructor(chordsPerBar?: number) {
    makeAutoObservable(this);

    if (chordsPerBar) {
      this.bars = [new BarModule(chordsPerBar)];
      this.chordsPerBar = chordsPerBar;
    }
  }

  read(sectionData: SectionModule) {
    if (sectionData.name) this.name = sectionData.name;
    this.chordsPerBar = sectionData.chordsPerBar ?? 4;

    sectionData.bars?.forEach((barData, i) => {
      const newBar = new BarModule(this.chordsPerBar);
      newBar.read(barData);
      this.bars[i] = newBar;
    });
  }

  setName(newName: string) {
    this.name = newName;
  }

  addBar(index?: number) {
    this.bars =
      index !== undefined
        ? [
            ...this.bars.slice(0, index),
            new BarModule(this.chordsPerBar),
            ...this.bars.slice(index),
          ]
        : [...this.bars.slice(0, index), new BarModule(this.chordsPerBar)];
  }

  deleteBar(index: number) {
    if (this.bars.length > 1) {
      this.bars = this.bars.filter((bar, i) => i !== index);
    }
  }

  setChordsPerBar(count: number) {
    this.bars.forEach((bar) => bar.setChordsPerBar(count));
    this.chordsPerBar = count;
  }

  transpose(interval: number) {
    this.bars.forEach((bar) => bar.transpose(interval));
  }
}
