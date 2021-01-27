import React,{useState,useEffect,useRef} from 'react';
import classnames from 'classnames';
import './Switch.css';

const Switch = (props) => {
    const [active,setActive] = useState(false);
    const isMounted = useRef(false);
    const className = classnames('switch-container',props.className);

    useEffect(() => {
        if(isMounted.current){
            onChangeHandler();
        }
        else{
            isMounted.current = true;
        }
    }, [active]);

    const onChangeHandler = () => {
        if(props.onChange){
            props.onChange(active);
        }
    }

    return (
        <div className={className}>
            <div className='switch'>
                <div className={active ? "switch-body switch-body-active":"switch-body"}  onClick={() => setActive(!active)}></div>
                <div className={active ? "switch-button switch-button-active":"switch-button"}></div>
            </div>
            <div className="switch-label" onClick={() => setActive(!active)}>
                Switch label
            </div>
        </div>
    );
}

export default Switch;
