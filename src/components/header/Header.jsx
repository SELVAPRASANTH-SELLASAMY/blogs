import headerStyle from './header.module.css';
import { useState, useEffect } from 'react';
import { RiMore2Fill, RiUploadCloud2Line, RiEditLine, RiDeleteBin5Line, RiLogoutCircleRLine } from "react-icons/ri";
function Header(){
    const [changeBg,setChangeBg] = useState(false);
    const scrollEffect = {
        borderBottom :'.1rem solid rgba(255, 255, 255, 0.2)',
        backgroundColor: '#0f172acc',
        backdropFilter: 'blur(8px)'
    }
    const handleScrollEffect = () => {
        window.scrollY > 50 ? setChangeBg(true) : setChangeBg(false);
    }
    useEffect(()=>{
        window.onscroll = handleScrollEffect;
        return () => window.onscroll = null;
    },[]);
    return(
        <header style={changeBg ? scrollEffect : null}>
            <h1>Blog Editor</h1>
            <div className={headerStyle.moreIcon}>
                <RiMore2Fill/>
                <nav>
                    <ul>
                        <li><span><RiUploadCloud2Line/></span>Publish</li>
                        <li><span><RiEditLine/></span>Edit</li>
                        <li><span><RiDeleteBin5Line/></span>Delete</li>
                        <li><span><RiLogoutCircleRLine/></span>Logout</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
export default Header;