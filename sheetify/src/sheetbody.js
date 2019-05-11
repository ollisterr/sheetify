import React, { useState } from "react";
import { Section } from "./section.js";
import "./css/sheetbody.css";


const SheetBody = () => {
	const [sections, addSection] = useState([<Section key="1" />]);
	const [print, setPrint] = useState("No print");

	function printAll() {
		var output = "";
		sections.foreach((section, i) => {
			section.props.bars.foreach(a => {
				output += i + " | " + a.props.content.join(", ") + " |\n";
			});
		});
		setPrint(output);
	}

	return (
		<div className="sheetbody">
			{ sections }
			<div className="control-bar">
				<div className="add-section" onClick={ () => { addSection([...sections, <Section key={sections.length + 1}/>]); }}>Add</div>
				<div className="print" onClick={ printAll }>Print</div>
			</div>
			{ print }
		</div>
	);
};

export default SheetBody;