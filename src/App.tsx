import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todoArr, setTodoArr] = useState(['acordar', 'Comer']);
  const [newTodo, setNewTodo] = useState('');
  const [indexTodoToEdit, setIndexTodoToEdit] = useState(-1);

  useEffect(() => {
    const upperCased = todoArr.map((el) => el.charAt(0).toUpperCase() + el.slice(1));
    setTodoArr(upperCased);
  }, [])
  
  const saveNewTodo = () => {
    if(!newTodo) {
      window.alert('You need to type something');
      return;
    }

    const upperCasedTodo = newTodo.charAt(0).toUpperCase() + newTodo.slice(1)

    if(todoArr.includes(upperCasedTodo)) {
      window.alert('You already placed this task!');
      return;
    }

    const newArr = [...todoArr, upperCasedTodo]
    setTodoArr(newArr);
    setNewTodo('');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {        
    if (event.key === 'Enter') {
      saveNewTodo()
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
      prev[indexTodoToEdit] = newTodo;
      return prev;
    })
    setIndexTodoToEdit(-1);
    setNewTodo('');
  };

  const cancel = () => {
    setNewTodo('');
    setIndexTodoToEdit(-1);
  };

  return (
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
          onChange={(event) => setNewTodo(event.target.value) }
        />
        {(indexTodoToEdit !== -1) ? (
          <>
            <button onClick={ editTodo }>SEND EDIT</button>
            <button className='cancel' onClick={ cancel }> CANCEL</button>
          </>
        ):(
          <button onClick={ saveNewTodo }>Add Todo</button>
        )}
      </div>
      <div className='list'>
        <ul>
          {
            todoArr.map((el) => {
              return(
                <div key={el}>
                  <li>{el}</li>
                  <button className='list-delete-button' type='button' onClick={() => deleteTodo(el)}>
                    DELETE
                  </button>
                  <button className='list-edit-button' type='button' onClick={() => startEditingTodo(el)}>
                    EDIT
                  </button>
                </div>
             )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default App
