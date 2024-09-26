import textareaStyles from './textarea.module.css';
import { EditorContext } from '../editor/Editor';
import { useContext, useEffect, useRef } from 'react';
import { RiDeleteBin5Line } from "react-icons/ri";
import Axios from 'axios';
function Textarea({index}){
    const toolbar = useRef();
    const {blogs,addBlogs,startEdit} = useContext(EditorContext);
    const handleChange = (e) => {
        addBlogs(prevBlogs => {
            prevBlogs[index].content = e.target.value;
            return [...prevBlogs];
        });
    }
    const handleDelete = () => {
        addBlogs(prevBlogs => {
            prevBlogs.splice(index,1);
            return [...prevBlogs];
        });
        startEdit(prev => --prev);
    }
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image',file);
        Axios.post("http://localhost:3001/portfolio/blogs/uploadimage",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        .then((res)=>{
            console.log(res);
            if(res.status === 200){
                addBlogs(prevBlogs => {
                    prevBlogs[index].content = res.data.path;
                    return [...prevBlogs];
                });
            }
            else{
                console.log(res.error);
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        const tools = toolbar.current.querySelectorAll('button');
        let activeOption = tools[2];
        tools.forEach(tool => {
            tool.onclick = () => {
                activeOption.classList.remove(textareaStyles.active);
                activeOption = tool;
                activeOption.classList.add(textareaStyles.active);
                addBlogs(prevBlogs => {
                    prevBlogs[index].type = tool.getAttribute('value');
                    return [...prevBlogs];
                });
            }
            return () => tool.onclick = null;
        });
    },[addBlogs,index]);
    return(
        <div className={textareaStyles.textArea}>
            {blogs[index].type !== "image" ? 
            <textarea onChange={(e)=>handleChange(e)} value={blogs[index].content} name="textarea" id="textarea" placeholder='Start typing here...'></textarea> :
            <input onChange={(e)=>handleImageUpload(e)} type="file" accept='image/*' name='image' id='image'/>
            }
            <div ref={toolbar} className={textareaStyles.toolbar}>
                <button value='heading'>Heading</button>
                <button value='sub_heading'>Sub heading</button>
                <button value='paragraph' className={textareaStyles.active}>Paragraph</button>
                <button value='image'>Image</button>
                <figure aria-disabled={index >= 1 ? false : true} onClick={index >= 1 ? handleDelete : null}>
                    <RiDeleteBin5Line/>
                </figure>
            </div>
        </div>
    )
}
export default Textarea;