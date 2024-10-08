import textareaStyles from './textarea.module.css';
import { EditorContext } from '../editor/Editor';
import { useContext } from 'react';
import { RiDeleteBin5Line } from "react-icons/ri";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import Select from '../select/Select';
import ImageResizer from 'react-image-file-resizer';
function Textarea({blog,index,length}){
    const {addBlogs,startEdit} = useContext(EditorContext);
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
    const handleImageUpload = async(e) => {
        const file = e.target.files[0];
        const placeholderImage = await resizeImage(file);
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            const base64String = fileReader.result;
            addBlogs(prevBlogs => {
                prevBlogs[index].Image = base64String;
                prevBlogs[index].PlaceholderImage = placeholderImage;
                return [...prevBlogs];
            });
        }
        fileReader.readAsDataURL(file);
    }
    const resizeImage = (image) => {
        return new Promise((resolve) => {
            ImageResizer.imageFileResizer(
                image,
                "auto",
                20,
                "webp",
                100,
                0,
                (resizedImage) => resolve(resizedImage),
                "base64"
            );
        });
    }
    const handleMove = (direction) => {
        addBlogs(prevBlogs => {
            [prevBlogs[index],prevBlogs[direction === "up" ? index - 1 : index + 1]] = [prevBlogs[direction === "up" ? index - 1 : index + 1],prevBlogs[index]];
            return [...prevBlogs];
        });
        startEdit(prev => direction === "up" ? --prev : ++prev);
    }
    return(
        <div className={textareaStyles.textArea}>
            {blog.type !== "image" ? 
            <textarea onChange={(e)=>handleChange(e)} value={blog.content} name="textarea" id="textarea" placeholder='Start typing here...'></textarea> :
            <input onChange={(e)=>handleImageUpload(e)} type="file" accept='image/*' name='image' id='image'/>
            }
            <div className={textareaStyles.toolbar}>
                <Select blog={blog} index={index}/>
                <span aria-disabled={index >= 1 ? false : true} onClick={index >= 1 ? handleDelete : null}>
                    <RiDeleteBin5Line/>
                </span>
                <span aria-disabled={index >= 1 ? false : true} onClick={index >= 1 ? ()=>handleMove("up") : null}>
                    <GoTriangleUp/>
                </span>
                <span aria-disabled={index < (length - 1) ? false : true} onClick={index < (length - 1) ? ()=>handleMove("down") : null}>
                    <GoTriangleDown/>
                </span>
            </div>
        </div>
    )
}
export default Textarea;