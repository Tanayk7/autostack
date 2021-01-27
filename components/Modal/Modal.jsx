import React,{useRef} from 'react';
import classNames from 'classnames';
import  "./Modal.css";

const Modal = ({className:passedClasses,...props}) => {
    const className = classNames('modal-component',passedClasses);
    const modal_wrapper_ref = useRef(null);
    const modal_ref = useRef(null);

    const triggerHandler = (e) => {
        modal_wrapper_ref.current.style.display = "flex";
        modal_ref.current.classList.remove('modal-leave');
        modal_ref.current.classList.add("modal-enter");
    }

    const closeHandler = (e) => {
        modal_ref.current.classList.add('modal-leave');
        setTimeout(()=>{
            if(props.onClose){
                props.onClose();
            }
            modal_ref.current.classList.remove("modal-enter");
            modal_wrapper_ref.current.style.display = "none";
        },200); 
    }

    return (
        <div className={className}>
            <button className={props.triggerClass ? props.triggerClass : ""} ref={props.triggerRef} onClick={(e) => triggerHandler(e) } primary="true">{props.triggerText}</button>
            <div className='modal-wrapper' ref={modal_wrapper_ref}>
                <div className={props.modalClass ? props.modalClass + ' modal' : 'modal'} ref={modal_ref}>
                    <div className='modal-header'> 
                        <div className='modal-header-text'>{props.title}</div>
                        <div className='close-btn' onClick={(e) => closeHandler(e)}> 
                            <i className='material-icons close-icon'>close</i>
                        </div>
                    </div>
                    <div className='modal-body'> 
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;