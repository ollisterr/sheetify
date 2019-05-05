import React, { useState } from 'react';
import './css/sheetbody.css';
import { timeSignature } from './state';

const Bar = () => {
    return (
        <div className="bar">
            <input className="bar-block" />
            <input className="bar-block" />
            <input className="bar-block" />
            <input className="bar-block" />
        </div>
    )
}

const Section = () => {
    const [bars, addBar] = useState([<Bar key="1" />]);

    return (
        <div className="section">
            { bars }
            <button className="add-bar" onClick={ () => { addBar([...bars, <Bar key={bars.length + 1}/>]) }} />
        </div>
    )
}

const ControlBar = () => {
    return (
        <div className="controlbar">
            <button className="add-section" />
            <button className="print" />
        </div>
    )
}

const SheetBody = ({ timeSignature }) => {
    return (
        <div className="sheetbody">
            <Section />
            <ControlBar />
        </div>
    );
}

export default SheetBody;