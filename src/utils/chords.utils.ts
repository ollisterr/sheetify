export const SHARP_SCALE = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B"
];

export const FLAT_SCALE = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B"
];

const sharpNormalizeMap = {
  "Db": "C#",
  "Eb": "D#",
  "Gb": "F#",
  "Ab": "G#",
  "Bb": "A#",
};

const flatNormalizeMap = {
  "C#": "Db",
  "D#": "Eb",
  "F#": "Gb",
  "G#": "Ab",
  "A#": "Bb",
};

export const transposeChord = (chord: string, interval: number) => {
  // select scale by transpose direction
  const SCALE = interval > 0 ? SHARP_SCALE : FLAT_SCALE;
  const normalize = interval > 0 ? sharpNormalizeMap : flatNormalizeMap;

  return chord.replace(
    /[CDEFGAB](b|#)?/g,
    (match: string) => {
      const i = (SCALE.indexOf(
        normalize[match as keyof typeof normalize] ?? match
      ) + interval) % SCALE.length;
      return SCALE[i < 0 ? i + SCALE.length : i];
    });
};

export const transposeBar = (chords: string[], interval: number) => {
  return chords.map(chord => {
    return chord.split("/").map((x) => transposeChord(x, interval)).join("/");
  });
};