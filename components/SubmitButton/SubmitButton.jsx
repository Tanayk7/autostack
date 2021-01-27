import React, { useRef,useState } from 'react';
import './SubmitButton.css';

const SubmitButton = (props) => {
    const [active,setActive] = useState(false);

    return (
        <div className={active? "submit-button-container submit-button-container-active":"submit-button-container-inactive submit-button-container "}>
            <div className='submit-button' onClick={()=>setActive(!active)}>
                <div className="submit-button-text">Submit</div>
                <div className="submit-button-spinner"></div>
            </div>
        </div> 
    );
}

export default SubmitButton;
