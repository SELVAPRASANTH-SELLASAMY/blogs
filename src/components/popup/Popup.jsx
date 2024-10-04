import React,{ useState, useImperativeHandle } from 'react';
import PopupStyle from './popup.module.css';
import ReactDOM from 'react-dom';
function Popup(_,ref){
    const [popup,setPopup] = useState({
        message:"",
        status:"",
        show:false
    });
    useImperativeHandle(ref,() => {
        return{
            display : (msg,status) => {
                setPopup({...popup,message:msg,status:status,show:true});
                setTimeout(()=>{
                    setPopup({...popup,message:"",status:"",show:false});
                },5000);
            }
        }
    },[popup]);
    return ReactDOM.createPortal(
        <dialog open={popup.show} className={PopupStyle.popup}>
            <p>{popup.status === "ok" ? <span>&#9989;</span> : <span>&#10071;</span>}{popup.message}</p>
        </dialog>,
        document.getElementById("popup")
    );
}
export default React.forwardRef(Popup);