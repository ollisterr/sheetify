import create from "zustand";

import { TimeSignature } from "../types";
import { SectionModule } from "./SectionModule";

type Store = {
  title: string,
  setTitle: (title: string) => void,
  timeSignature: TimeSignature,
  setTimeSignature: (signature: TimeSignature) => void,
  tempo: number,
  setTempo: (tempo: number) => void,
  sheetData: SectionModule[],
  addSection: (index?: number) => void,
  removeSection: (index: number) => void
}

const useStore = create<Store>((set, get) => ({
  title: "",
  setTitle: (title) => set({ title }),

  timeSignature: [4, 4],
  setTimeSignature: (timeSignature) => set({ timeSignature }),

  tempo: 120,
  setTempo: (tempo) => set({ tempo }),

  sheetData: [new SectionModule()],
  addSection: (index) => set(
    {
      sheetData: index ?
        // eslint-disable-next-line max-len
        [...get().sheetData.slice(0, index), new SectionModule(), ...get().sheetData.slice(0, index)]
        : [...get().sheetData, new SectionModule()]
    }),
  removeSection: (index) =>
    set({ sheetData: get().sheetData.filter((_, i) => i === index) })
}));

export default useStore;