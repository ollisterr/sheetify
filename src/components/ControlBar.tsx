
import React from "react";
import { observer } from "mobx-react-lite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { sheet } from "../store";
import { saveTxt } from "../utils/txt.utils";

const ControlBar = observer(({ printPDF }: { printPDF?: () => void }) => (
  <div className='control-bar' data-html2canvas-ignore='true'>
    <div className='add-section' onClick={() => sheet.addSection()}>
      <FontAwesomeIcon icon={faPlus} className='add-section-icon' />

      Add Section
    </div>

    <div className="print" onClick={() => saveTxt(sheet.sections)}>
      Save .txt
    </div>

    <div className="print" onClick={printPDF}>
      Save .pdf
    </div>
  </div>
));

export default ControlBar;