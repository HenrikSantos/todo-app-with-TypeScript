import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todoArr, setTodoArr] = useState<Array<string>>([]);
  const [completedTodos, setCompletedTodos] = useState<Array<string>>([]);
  const [newTodo, setNewTodo] = useState('');
  const [indexTodoToEdit, setIndexTodoToEdit] = useState(-1);

  useEffect(() => {
    const tasks = localStorage.getItem('todoArr') || '[]';
    const completedTasks = localStorage.getItem('completedTodos') || '[]';
    if (JSON.parse(tasks)?.length > 0) setTodoArr(JSON.parse(tasks));
    if (JSON.parse(completedTasks)?.length > 0) setCompletedTodos(JSON.parse(completedTasks));
  }, []);

  useEffect(() => {
    if (todoArr.length > 0) localStorage.setItem('todoArr', JSON.stringify(todoArr));
  }, [todoArr]);

  useEffect(() => {
    if (completedTodos.length > 0) localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  }, [completedTodos]);

  const saveNewTodo = () => {
    if (!newTodo) {
      window.alert('You need to type something');
      return;
    }

    const upperCasedTodo = newTodo.charAt(0).toUpperCase() + newTodo.slice(1)

    if (todoArr.includes(upperCasedTodo)) {
      window.alert('You already placed this task!');
      return;
    }

    const newArr = [...todoArr, upperCasedTodo]
    setTodoArr(() => newArr);
    setNewTodo('');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (!(event.key === 'Enter')) return;
    if (indexTodoToEdit === -1) {
      saveNewTodo()
    }
    if (indexTodoToEdit !== -1) {
      editTodo()
    }
  }

  const deleteTodo = (todoToDelete: string) => {
    setTodoArr((prev) => prev.filter((el) => el !== todoToDelete));
  };

  const startEditingTodo = (todoToEdit: string) => {
    setIndexTodoToEdit(todoArr.indexOf(todoToEdit));
    setNewTodo(todoToEdit);
  };

  const editTodo = () => {
    setTodoArr((prev) => {
      prev[indexTodoToEdit] = newTodo.charAt(0).toUpperCase() + newTodo.slice(1);
      return prev;
    })
    setIndexTodoToEdit(-1);
    setNewTodo('');
  };

  const cancel = () => {
    setNewTodo('');
    setIndexTodoToEdit(-1);
  };

  const setTodoHasCompleted = (taskName: string) => {
    if (completedTodos.includes(taskName)) {
      setCompletedTodos((prev) => prev.filter((el) => el !== taskName));
      return;
    }
    setCompletedTodos((prev) => [...prev, taskName]);
  };

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
            onChange={(event) => setNewTodo(event.target.value)}
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
      <div className='container'>
        <ul className='row'>
          {
            todoArr.map((el) => {
              return (
                <>
                  <li className={'row mt-2'} >
                    <div className={'col-8'}>
                      <input type="checkbox" name={el} id={el} onClick={() => setTodoHasCompleted(el)} checked={completedTodos.includes(el)} />
                      <label htmlFor={el} className={`${completedTodos.includes(el) ? 'completed' : ''} ms-2`}>
                        {el}
                      </label>
                    </div>
                    <div className="col-10 row">
                      <button className='list-delete-button col-5' type='button' onClick={() => deleteTodo(el)}>
                        DELETE
                      </button>
                      <button className='list-edit-button col-5' disabled={completedTodos.includes(el)} type='button' onClick={() => startEditingTodo(el)}>
                        EDIT
                      </button> 
                      {/* arrumando css */}
                    </div>
                  </li>
                </>
              )
            })
          }
        </ul>
      </div>
    </>
  )
}

export default App
