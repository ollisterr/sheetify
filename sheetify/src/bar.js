import React, { useContext, useEffect } from "react";
import { SheetContext } from "./state.js";
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
            
		</div>
	);
};

/*

			<div className="bar-content">
				{ barID }
				{ sheetData[sectionID][barID].map((chord, i) => {
					return (
						<input  value={chord} 
							key={(sectionID, barID)} 
							onChange={ e => {
								sheetData[sectionID][barID][i] = e.target.value; 
								dispatch({type: "setSheetData", newSheetData: sheetData});
							} }
							className="bar-block" 
						/>
					);
				}) }
            </div>
            */

export const BarList = ({ sectionID }) => {
	const [{ sheetData }, dispatch] = useContext(SheetContext);
	return (
        <>
            { sheetData[sectionID].map((_, i) => {
            	return ( <Bar key={i} id={i} /> );
            }) }
        </>
	);
};