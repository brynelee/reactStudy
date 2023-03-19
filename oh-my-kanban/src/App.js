/** @jsxImportSource @emotion/react */
import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import KanbanBoard, { COLUMN_KEY_DONE, COLUMN_KEY_ONGOING, COLUMN_KEY_TODO } from './KanbanBoard';

const DATA_STORE_KEY = 'kanban-data-store';

function App() {  

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

  const updaters =  {
    [COLUMN_KEY_TODO]: setTodoList,
    [COLUMN_KEY_ONGOING]: setOngoingList,
    [COLUMN_KEY_DONE]: setDoneList
  };

  //添加新任务提交时的处理，修改todoList数组，关闭Add组件的显示
  const handleAdd = (column, newCard) => {
    updaters[column]((currentStat) => [newCard, ...currentStat]);
  };

  const handleRemove = (column, cardToRemove) => {
    updaters[column]((currentStat) =>
      currentStat.filter((item) => !Object.is(item, cardToRemove))
    );
  }

  return (    
    <div className="App">      
      <header className="App-header">        
        <h1>我的看板<button onClick={handleSaveAll}>保存所有卡片</button></h1>        
        <img src={logo} className="App-logo" alt="logo" />
      </header>      
      <KanbanBoard
        isLoading={isLoading}
        todoList={todoList}
        ongoingList={ongoingList}
        doneList={doneList}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />  
    </div>      
  );    
}

export default App;
