import React from 'react';
import './App.css';
import Input from './components/Input';
import TodoProvider from './context/TodoProvider';

function App() {
  return (
    <TodoProvider>
      <Input />
    </TodoProvider>
  );
}
export default App;
