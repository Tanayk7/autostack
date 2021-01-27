import React,{useState,useEffect,useRef} from 'react';
import './Sidebar.css';

const Sidebar = () => {
    const [activeDrawer,setActiveDrawer] = useState("");
    const [drawerActive,setDrawerActive] = useState(false);
    const [secondaryDrawerActive,setSecondaryDrawerActive] = useState(false);
    const drawer_ref = useRef(null);
    const drawer_primary = useRef(null);
    const drawer_secondary = useRef(null);
    const overlay_ref = useRef(null);

    const navClickHandler = () => {
        if(!drawerActive){
            openDrawer();
        }
        else{
            closeDrawer();
        }     
    }

    const openDrawer = () => {
        setDrawerActive(true);
        overlay_ref.current.style.display = 'block';
        overlay_ref.current.style.opacity = 1;
        drawer_ref.current.animate([
            {transform:"translateX(-100%)"},
            {transform:"translateX(0)"}
        ],{
            easing:"cubic-bezier(.34,.79,.22,.91)",
            duration: 200,
            fill:"forwards"
        })
    }

    const closeDrawer = () => {
        setDrawerActive(false);
        overlay_ref.current.style.display = 'none';
        overlay_ref.current.style.opacity = 0;
        drawer_ref.current.animate([
            {transform:"translateX(0)"},
            {transform:"translateX(-100%)"}
        ],{
            easing:"cubic-bezier(.34,.79,.22,.91)",
            duration: 200,
            fill:"forwards"
        })
        setTimeout(()=>{
            closeSecondaryDrawer();
        },200)
    }


    const openSecondaryDrawer = () => {
        setSecondaryDrawerActive(true);
        drawer_primary.current.animate([
            {transform:"translateX(0)"},
            {transform:"translateX(-30%)"}
        ],{
            easing:"cubic-bezier(.34,.79,.22,.91)",
            duration: 200,
            fill:"forwards" 
        });
        drawer_secondary.current.animate([
            {transform:"translateX(100%)"},
            {transform:"translateX(0)"}
        ],{
            easing:"cubic-bezier(.34,.79,.22,.91)",
            duration: 200,
            fill:"forwards"
        })
    }

    const closeSecondaryDrawer = () => {
        setSecondaryDrawerActive(false);
        drawer_primary.current.animate([
            {transform:"translateX(-30%)"},
            {transform:"translateX(0)"}
        ],{
            easing:"cubic-bezier(.34,.79,.22,.91)",
            duration: 200,
            fill:"forwards" 
        });
        drawer_secondary.current.animate([
            {transform:"translateX(0)"},
            {transform:"translateX(100%)"}
        ],{
            easing:"cubic-bezier(.34,.79,.22,.91)",
            duration: 200,
            fill:"forwards"
        })
    }


    return (
        <div className='sidebar'>
            <div className="sidebar-links">
                <a href="#" className="sidebar-link">
                    <div className="profile-image"></div>
                </a>
                <a href="#" className="sidebar-link" >
                    <i className="material-icons">home</i>
                    <div className="sidebar-link-label">
                        <div className="sidebar-link-label-text">
                            home
                        </div>
                    </div>
                </a>
                <a href="#" className="sidebar-link" onClick={navClickHandler}>
                    <i className="material-icons">dashboard</i>
                    <div className="sidebar-link-label">
                        <div className="sidebar-link-label-text">
                        dashboard
                        </div>
                    </div>
                </a>
                <a href="#" className="sidebar-link">
                    <i className="material-icons">label</i>
                    <div className="sidebar-link-label">
                        <div className="sidebar-link-label-text">
                            create labels
                        </div>
                    </div>
                </a>
                <a href="#" className="sidebar-link">
                    <i className="material-icons">subscriptions</i>
                    <div className="sidebar-link-label">
                        <div className="sidebar-link-label-text">
                        subscriptions
                        </div>
                    </div>
                </a>
            </div>

            <div className="sidebar-drawer" ref={drawer_ref}>
                <div className="sidebar-drawer-content-wrapper primary-drawer" ref={drawer_primary}>
                    <div className="sidebar-drawer-header">
                        <div className="sidebar-drawer-header-text">
                            dashboard
                        </div>
                        <i className="material-icons drawer-close-icon" onClick={closeDrawer}>close</i>
                    </div>
                    <div className="sidebar-drawer-content">
                        <div className="drawer-content-title">
                            title text
                        </div>
                        <div className="drawer-content">
                            content text
                        </div>
                    </div>
                    <button className="advanced-settings" onClick={openSecondaryDrawer}>
                        Show advanced settings
                    </button>
                </div>
                <div className="sidebar-drawer-content-wrapper secondary-drawer" ref={drawer_secondary}>
                    <div className="sidebar-drawer-header">
                        <div className="">
                            <i className="material-icons back-icon" onClick={closeSecondaryDrawer}>arrow_back_ios</i>
                            <div className="sidebar-drawer-header-text">
                                dashboard
                            </div>
                        </div>
                        <i className="material-icons drawer-close-icon" onClick={closeDrawer}>close</i>
                    </div>
                    <div className="sidebar-drawer-content">
                        <div className="drawer-content-title">
                            title text
                        </div>
                        <div className="drawer-content">
                            content text
                        </div>
                        <div className="drawer-content-title">
                            title text
                        </div>
                        <div className="drawer-content">
                            content text
                        </div>
                        <div className="drawer-content-title">
                            title text
                        </div>
                        <div className="drawer-content">
                            content text
                        </div>
                        <div className="drawer-content-title">
                            title text
                        </div>
                        <div className="drawer-content">
                            content text
                        </div>
                        <div className="drawer-content-title">
                            title text
                        </div>
                        <div className="drawer-content">
                            content text
                        </div>
                        <div className="drawer-content-title">
                            title text
                        </div>
                        <div className="drawer-content">
                            content text
                        </div>
                        <div className="drawer-content-title">
                            title text
                        </div>
                        <div className="drawer-content">
                            content text
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar-active-overlay" ref={overlay_ref} onClick={closeDrawer}>

            </div>
        </div>
    );
}

export default Sidebar;
