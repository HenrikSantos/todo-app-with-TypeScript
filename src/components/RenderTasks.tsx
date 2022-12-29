import React, { useContext } from "react";
import TodoContext from "../context/TodoContext";

function RenderTasks() {
  const theme = useContext(TodoContext);
  const {
    todoArr,
    completedTodos,
    setTodoHasCompleted,
    deleteTodo,
    startEditingTodo,
  } = theme;
  return (
    <div className='container'>
      <ul className='row envolta'>
        {
          todoArr?.map((el) => {
            return (
              <li className={'row mt-3 justify-content-center'} key={el}>
                <div className={'col-3 set-area'} onClick={() => setTodoHasCompleted?.(el)}>
                  <input className="set-area check" type="checkbox" name={el} id={el} defaultChecked={completedTodos?.includes(el)} />
                  <label htmlFor={el} className={`${completedTodos?.includes(el) ? 'completed' : ''} ms-2`}>
                    {el}
                  </label>
                </div>
                <div className="col-3 row">
                  <button className='list-delete-button col-5' type='button' onClick={() => deleteTodo?.(el)}>
                    DELETE
                  </button>
                  <button className='list-edit-button col-5' disabled={completedTodos?.includes(el)} type='button' onClick={() => startEditingTodo?.(el)}>
                    EDIT
                  </button>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default RenderTasks;
