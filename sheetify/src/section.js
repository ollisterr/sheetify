import React, { useState, useEffect } from "react";
import { SheetContext } from "./state.js";
import { BarList } from "./bar.js";
import "./css/sheetbody.css";

export const Section = () => {
	const emptyBar = ["", "", "", ""];
	const [{ sheetData }, dispatch] = useContext(SheetContext);
    
	useEffect(() => {
		console.log("Total bars: " + bars.length);
	});
    
	return (
		<div className='section'>
			<BarList    
				bars={bars} 
				removeBar={
					id => {
						console.log("Removing: " + id);
						setBarsState(bars.filter((bar, index) => index !== id));
					}
				} 
			/>
			<div className="bar" 
				onClick={ () => { dispatch({type: "writeSheet", newSheetData: sheetData.pop(emptyBar)}); } }
			></div>
		</div>
	);
};

