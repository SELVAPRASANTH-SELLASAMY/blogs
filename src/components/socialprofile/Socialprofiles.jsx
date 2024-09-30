import socialStyle from './socialprofiles.module.css';
import React from 'react';
import { RiFacebookFill, RiInstagramLine, RiGithubFill, RiLinkedinBoxFill, RiWhatsappFill } from "react-icons/ri";
function Socialprofiles(){
    const socialMediasArray = [
        {
            icon:<RiFacebookFill/>,
            url:"https://www.facebook.com/solarisknightben?mibextid=ngobeXctTp5pD3Zm"
        },
        {
            icon:<RiWhatsappFill/>,
            url:"https://wa.me/+919003413727"
        },
        {
            icon:<RiInstagramLine/>,
            url:"https://www.instagram.com/prasanth_sellasamy?igsh=MWxuOWR2dXRzZThzbQ=="
        },
        {
            icon:<RiGithubFill/>,
            url:"https://github.com/SELVAPRASANTH-SELLASAMY"
        },
        {
            icon:<RiLinkedinBoxFill/>,
            url:"https://www.linkedin.com/in/selvaprasanth-s-371898248?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
        }
    ];
    const visit = (url) => {
        window.open(url,"_blank","noreferrer noopener");
    }
    const renderSocialMedias = () => {
        const icons = socialMediasArray.map((media,index)=>(
            <ul key={index} className={socialStyle.mediaIcon}>
                {Array.from({length:2},(_,index)=>(
                    React.cloneElement(media.icon,{key:index,onClick:()=>visit(media.url)})
                ))}
            </ul>
        ));
        return [...icons];
    }
    return(
        <div className={socialStyle.socialMedias}>
            {renderSocialMedias()}
        </div>
    );
}
export default Socialprofiles;