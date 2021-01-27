import React,{useEffect, useRef, useState} from 'react';
import classnames from 'classnames';
import "./Dropdown.css";

const Dropdown = ({dropdownValues,dropdownLabel,className:passedClasses,...props}) => {
    const [currentItem,setCurrentItem] = useState(dropdownLabel);
    const [items,setItems] = useState(dropdownValues);
    const icon_ref = useRef(null);
    const dropdown_container_ref = useRef(null);
    const dropdown_list_ref = useRef(null);
    const trigger_ref = useRef(null);
    const className = classnames('dropdown',passedClasses);

    useEffect(() => {
        window.addEventListener("click",windowClickHandler);
        return () => {
            window.removeEventListener("click",windowClickHandler);
        };
    }, []);

    const windowClickHandler = (e) => {
        if((!e.target.matches('.dropdown-trigger') 
            && !e.target.matches(".dropdown-text") 
            && !e.target.matches('.dropdown-icon')
            && !e.target.matches(".dropdown-list-item")))
        {
            let dropdown_container = dropdown_container_ref.current;
            let dropdown_list = dropdown_list_ref.current;
            let dropdown_icon = icon_ref.current;

            if(dropdown_list.classList.contains('dropdown-active')){
                dropdown_icon.classList.remove("flipped-icon");
                dropdown_list.classList.remove("dropdown-active");
                dropdown_list.classList.add("dropdown-inactive");
                setTimeout(() => {
                    dropdown_container.style.display = "none";
                }, 200);
            }
        }
    }

    const triggerClickHandler = () => {
        let dropdown_container = dropdown_container_ref.current;
        let dropdown_list = dropdown_list_ref.current;
        let dropdown_icon = icon_ref.current;
        let flip = dropdown_list.classList.contains("dropdown-active") ? false: true;

        if(flip){
            if(dropdown_list.classList.contains('dropdown-inactive')){
                dropdown_list.classList.remove("dropdown-inactive");
            }
            dropdown_icon.classList.add("flipped-icon");
            dropdown_container.style.display = "inline";
            dropdown_list.classList.add("dropdown-active");
        }
        else{
            dropdown_icon.classList.remove("flipped-icon");
            dropdown_list.classList.remove("dropdown-active");
            dropdown_list.classList.add("dropdown-inactive");
            setTimeout(() => {
              dropdown_container.style.display = "none";
            }, 200);
        }
    }

    const itemClickHandler = (e) => {
        let item = e.target;
        let dropdown_container = dropdown_container_ref.current;
        let dropdown_list = dropdown_list_ref.current;
        let dropdown_icon = icon_ref.current;
        
        setCurrentItem(item.innerHTML);
        dropdown_icon.classList.remove("flipped-icon");
        dropdown_list.classList.remove("dropdown-active");
        dropdown_list.classList.add("dropdown-inactive");

        setTimeout(() => {
            dropdown_container.style.display = "none";
        }, 200);
    }

    return (
        <div className={className}>
            <div className="dropdown-trigger" ref={trigger_ref} onClick={triggerClickHandler}>
                <span className="dropdown-text">
                    {currentItem}
                </span>
                <i className="material-icons dropdown-icon" ref={icon_ref}>arrow_drop_down</i>
            </div>
            <div className="dropdown-container" ref={dropdown_container_ref}>
                <div className="dropdown-list" ref={dropdown_list_ref}>
                    {
                        items.map((value,index) => (
                            <div className="dropdown-list-item" key={index} onClick={(e) => itemClickHandler(e)}>{value}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Dropdown;

