import { useEffect, useRef } from 'react';
import lazyComponentStyle from './lazyimage.module.css';
function Lazyimage({componentClass,placeholder,source,attachFunc}){
    const image = useRef();
    useEffect(()=>{
        const img = image.current;
        const setsrc = () => {
            if(img){
                img.src = source;
                img.removeEventListener('load',setsrc);
            }
        }
        img.complete ? setsrc() : img.addEventListener('load',setsrc);
        return ()=> img.removeEventListener('load',setsrc);
    },[source]);

    return(
        <figure className={`${lazyComponentStyle.container} ${componentClass}`}>
            <img loading='lazy' onClick={attachFunc && attachFunc} ref={image} src={placeholder} alt="src-image" />
        </figure>
    );
}
export default Lazyimage;