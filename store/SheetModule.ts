import { makeAutoObservable } from 'mobx';

import { TimeSignature } from '../types';
import { transposeChord } from '../utils/chords.utils';
import { SectionModule } from './SectionModule';

export interface SheetProperties {
  _id: string;
  title: string;
  timeSignature: [number, number];
  tempo: number;
  key: string;
  sections: SectionModule[];
}

export class SheetModule {
  id: string | '' = '';
  title = '';
  tempo = 120;
  timeSignature = [4, 4];
  key = 'C';
  sections = [new SectionModule()];

  constructor(sheet?: SheetProperties) {
    makeAutoObservable(this);

    if (sheet) this.read(sheet);
  }

  read(sheetData: SheetProperties) {
    this.id = sheetData._id;
    this.title = sheetData.title ?? '';
    this.timeSignature = sheetData.timeSignature || [4, 4];
    this.tempo = sheetData.tempo || 120;
    this.key = sheetData.key || 'C';

    sheetData.sections?.forEach((sectionData, i) => {
      const newSection = new SectionModule(sectionData.chordsPerBar);
      newSection.read(sectionData);
      this.sections[i] = newSection;
    });
  }

  setTitle(title: string) {
    this.title = title;
  }

  setTimeSignature(timeSignature: TimeSignature) {
    this.timeSignature = timeSignature;
  }

  setTempo(tempo: number) {
    this.tempo = tempo;
  }

  setKey(newKey: string) {
    if (newKey.length > 0) {
      this.key = newKey[0].toUpperCase() + newKey.slice(1);
    } else {
      this.key = newKey;
    }
  }

  transpose(interval: -1 | 1) {
    this.key = transposeChord(this.key, interval);
    this.sections.forEach((section) => section.transpose(interval));
  }

  addSection(index?: number) {
    this.sections = index
      ? // eslint-disable-next-line max-len
        [
          ...this.sections.slice(0, index),
          new SectionModule(this.timeSignature[0]),
          ...this.sections.slice(index),
        ]
      : [...this.sections, new SectionModule(this.timeSignature[0])];
  }

  removeSection(index: number) {
    this.sections = this.sections.filter((_, i) => i !== index);
  }
}
