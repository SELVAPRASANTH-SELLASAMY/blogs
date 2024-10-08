import Textarea from "../textarea/Textarea";
import Textrenderer from "../textrenderer/Textrenderer";
import editorStyles from './editor.module.css';
import { RiAddCircleFill } from "react-icons/ri";
import { createContext, useEffect, useRef, useState } from "react";
const EditorContext = createContext();
function Editor({popup}){
    const addButton = useRef();
    const waitingTime = useRef();
    const [blogs,addBlogs] = useState(JSON.parse(localStorage.getItem("blogs")) || [{type:'paragraph'}]);
    const [edit,startEdit] = useState(0);
    const handleAdd = () => {
        addBlogs([...blogs,{type:'paragraph'}]);
        startEdit(prev => ++prev);
    }
    useEffect(()=>{
        if(waitingTime.current){
            clearTimeout(waitingTime.current);
        }
        const saveToLocal = () => {
            localStorage.setItem("blogs",JSON.stringify(blogs));
            popup.current.display("Draft saved!","ok");
        }
        waitingTime.current = setTimeout(saveToLocal,10000);
        return ()=> clearTimeout(waitingTime.current);
    },[blogs,popup]);
    useEffect(()=>{
        console.log(blogs);
        addButton.current.ariaDisabled = blogs[edit].content || blogs[edit].Image ? false : true;
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
            <span className={editorStyles.addButton} ref={addButton} aria-disabled onClick={handleAdd}>
                <RiAddCircleFill/>
            </span>
        </section>
    );
}
export {Editor,EditorContext};