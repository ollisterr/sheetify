import React, { useState } from 'react';
import './css/sheetbody.css';
import { timeSignature } from './state';

const Bar = ({ id, removeBar }) => {    
    return (
        <div className="bar">
            <div className="bar-controls">
                <div className="add-bar-inbetween">+</div>
                <div className="remove-bar" onClick={ () => {removeBar(id)} }>-</div>
            </div>
            <div className="bar-content">
                <input className="bar-block" />
                <input className="bar-block" />
                <input className="bar-block" />
                <input className="bar-block" />
            </div>
        </div>
    )
}

const Section = () => {
    const [bars, setBarsState] = useState([
        <Bar key="0" 
            id="0" 
            removeBar = { (id) => {
                console.log("Remove: " + id);
                setBarsState(bars.filter(bar => bar.props.id !== id));
            } } 
        />]);

    const triggerAddBar = () => {
        setBarsState([...bars, 
            <Bar key={bars.length} 
                id={bars.length}  
                removeBar = { (id) => {
                    console.log("Remove: " + id);
                    setBarsState(bars.filter((bar) => {console.log(bar.props.id); return bar.props.id !== id;}));
                } } 
            />]);
        console.log("Bars at the moment: " + bars.length);
    }
    
    
    return (
        <div className="section">
            { bars }
            <button className="bar" onClick={ triggerAddBar } />
        </div>
    )
}


const SheetBody = ({ timeSignature }) => {
    const [sections, addSection] = useState([<Section key="1" />]);

    return (
        <div className="sheetbody">
            { sections }
            <div className="control-bar">
                <button className="add-section" onClick={ () => { console.log("jhg"); addSection([...sections, <Section key={sections.length + 1}/>]) }} />
                <button className="print" />
            </div>
        </div>
    );
}

export default SheetBody;