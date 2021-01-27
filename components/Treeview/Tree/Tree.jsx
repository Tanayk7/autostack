import React,{useRef,useEffect, useState} from 'react';
import './Tree.css'

const Tree = (props) => {
    const [active,setActive] = useState(false);
    const tree_bottom_ref =  useRef(null);
    const tree_line_ref = useRef(null);
    const tree_content_ref = useRef(null);
    const isMounted = useRef(false);

    useEffect(() => {
        if(isMounted.current){
            if(active){
                tree_bottom_ref.current.style.display = "grid";
            }
            else{
                tree_bottom_ref.current.style.display = "none";
            }
        }
        else{
            isMounted.current = true;
        }
    }, [active]);

    return (
        <div className='tree'>
            <div className="tree-top" onClick={() =>setActive(!active)}>
                <div className="tree-plus-button">
                    { 
                        !active ? 
                        <i className="material-icons plus-icon">chevron_right</i> 
                        : 
                        <i className="material-icons plus-icon">expand_more</i> 
                    }
                </div>
                <div className="tree-text">
                    {props.treeLabel}
                </div>
            </div>
            <div className="tree-bottom" ref={tree_bottom_ref}>
                {props.children}
            </div>
        </div>
    );
}

export default Tree;


/*
    useEffect(() => {
        if(isMounted.current){
            let animate_height = tree_line_ref.current.getBoundingClientRect().height + "px";
            if(active){   
                let keyframes = [
                    {opacity:0,maxHeight:"0px"},
                    {opacity:1,maxHeight: animate_height}
                ];
                let timing = {
                    fill: "forwards",
                    duration: 300,
                    easing: "ease-out"
                }
                tree_bottom_ref.current.animate(keyframes,timing);

                keyframes = [
                    {opacity:0,transform:"translateX(100px)"},
                    {opacity:1,transform:"translateX(0)"}
                ]
                timing = {
                    fill:"forwards",
                    duration: 300,
                    easing: "ease-out"
                }
                tree_content_ref.current.animate(keyframes,timing);
            }
            else{
                let keyframes = [
                    {opacity:1,maxHeight: animate_height},
                    {opacity:0,maxHeight: "0px"}
                ];
                let timing = {
                    fill: "forwards",
                    duration: 300,
                    easing: "ease-out"
                }
                tree_bottom_ref.current.animate(keyframes,timing);

                keyframes = [
                    {opacity:1,transform:"translateX(0)"},
                    {opacity:0,transform:"translateX(100px)"}
                ]
                timing = {
                    fill:"forwards",
                    duration: 300,
                    easing: "ease-out"
                }
                tree_content_ref.current.animate(keyframes,timing);
            }
        }
        else{
            isMounted.current = true;
        }
    }, [active]);*/
