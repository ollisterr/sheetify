import React, { useContext } from "react";
import { SheetContext, emptyBar } from "./state.js";
import "./css/sheetbody.css";

export const Bar = ({ sectionID, barID }) => {  
	const [{ sheetData }, dispatch] = useContext(SheetContext);
    
	return (
		<div className="bar">
			<div className="bar-controls">
				<div className="add-bar-inbetween">+</div>
				<div className="remove-bar" onClick={ 
					() => {
						sheetData[sectionID] = sheetData[sectionID].filter((_, i) => i !== barID);
						dispatch({type: "setSheetData", newSheetData: sheetData});
					} 
				}>-</div>
			</div>
			<div className="bar-content">
				{ barID }
				{ sheetData[sectionID][barID].map((chord, i) => {
					return (
						<input  value={chord} 
							key={(sectionID, barID, i)} 
							onChange={ e => {
								sheetData[sectionID][barID][i] = e.target.value; 
								dispatch({type: "setSheetData", newSheetData: sheetData});
							} }
							className="bar-block" 
						/>
					);
				}) }
			</div>
		</div>
	);
};


export const Section = ({ sectionID }) => {
	const [{ sheetData }, dispatch] = useContext(SheetContext);
    
	return (
		<div className="section">
			{ sheetData[sectionID].map((bar, i) => { return <Bar key={[sectionID, i]} sectionID={sectionID} barID={i} />; }) }
			<div className="bar" 
				onClick={ 
					() => { 
						sheetData[sectionID] = sheetData[sectionID].pop(emptyBar);
						dispatch({type: "writeSheet", newSheetData: sheetData}); 
					} 
				}
			></div>
		</div>
	);
};

