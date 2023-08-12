import { Sheet } from '../store/initSheet';
import { BarModule } from '../store/BarModule';
import { SectionModule } from '../store/SectionModule';
import { FLAT_SCALE, SHARP_SCALE } from './chords.utils';

// eslint-disable-next-line max-len
const ALPHABET = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const CHARACTERS = ['@', '!', '*', '=', '(', ')', '&', '%', '#', '$'];

const EXHAUSTIVE_SCALE_SET = [...FLAT_SCALE, ...SHARP_SCALE];

const hashTarget = [...ALPHABET, ...CHARACTERS]
  .filter((x) => !EXHAUSTIVE_SCALE_SET.includes(x))
  .map((x) => x.toLowerCase());

const combine = (arr: string[], arr2: string[], original = true) => {
  return arr.reduce((acc, curr) => {
    return [...acc, ...(original ? [curr] : []), ...arr2.map((x) => curr + x)];
  }, [] as string[]);
};

// const RAW_SCALE = ["a", "b", "c", "d", "e", "f", "g"];
const chordVariations = ['m', '#', 'b', '#m', 'bm'];
const intervalVariations = combine(
  ['', '#', 'b', '-', '+'],
  ['5', '6', '7', '9', '11', '13'],
);
const scaleWithIntervals = combine(chordVariations, intervalVariations);
const specials = combine(chordVariations, ['maj7', 'sus2', 'sus4', 'dim']);

const hashables = [...scaleWithIntervals, ...specials].sort(
  (a, b) => b.length - a.length,
);

const hashablesRegex = new RegExp(hashables.join('|'), 'gi');

const hashValues = hashables.map((_, i: number) => {
  const index = Math.floor(i / hashTarget.length);
  return `${hashTarget[i % hashTarget.length]}${index || ''}`;
});

const hashMap = hashables.reduce(
  (o, k, i) => ({ ...o, [k]: hashValues[i] }),
  {},
);

// === HASH SHEET ===

const hashBar = (bar: BarModule) => {
  const startRepeat = bar.repeat[0] ? ':' : '';
  const endRepeat = bar.repeat[1] ? `:${bar.repeatTimes ?? ''}` : '';
  const goal = bar.goal ? `"${bar.goal}"` : '';

  const hash = bar.bar
    .map((x) =>
      x.replace(hashablesRegex, (match: string) => {
        const hash: string =
          hashMap[match.toLowerCase() as keyof typeof hashMap] ?? match;
        return hash.toLowerCase();
      }),
    )
    .join('/')
    .replace('///', '%')
    .replace('//', '$');

  return startRepeat + hash + endRepeat + goal;
};

const hashSection = (section: SectionModule) => {
  const sectionHash = section.bars.map(hashBar).join('|');
  return (section.name ?? '') + '[' + sectionHash + ']';
};

export const hashSheet = (sheet: Sheet) => {
  const hash = sheet.sections.map(hashSection).join('');
  return hash;
};
