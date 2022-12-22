import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todoArr, setTodoArr] = useState(['acordar', 'Comer']);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const upperCased = todoArr.map((el) => el.charAt(0).toUpperCase() + el.slice(1));
    setTodoArr(upperCased);
  }, [])
  

  const saveNewTodo = () => {
    if(!newTodo) {
      window.alert("Inválido");
      return;
    }
    const upperCased = todoArr.map((el) => el.charAt(0).toUpperCase() + el.slice(1));
    const newArr = [...upperCased, newTodo.charAt(0).toUpperCase() + newTodo.slice(1)]
    setTodoArr(newArr);
    setNewTodo('');
  };

  return (
    <div className="App">
      <h1>Todo App!</h1>
      <div>
        <input type="text" name="newTodo" id="newTodo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={ saveNewTodo }>Adicionar Tarefa</button>
      </div>
      <div className='list'>
        <ul>
          {todoArr.map((el) => <li>{el}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default App
