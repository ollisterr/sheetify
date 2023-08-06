import { SheetType } from '../types/index';
import FileSaver from 'file-saver';
import { BarModule } from '../store/BarModule';
import { SectionModule } from '../store/SectionModule';
import { Sheet } from '../store';

export function longestChord(sheet: SheetType): number {
  return sheet.reduce((sum, section) => {
    const barSums = section.bars.reduce((longest, bar) => {
      const longestBar = bar.bar.reduce((longestInBar, chord) => {
        if (!!chord && chord.length > longestInBar) {
          return chord.length;
        } else {
          return longestInBar;
        }
      }, 0);
      return longestBar > longest ? longestBar : longest;
    }, 0);
    return barSums > sum ? barSums : sum;
  }, 0);
}

export function longestInSection(section: SectionModule): number {
  return section.bars.reduce((longest: number, bar: BarModule) => {
    const longestBar = bar.bar.reduce((longestInBar, chord) => {
      if (!!chord && chord.length > longestInBar) {
        return chord.length;
      } else {
        return longestInBar;
      }
    }, 0);
    return longestBar > longest ? longestBar : longest;
  }, 0);
}

const MAX_WIDTH = 70;

export function stringifyBar(
  bar: BarModule,
  longestChord: number,
  widthLimit = MAX_WIDTH,
): string {
  const barStr =
    (bar.repeat[0] ? ':' : ' ') +
    bar.bar
      .map((chord: string) =>
        chord
          ? chord
              .split('/')
              .map(
                (chord) =>
                  chord.charAt(0).toUpperCase() + chord.slice(1).toLowerCase(),
              )
              .join('/')
              .padEnd(longestChord)
          : ' '.repeat(longestChord),
      )
      .join(' · ') +
    (bar.repeat[1] ? ':' : ' ');
  return barStr + (barStr.length > widthLimit ? '|\n' : '');
}

export function stringifySection(
  section: SectionModule,
  longestChord: number,
  widthLimit = MAX_WIDTH,
): string {
  let length = 4;
  const sectionStr =
    (section.name ? `[${section.name}]\n` : '') +
    '|' +
    section.bars
      .map((bar: BarModule) => {
        const result = stringifyBar(bar, longestChord, widthLimit);
        length += result.length;
        if (length > widthLimit) {
          length = 4 + result.length;
          return '\n|' + result;
        } else {
          return result;
        }
      })
      .join('|') +
    '|\n';
  return sectionStr;
}

export function stringifySheet(
  sheet: Sheet,
  longestChord: number,
  widthLimit = MAX_WIDTH,
): string {
  const { title, timeSignature, tempo, key } = sheet;

  const sheetTitle = title.length ? title : 'Untitled sheet';
  const specs = `${timeSignature.join('/')} – Key: ${key} – ${tempo} BPM`;
  const output = sheet.sections
    .map((section) => stringifySection(section, longestChord, widthLimit))
    .join('\n');

  return [sheetTitle, specs].join('\n') + '\n---\n' + output;
}

export function saveTxt(sheet: Sheet): void {
  const longest = longestChord(sheet.sections);
  const output = stringifySheet(sheet, longest);
  const blob = new Blob([output], {
    type: 'text/plain;charset=utf-8',
  });

  FileSaver.saveAs(
    blob,
    `${sheet.title.length ? sheet.title : 'my-sheet'}.txt`,
  );
}
