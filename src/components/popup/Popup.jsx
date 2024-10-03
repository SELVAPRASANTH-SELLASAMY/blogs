import React,{ useState, useImperativeHandle } from 'react';
import PopupStyle from './popup.module.css';
import ReactDOM from 'react-dom';
function Popup(_,ref){
    const [popup,setPopup] = useState({
        message:"",
        show:false
    });
    useImperativeHandle(ref,() => {
        return{
            display : (msg) => {
                setPopup({...popup,message:msg,show:true});
                setTimeout(()=>{
                    setPopup({...popup,message:"",show:false});
                },5000);
            }
        }
    },[popup]);
    return ReactDOM.createPortal(
        <dialog open={popup.show} className={PopupStyle.popup}>
            <p><span>&#9989;</span>{popup.message}</p>
        </dialog>,
        document.getElementById("popup")
    );
}
export default React.forwardRef(Popup);