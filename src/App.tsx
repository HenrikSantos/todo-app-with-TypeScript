import { useState, useEffect } from 'react';
import './App.css';

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

  const handleKeyPress = (event: React.KeyboardEvent) => {
    console.log(typeof(event));
        
    if (event.key === 'Enter') {
      saveNewTodo()
    }
  }

  return (
    <div className="App">
      <h1>Todo App!</h1>
      <div>
        <input
          type="text"
          onKeyDown={handleKeyPress}
          name="newTodo"
          id="newTodo"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value) }
        />
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
