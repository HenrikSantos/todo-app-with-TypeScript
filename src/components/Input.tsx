import React, { useEffect, useContext } from 'react';
import RenderTasks from './RenderTasks';
import TodoContext from "../context/TodoContext";

function Input() {
  const theme = useContext(TodoContext);
  const {
    todoArr,
    completedTodos,
    setTodoArr,
    setCompletedTodos,
    handleKeyPress,
    newTodo,
    indexTodoToEdit,
    editTodo,
    cancel,
    saveNewTodo,
    setNewTodo,
  } = theme;

  useEffect(() => {
    const tasks = localStorage.getItem('todoArr') || '[]';
    const completedTasks = localStorage.getItem('completedTodos') || '[]';
    if (JSON.parse(tasks)?.length > 0) setTodoArr?.(JSON.parse(tasks));
    if (JSON.parse(completedTasks)?.length > 0) setCompletedTodos?.(JSON.parse(completedTasks));
  }, []);

  useEffect(() => {
    if (todoArr) localStorage.setItem('todoArr', JSON.stringify(todoArr));
  }, [todoArr]);

  useEffect(() => {
    if (completedTodos) localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  }, [completedTodos]);

  // useEffect(() => {
  //   if (todoArr.length > 0) localStorage.setItem('todoArr', JSON.stringify(todoArr));
  // }, [todoArr]);

  // useEffect(() => {
  //   if (completedTodos.length > 0) localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  // }, [completedTodos]);

  return (
    <>
      <div className="App">
        <h1>Todo App!</h1>
        <div>
          <input
            className='todo-input'
            type="text"
            onKeyDown={handleKeyPress}
            name="newTodo"
            id="newTodo"
            value={newTodo}
            placeholder='Type a task'
            autoComplete="off"
            onChange={(event) => setNewTodo?.(event.target.value)}
          />
          {(indexTodoToEdit !== -1) ? (
            <>
              <button onClick={editTodo}>SEND EDIT</button>
              <button className='cancel' onClick={cancel}> CANCEL</button>
            </>
          ) : (
            <button onClick={saveNewTodo}>Add Todo</button>
          )}
        </div>
      </div>
      <RenderTasks />
    </>
  )
}

export default Input;
