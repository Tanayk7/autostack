import React from 'react';
import './Progressbar.css';

const Progressbar = ({width=20,color='#ffe27a'}) => {
    return (
        <div className="progress-bar">
            <div className="progress-bar-meter" style={{background:color,width:width+'%'}}></div>
        </div>
    );
}

export default Progressbar;
