import { emptyBar } from "../store.js";
import FileSaver from "file-saver";

export function saveTxt(sheetData) {
  const longest = longestChord(sheetData);
  const output = stringifySheet(sheetData, longest);
  var blob = new Blob([output], {
    type: "text/plain;charset=utf-8"
  });
  
  FileSaver.saveAs(
    blob,
    sheetData.name ? sheetData.name + ".txt" : "song-sheet.txt"
  );
}

export function longestChord(sheet) {
  return sheet.sections.reduce((sum, section) => {
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

export function longestInSection(section) {
  return section.bars.reduce((longest, bar) => {
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

export function stringifyBar(bar, longestChord, widthLimit = MAX_WIDTH) {
  const barStr =
    (bar.repeat[0] ? ":" : " ") +
    bar.bar
      .map(chord =>
        chord
          ? chord
            .split("/")
            .map(
              chord =>
                chord.charAt(0).toUpperCase() + chord.slice(1).toLowerCase()
            )
            .join("/")
            .padEnd(longestChord)
          : " ".repeat(longestChord)
      )
      .join(" · ") +
    (bar.repeat[1] ? ":" : " ");
  return barStr + (barStr.length > widthLimit ? "|\n" : "");
}

export function stringifySection(
  section,
  longestChord,
  widthLimit = MAX_WIDTH
) {
  let length = 4;
  const sectionStr =
    (section.name ? `[${section.name}]\n` : "") +
    "|" +
    section.bars
      .map(bar => {
        const result = stringifyBar(bar, longestChord, widthLimit);
        length += result.length;
        if (length > widthLimit) {
          length = 4 + result.length;
          return "\n|" + result;
        } else {
          return result;
        }
      })
      .join("|") +
    "|\n";
  return sectionStr;
}

export function stringifySheet(sheet, longestChord, widthLimit = MAX_WIDTH) {
  const output = sheet.sections
    .map(section => stringifySection(section, longestChord, widthLimit))
    .join("\n");
  return (sheet.name ? sheet.name : "Untitled song") + "\n---\n" + output;
}

export function parseSheetData(data) {
  return { sections: [{ bars: [emptyBar(4)] }] };
}
