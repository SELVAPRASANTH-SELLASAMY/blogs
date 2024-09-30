import Socialprofiles from '../socialprofile/Socialprofiles';
import footerStyle from './footer.module.css';
function Footer(){
    return(
        <footer>
            <Socialprofiles/>
            <p className={footerStyle.copyright}>&copy; 2024, All rights reserved <a href='https://selvaprasanth.tech'>selvaprasanth.tech</a></p>
        </footer>
    );
}
export default Footer;