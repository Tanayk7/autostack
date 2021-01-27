import React,{useState} from 'react';
import classnames from 'classnames';
import './RadioGroup.css';

const RadioGroup = ({className:passedClasses,...props}) => {
    const [active,setActive] = useState("");
    const className = classnames('radio-button-group',passedClasses);

    const clickHandler = (e) => {
        let target = e.target;
        let active = target.getAttribute("data-active");
        let index = target.getAttribute("data-index");
        // console.log("Target index: ",index);
        setActive(active);
        if(props.onOptionClick){
            props.onOptionClick();
        }
    }

    return (
        <div className={className}>
            {
                props.data.map((val,index) => (
                    <div className="radio-button" data-active={val} data-index={index} key={index} onClick={(e) => clickHandler(e)}>
                        <div data-active={val} data-index={index}  className={active === val ?"radio-button-circle radio-button-circle-active":"radio-button-circle"}></div>
                        <div className="radio-button-label" data-active={val} data-index={index}>
                            {val}
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default RadioGroup;
