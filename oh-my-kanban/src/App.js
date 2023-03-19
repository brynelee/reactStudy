/** @jsxImportSource @emotion/react */
import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import KanbanBoard from './KanbanBoard';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';
import KanbanNewCard from './KanbanNewCard';


const COLUMN_BG_COLORS = {
  loading: '#E3E3E3',
  todo: '#C9AF97',
  ongoing: '#FFE799',
  done: '#C0E8BA'
};

const DATA_STORE_KEY = 'kanban-data-store';
const COLUMN_KEY_TODO = 'todo';
const COLUMN_KEY_ONGOING = 'ongoing';
const COLUMN_KEY_DONE = 'done';

function App() {  
  const [showAdd, setShowAdd] = useState(false);
  const [todoList, setTodoList] = useState([
    { title: '开发任务-1', status: '2023-02-25 13:15' },
    { title: '开发任务-3', status: '2023-02-25 18:15' },
    { title: '开发任务-5', status: '2023-02-25 15:15' },
    { title: '测试任务-3', status: '2023-02-25 14:15' }
  ]);
  const [ongoingList, setOngoingList] = useState([
    { title: '开发任务-4', status: '2023-02-25 18:15' },
    { title: '开发任务-6', status: '2023-02-25 18:15' },
    { title: '测试任务-2', status: '2023-02-25 18:15' }
  ]);
  const [doneList, setDoneList] = useState([
    { title: '开发任务-2', status: '2022-12-22 18:15' },
    { title: '测试任务-1', status: '2022-11-22 18:15' }
  ]);
  const [isLoading, setIsLoading] = useState(true);

  //处理启动时数据加载
  useEffect(() => {
    //加载本地存储的数据
    const data = window.localStorage.getItem(DATA_STORE_KEY);
    setTimeout(() => {
      if(data){
        const kanbanColumnData = JSON.parse(data);
        setTodoList(kanbanColumnData.todoList);
        setOngoingList(kanbanColumnData.ongoingList);
        setDoneList(kanbanColumnData.doneList);
      }
      setIsLoading(false);
    }, 1000);

    //useEffect的清理函数
    return () => {
      console.log("useEffect clean up.");
    }
  },[]); /* 依赖值数组为空时，useEffect的清除函数只会在卸载组件时执行 */

  //存储状态数据
  const handleSaveAll = () => {
    const data = JSON.stringify({
      todoList,
      ongoingList,
      doneList
    });
    window.localStorage.setItem(DATA_STORE_KEY, data);
  };

  //处理Add按钮
  const handleAdd = (evt) => {
    setShowAdd(true);
  };

  //添加新任务提交时的处理，修改todoList数组，关闭Add组件的显示
  const handleSubmit = (title) => {
    todoList.unshift( { title, status: new Date().toDateString() });
    setShowAdd(false);
  };

  //记录拖拽过程的状态
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragSource, setDragSource] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);

  //处理拖拽的drop逻辑
  const handleDrop = (evt) => {
    if(!draggedItem || !dragSource || !dragTarget || dragSource === dragTarget){
      return;
    }
    const updaters = {
      [COLUMN_KEY_TODO]: setTodoList,
      [COLUMN_KEY_ONGOING]: setOngoingList,
      [COLUMN_KEY_DONE]: setDoneList
    }
    if (dragSource) {
      updaters[dragSource]((currentStat) => 
        currentStat.filter((item) => !Object.is(item, draggedItem))
      )
    }
    if(dragTarget){
      updaters[dragTarget]((currentStat) => [draggedItem, ...currentStat]);
    }
  }

  return (    
    <div className="App">      
      <header className="App-header">        
        <h1>我的看板<button onClick={handleSaveAll}>保存所有卡片</button></h1>        
        <img src={logo} className="App-logo" alt="logo" />
      </header>      
      <KanbanBoard>
        {isLoading ? (
          <KanbanColumn title="读取中..." bgColor={COLUMN_BG_COLORS.loading} />
        ) : (<>
          <KanbanColumn 
            bgColor={COLUMN_BG_COLORS.todo} 
            title={
            <>
              待处理<button onClick={handleAdd} 
              disabled={showAdd}>&#8853; 添加新卡片</button>
            </>
            }
            setDraggedItem={setDraggedItem}
            setIsDragSource = {(isSrc) => setDragSource(isSrc ? COLUMN_KEY_TODO : null)}
            setIsDragTarget = {(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_TODO : null)}
            onDrop={handleDrop}
            cardList={todoList}
          >
              { showAdd && <KanbanNewCard onSubmit={ handleSubmit } /> }
          </KanbanColumn>
          <KanbanColumn 
            bgColor={COLUMN_BG_COLORS.ongoing} 
            title="进行中"
            setIsDragSource = {(isSrc) => setDragSource(isSrc ? COLUMN_KEY_ONGOING : null)}
            setIsDragTarget = {(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_ONGOING : null)}
            onDrop={handleDrop}
          >
              {ongoingList.map(props => (
                <KanbanCard 
                key={props.title} 
                onDragStart = {() => setDraggedItem(props)}
                {...props}
                />))}
          </KanbanColumn>        
          <KanbanColumn 
            bgColor={COLUMN_BG_COLORS.done} 
            title="已完成"
            setIsDragSource = {(isSrc) => setDragSource(isSrc ? COLUMN_KEY_DONE : null)}
            setIsDragTarget = {(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_DONE : null)}
            onDrop={handleDrop}
          >
              { doneList.map(props => (
                  <KanbanCard 
                  key={props.title} 
                  onDragStart = {() => setDraggedItem(props)}
                  {...props}
                  />))}
          </KanbanColumn>  
        </>)}
      </KanbanBoard>  
    </div>      
  );    
}

export default App;
