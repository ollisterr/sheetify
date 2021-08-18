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

  key: "C",
  setKey(newKey: string) {
    if (newKey.length > 0) {
      this.key = newKey[0].toUpperCase() + newKey.slice(1);
    } else {
      this.key = newKey;
    }
  },

  sections: [new SectionModule()],
  addSection(index?: number) {
    this.sections = index ?
      // eslint-disable-next-line max-len
      [...this.sections.slice(0, index), new SectionModule(this.timeSignature[0]), ...this.sections.slice(index)]
      : [...this.sections, new SectionModule(this.timeSignature[0])];
  },
  removeSection(index: number) {
    this.sections = this.sections.filter((_, i) => i !== index);
  }
});

export type Sheet = typeof sheet;