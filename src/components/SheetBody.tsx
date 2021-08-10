import React from "react";
import Section from "./Section";

import "../css/SheetBody.scss";
import { observer } from "mobx-react-lite";
import { sheet } from "../store";

const SheetBody: React.FC = observer(() => 
  <div className='sheetbody'>
    {sheet.sections.map((section, i) => (
      <Section 
        key={i} 
        section={section} 
        sections={sheet.sections} 
        addSection={() => sheet.addSection(i)} 
        removeSection={() => sheet.removeSection(i)} 
      />
    ))}
  </div>
);

export default SheetBody;
