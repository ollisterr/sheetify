import React, { useContext, useEffect } from "react";
import { SheetContext, emptyBar } from "../store.js";
import SheetBody from "./SheetBody";
import SheetSpecification from "./Specs";
import { parseSheetData } from "../utils/txtUtils.js";

export const ComposePage = ({ params }) => {
  const [{ chordsPerBar }, dispatch] = useContext(SheetContext);

  useEffect(() => {
    if (!!params && Object.keys(this.params) > 0) {
      const title = params.title || "";
      const timeSignature = params.time_signature || [4, 4];
      const sheetData = params.sheet_data
        ? parseSheetData(params.sheet_data)
        : {
          sections: [{ bars: [emptyBar(chordsPerBar)] }]
        };
      const chordsPerBar = params.chords_per_bar || 4;

      dispatch({
        type: "initialize",
        newTitle: title,
        newTimeSignature: timeSignature,
        newSheetData: sheetData,
        newChordsPerBar: chordsPerBar
      });

      console.log("Parsed sheet data from url");
    }
  }, [params]);

  return (
    <>
      <SheetSpecification />
      <SheetBody />
    </>
  );
};

export default ComposePage;
