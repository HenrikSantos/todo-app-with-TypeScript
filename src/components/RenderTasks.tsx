import React, {useContext} from "react";
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
  return(
    <div className='container'>
        <ul className='row'>
          {
            todoArr?.map((el) => {
              return (
                <div key={el}>
                  <li className={'row mt-2'} >
                    <div className={'col-8'}>
                      <input type="checkbox" name={el} id={el} onClick={() => setTodoHasCompleted?.(el)} defaultChecked={completedTodos?.includes(el)} />
                      <label htmlFor={el} className={`${completedTodos?.includes(el) ? 'completed' : ''} ms-2`}>
                        {el}
                      </label>
                    </div>
                    <div className="col-10 row">
                      <button className='list-delete-button col-5' type='button' onClick={() => deleteTodo?.(el)}>
                        DELETE
                      </button>
                      <button className='list-edit-button col-5' disabled={completedTodos?.includes(el)} type='button' onClick={() => startEditingTodo?.(el)}>
                        EDIT
                      </button> 
                      {/* arrumando css */}
                    </div>
                  </li>
                </div>
              )
            })
          }
        </ul>
      </div>
  );
}

export default RenderTasks;
