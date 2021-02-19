import React, { useState } from 'react';
import Header from './components/Header';
import styles from './App.module.css';
import DragList from './components/DragList';
import AddForm from './components/item_addForm/AddForm';


export type Content = "Image" | "Video" | "Note" | "Task" | "";
export type Items = {
  id:number;
  state:string;
  title:string;
  sub:string;
} 

function App() {
  const [content, setContent] = useState<Content>();
  const [items, setItems] = useState<Items[]>([]);

  const addForm = (content:Content, title:string, sub:string) =>{
    const formData = items;
    formData.push({
      id:Date.now(),
      state:content,
      title,
      sub}
    );

    setItems(formData);
  }

  return (
    <div className={styles.motion}>
      <Header setContent={setContent} />
      <DragList items={items} setItems={setItems} />
      {
        content && <AddForm content={content} setContent={setContent} addForm={addForm}/>
      }
    </div>
  );
}

export default App;
