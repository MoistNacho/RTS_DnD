import React, { memo } from 'react';
import { Content } from '../../App';
import styles from './Item.module.css';
import { Draggable } from "react-beautiful-dnd";

interface ItemProp {
    content:Content;
    title:string;
    sub:string;
    index:number;
    dragId:number;
}

const Item = memo(({content, title, sub, index, dragId}:ItemProp) => {
    
    const renderCase = (content:Content) =>{
        switch(content){
            case "Image":
                return <>
                    <div className={styles.itemSub}>
                        <img className={styles.frame} src={sub} onError={e =>{
                            if(!(e.target instanceof HTMLImageElement)){
                                return;
                            }
                            e.target.src = "https://picsum.photos/720/480"
                        }} alt="image"/>
                    </div>
                    <div className={styles.itemTitle}>
                        <span className={styles.title}>{content} <i className="fas fa-layer-group"></i></span>
                        <p className={styles.titleDes}>{title}</p>
                    </div>
                </>
                break;
            case "Video":
                return <>
                    <div className={styles.itemSub}>
                        <iframe className={styles.frame} src={
                            sub.includes("https://")?
                            videoReplace(sub):"https://www.youtube.com/embed/_jQZZCaoO1w"
                            } 
                            frameBorder="0" 
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className={styles.itemTitle}>
                        <span className={styles.title}>{content} <i className="fas fa-layer-group"></i></span>
                        <p className={styles.titleDes}>{title}</p>
                    </div>
                </>
                break;
            case "Note":
            case "Task":
                return <div className={styles.default}>
                    <div className={styles.itemTitle}>
                        <span className={styles.title}>{content} <i className="fas fa-layer-group"></i></span>
                        <p className={styles.titleDes}>{title}</p>
                    </div>
                    <div className={styles.itemSub}>
                        
                        <p className={styles.subDes}>{contentCase(content)}{sub}</p>
                    </div> 
                </div>
                break;
            default:
                throw new Error("올바른 컨텐츠가 아닙니다.");
        }
    }

    const contentCase = (content:Content) =>{
        if(!(content === "Task")){
            return;
        }
        return <i className={`${styles.task} fas fa-play`}></i>;
    }

    const videoReplace = (sub:string) =>{
        if(sub.includes("https://www.youtube.com/embed/")){
            return sub;
        }
        const url = sub.replace("https://youtu.be/", "https://www.youtube.com/embed/");

        return url;
    }
    return (
        <Draggable key={title} draggableId={dragId.toString()} index={index}> 
            {(provided)=>(
                <li className={styles.item} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {renderCase(content)}
                </li>
            )}
        </Draggable>
    );
});

export default Item;