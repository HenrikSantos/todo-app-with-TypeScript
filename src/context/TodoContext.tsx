import React, { createContext } from 'react';

interface MyContext {
  todoArr?: Array<string>
  completedTodos?: Array<string>
  newTodo?: string
  indexTodoToEdit?: number
  setTodoArr?: (el: Array<string>) => void
  setCompletedTodos?: (el: Array<string>) => void
  setTodoHasCompleted?: (el: string) => void
  deleteTodo?: (el: string) => void
  startEditingTodo?: (el: string) => void
  handleKeyPress?: (key : React.KeyboardEvent) => void
  editTodo?: () => void
  cancel?: () => void
  saveNewTodo?: () => void
  setNewTodo?: (el: string) => void
}

const TodoContext = createContext<MyContext>({});

export default TodoContext;