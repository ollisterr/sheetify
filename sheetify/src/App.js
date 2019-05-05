import React from 'react';
import './css/App.css';
import SheetSpecification from './specs.js';
import SheetBody from './sheetbody.js';
import 'html2canvas';

const App = () => {
    var timeSignature = 4;

    return (
        <div className="App">
            <SheetSpecification />
            <SheetBody timeSignature={ timeSignature } />
        </div>
    );
}

export default App;