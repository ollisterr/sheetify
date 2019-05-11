import React, { useState, useEffect } from "react";
import "./css/sheetbody.css";

export const Bar = ({ id, removeBar }) => {  
	const [content, setContent] = useState(["", "", "", ""]);  
	useEffect(() => {
		console.log(content);
	});
	return (
		<div className="bar">
			<div className="bar-controls">
				<div className="add-bar-inbetween">+</div>
				<div className="remove-bar" onClick={ () => { removeBar(id); } }>-</div>
			</div>
			<div className="bar-content">
				{ id }
				{ content.map((chord, i) => {
					return (
						<input  value={chord} 
							key={[i, i]} 
							onChange={ e => {
								const newContent = content.slice(0);
								newContent[i] = e.target.value; 
								setContent(newContent);
							} }
							className="bar-block" 
						/>
					);
				}) }
			</div>
		</div>
	);
};

export const BarList = ({ bars, removeBar }) => {
	return (
        <>
            { bars.map((_, i) => {
            	return ( <Bar key={i} id={i} bars={bars} removeBar={() => { removeBar(i); }} /> );
            }) }
        </>
	);
};