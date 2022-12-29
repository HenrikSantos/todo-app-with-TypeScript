import React, { useState, ReactNode } from 'react';
import TodoContext from './TodoContext';

interface IProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: IProps) {
  const [todoArr, setTodoArr] = useState<Array<string>>([]);
  const [completedTodos, setCompletedTodos] = useState<Array<string>>([]);
  const [newTodo, setNewTodo] = useState('');
  const [indexTodoToEdit, setIndexTodoToEdit] = useState(-1);

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

  const setTodoHasCompleted = (taskName: string) => {
    if (completedTodos.includes(taskName)) {
      setCompletedTodos((prev) => prev.filter((el) => el !== taskName));
      return;
    }
    setCompletedTodos((prev) => [...prev, taskName]);
  };

  const deleteTodo = (todoToDelete: string) => {
    setTodoArr((prev) => prev.filter((el) => el !== todoToDelete));
  };

  const editTodo = () => {
    setTodoArr((prev) => {
      prev[indexTodoToEdit] = newTodo.charAt(0).toUpperCase() + newTodo.slice(1);
      return prev;
    })
    setIndexTodoToEdit(-1);
    setNewTodo('');
  };

  const startEditingTodo = (todoToEdit: string) => {
    setIndexTodoToEdit(todoArr.indexOf(todoToEdit));
    setNewTodo(todoToEdit);
  };

  const cancel = () => {
    setNewTodo('');
    setIndexTodoToEdit(-1);
  };

  return (
    <TodoContext.Provider value={{
      todoArr,
      completedTodos,
      newTodo,
      indexTodoToEdit,
      setTodoArr,
      setCompletedTodos,
      setTodoHasCompleted,
      deleteTodo,
      startEditingTodo,
      handleKeyPress,
      editTodo,
      cancel,
      saveNewTodo,
      setNewTodo
    }}>
      {children}
    </TodoContext.Provider>
  );
}
