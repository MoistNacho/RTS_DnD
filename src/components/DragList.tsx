import React from 'react';
import styles from './DragList.module.css';
import {Content, Items} from '../App';
import Item from './item/Item';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

interface DragListProp {
    items:Items[];
    setItems:(items:Items[])=>void;
}

const DragList = ({items, setItems}:DragListProp) => {
    const handleDragEnd = (result:DropResult) => {
        if(!result.destination){
            return;
        }
        const _items = Array.from(items);
        const [reorderedItem] = _items.splice(result.source.index, 1);
     
        _items.splice(result.destination.index, 0, reorderedItem);
        setItems(_items);
    }
    return(
        <div className={styles.box}>
            <DragDropContext onDragEnd={result => handleDragEnd(result)}>
                <Droppable droppableId="droppable">
                    {(provided)=>(
                        <ul className={styles.list} {...provided.droppableProps} ref={provided.innerRef}>
                        {
                            items.map((item, index) => {
                                return (
                                    <Item 
                                            key={item.id}
                                            dragId={item.id}
                                            index={index}
                                            content={item.state as Content} 
                                            title={item.title} 
                                            sub={item.sub}
                                    />
                                );
                            })
                        }
                        {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
                
            </DragDropContext>
        </div>
    );
};

export default DragList;