import Textarea from "../textarea/Textarea";
import Textrenderer from "../textrenderer/Textrenderer";
import editorStyles from './editor.module.css';
import { RiAddCircleFill } from "react-icons/ri";
import { createContext, useEffect, useRef, useState } from "react";
const EditorContext = createContext();
function Editor(){
    const addButton = useRef();
    const waitingTime = useRef();
    const [blogs,addBlogs] = useState(JSON.parse(sessionStorage.getItem("blogs")) || [{content:'', type:'paragraph'}]);
    const [edit,startEdit] = useState(0);
    const handleAdd = () => {
        addBlogs([...blogs,{content:'',type:'paragraph'}]);
        startEdit(prev => ++prev);
    }
    useEffect(()=>{
        if(waitingTime.current){
            clearTimeout(waitingTime.current);
        }
        const saveToLocal = () => {
            sessionStorage.setItem("blogs",JSON.stringify(blogs));
        }
        waitingTime.current = setTimeout(saveToLocal,10000);
        return ()=> clearTimeout(waitingTime.current);
    },[blogs]);
    useEffect(()=>{
        console.log(blogs);
        addButton.current.ariaDisabled = blogs[edit].content ? false : true;
    },[blogs,edit]);
    return(
        <section className={editorStyles.editor}>
            <EditorContext.Provider value={{addBlogs,startEdit}}>
                {
                    blogs.map((blog,index)=>(
                        <div key={index}>
                            <Textrenderer blog={blog} index={index}/>
                            {edit === index && <Textarea blog={blog} index={index} length={blogs.length}/>}
                        </div>
                    ))
                }
            </EditorContext.Provider>
            <figure className={editorStyles.addButton} ref={addButton} aria-disabled onClick={handleAdd}>
                <RiAddCircleFill/>
            </figure>
        </section>
    );
}
export {Editor,EditorContext};