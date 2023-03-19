/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import KanbanColumn from './KanbanColumn';

const KanbanBoardStyles = css`
    flex: 10;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin: 0 1rem 1rem;
    `;

const COLUMN_BG_COLORS = {
  loading: '#E3E3E3',
  todo: '#C9AF97',
  ongoing: '#FFE799',
  done: '#C0E8BA'
};

export const COLUMN_KEY_TODO = 'todo';
export const COLUMN_KEY_ONGOING = 'ongoing';
export const COLUMN_KEY_DONE = 'done';
    
export default function KanbanBoard({ 
  isLoading = true,
  todoList,
  ongoingList,
  doneList,
  onAdd,
  onRemove
 }) {

    //记录拖拽过程的状态
    const [draggedItem, setDraggedItem] = useState(null);
    const [dragSource, setDragSource] = useState(null);
    const [dragTarget, setDragTarget] = useState(null);

  //处理拖拽的drop逻辑
  const handleDrop = (evt) => {
    if(!draggedItem || !dragSource || !dragTarget || dragSource === dragTarget){
      return;
    }
    dragSource && onRemove(dragSource, draggedItem);
    dragTarget && onAdd(dragTarget, draggedItem);
  }

  return (
    <main css={KanbanBoardStyles}>
      {isLoading ? (
          <KanbanColumn title="读取中..." bgColor={COLUMN_BG_COLORS.loading} />
        ) : (<>
          <KanbanColumn 
            bgColor={COLUMN_BG_COLORS.todo} 
            canAddNew
            title="待处理"
            setDraggedItem={setDraggedItem}
            setIsDragSource = {(isSrc) => setDragSource(isSrc ? COLUMN_KEY_TODO : null)}
            setIsDragTarget = {(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_TODO : null)}
            onAdd={onAdd.bind(null, COLUMN_KEY_TODO)}
            onDrop={handleDrop}
            cardList={todoList}
          />
          <KanbanColumn 
            bgColor={COLUMN_BG_COLORS.ongoing} 
            title="进行中"
            setDraggedItem={setDraggedItem}
            setIsDragSource = {(isSrc) => setDragSource(isSrc ? COLUMN_KEY_ONGOING : null)}
            setIsDragTarget = {(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_ONGOING : null)}
            onDrop={handleDrop}
            cardList={ongoingList}

          />
          <KanbanColumn 
            bgColor={COLUMN_BG_COLORS.done} 
            title="已完成"
            setDraggedItem={setDraggedItem}
            setIsDragSource = {(isSrc) => setDragSource(isSrc ? COLUMN_KEY_DONE : null)}
            setIsDragTarget = {(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_DONE : null)}
            onDrop={handleDrop}
            cardList={doneList}
          />  
        </>)}
    </main>
  );
}
