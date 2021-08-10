import { observable } from "mobx";

import { TimeSignature } from "../types";
import { SectionModule } from "./SectionModule";


export const sheet = observable({
  title: "",
  setTitle(title: string) { this.title = title; },

  timeSignature: [4, 4],
  setTimeSignature(timeSignature: TimeSignature) {
    this.timeSignature = timeSignature;
  },

  tempo: 120,
  setTempo(tempo: number) { this.tempo = tempo; },

  sections: [new SectionModule()],
  addSection(index?: number) {
    this.sections = index ?
      // eslint-disable-next-line max-len
      [...this.sections.slice(0, index), new SectionModule(), ...this.sections.slice(0, index)]
      : [...this.sections, new SectionModule()];
  },
  removeSection(index: number) {
    this.sections = this.sections.filter((_, i) => i !== index);
  }
});

export type Sheet = typeof sheet;