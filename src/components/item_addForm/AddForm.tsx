import React, {memo, useRef} from 'react';
import { Content } from '../../App';
import styles from './AddForm.module.css';

interface AddFormProps{
    content:Content;
    setContent:(title:Content)=>void;
    addForm:(content:Content, title:string, sub:string)=>void;
};

const AddForm = memo(({content, setContent, addForm}:AddFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const subRef = useRef<HTMLTextAreaElement>(null);

    const renderCase = (content:Content) =>{
        const defaultInput = <textarea ref={subRef} className={styles.input}></textarea>;
        switch(content){
            case "Image":
                return <>
                    <span className={styles.title}>이미지 URL</span>
                    {defaultInput}
                </>
                break;
            case "Video":
                return <>
                    <span className={styles.title}>유튜브 URL</span>
                    {defaultInput}
                </>
                break;
            case "Note":
                return <>
                    <span className={styles.title}>내용</span>
                    <textarea ref={subRef} className={`${styles.input} ${styles.inputNote}`}></textarea>
                </>
                break;
            case "Task":
                return <>
                    <span className={styles.title}>할일 (미완성)</span>
                    {defaultInput}
                </>
                break;
            default:
                throw new Error("올바른 컨텐츠가 아닙니다.");
        }
    }

    const contentCase = () =>{
        switch(content){
            case "Image":
            case "Video":
                return "Description";
                break;
            case "Note":
            case "Task":
                return "Title";
                break;
            default:
                throw new Error("올바른 컨텐츠가 아닙니다.");
        }
    }

    const close = () =>{
        setContent("");
    }

    const onSubmit = (e:React.FormEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent> ) =>{
        e.preventDefault();
        if (!titleRef.current || !subRef.current) {
            return;
        }
        const title = titleRef.current.value;
        let sub = subRef.current.value;
        sub = sub.replace("\r\n","<br>");

        addForm(content, title, sub);
        close();
    }

    return (
        <div className={styles.display}>
            <div className={styles.formBox}>
                <button className={styles.closeBtn} onClick={close}><i className="fas fa-times"></i></button>
                <div className={styles.form}>
                    <div className={styles.formTitle}>
                        <span className={styles.title}>{contentCase()}</span>
                        <input ref={titleRef} className={styles.input} type="text"></input>
                    </div>
                    <div className={styles.formSub}>
                        {renderCase(content)}
                    </div>             
                </div>
                <button className={styles.submitBtn} onClick={onSubmit}>{content} Submit</button>
            </div>    
        </div>
    );
});

export default AddForm;