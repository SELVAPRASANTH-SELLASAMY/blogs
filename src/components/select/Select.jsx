import selectStyle from './select.module.css';
import { EditorContext } from '../editor/Editor';
import { useContext, useEffect, useRef } from 'react';
function Select({blog,index}){
    const {addBlogs} = useContext(EditorContext);
    const text_type = useRef();
    useEffect(()=>{
        const options = text_type.current.querySelectorAll('li');
        let activeOption = options[2];
        options.forEach(option => {
            option.onclick = (e) => {
                addBlogs(prevBlogs => {
                    prevBlogs[index].type = e.target.getAttribute('value');
                    return [...prevBlogs];
                });
                activeOption.classList.remove(selectStyle.active);
                activeOption = option;
                activeOption.classList.add(selectStyle.active);
            }
            return () => option.onclick = null;
        });
    },[addBlogs,index]);
    return(
        <div className={selectStyle.select}>
            <input value={blog.type.replace("_"," ")} className={selectStyle.input} readOnly type="text" id='text-type' name='text-type'/>
            <ul ref={text_type} className={selectStyle.options}>
                <li value="heading">Heading</li>
                <li value="sub_heading">Sub heading</li>
                <li className={selectStyle.active} value="paragraph">Paragraph</li>
                <li value="tech_stacks">Tech stacks</li>
                <li value="description_list">Description list</li>
                <li value="image">Image</li>
            </ul>
        </div>
    );
}
export default Select;