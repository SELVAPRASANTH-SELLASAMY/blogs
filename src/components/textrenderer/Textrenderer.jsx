import textrendererStyle from './textrenderer.module.css';
import { EditorContext } from '../editor/Editor';
import { useContext } from 'react';
import Lazyimage from '../lazyimage/Lazyimage';
function Textrenderer({blog,index}){
    const {startEdit} = useContext(EditorContext);
    const handleClick = () => {
        startEdit(index);
    }
    return(
        <div onClick={handleClick} className={textrendererStyle.text_renderer}>
            {blog.type === 'heading' && <h2>{blog.content} <span className="bottomLine"><span className="movingBall"></span></span></h2>}
            {blog.type === 'sub_heading' && <h5>{blog.content}</h5>}
            {blog.type === 'paragraph' && <p>{blog.content}</p>}
            {blog.type === 'image' && 
                (blog.Image && blog.thumb) && <Lazyimage componentClass={textrendererStyle.img} placeholder={blog.thumb} source={blog.Image}/>
            }
            {(blog.type === 'description_list' || blog.type === 'tech_stacks') &&
                <ul className={blog.type === 'tech_stacks' ? textrendererStyle.tech_stacks : null}>
                    {
                        blog.content.split("\n").map((text,index)=>(
                            <li key={index}>{text}</li>
                        ))
                    }
                </ul>
            }
        </div>
    );
}
export default Textrenderer;