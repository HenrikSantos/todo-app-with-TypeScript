import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todoArr, setTodoArr] = useState(['acordar', 'Comer']);
  const [completedTodos, setCompletedTodos] = useState(['Acordar']);
  const [newTodo, setNewTodo] = useState('');
  const [indexTodoToEdit, setIndexTodoToEdit] = useState(-1);

  useEffect(() => {
    const upperCased = todoArr.map((el) => el.charAt(0).toUpperCase() + el.slice(1));
    setTodoArr(upperCased);
  }, [])

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
    setTodoArr(newArr);
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
        <div className='list'>
          <ul>
            {
              todoArr.map((el) => {
                return (
                  <>
                    <li className={`${completedTodos.includes(el) ? 'completed' : ''}`} onDoubleClick={() => setTodoHasCompleted(el)}>
                      {el}
                      <button className='list-delete-button' disabled={completedTodos.includes(el)} type='button' onClick={() => deleteTodo(el)}>
                        DELETE
                      </button>
                      <button className='list-edit-button' disabled={completedTodos.includes(el)} type='button' onClick={() => startEditingTodo(el)}>
                        EDIT
                      </button>
                    </li>
                  </>
                )
              })
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
