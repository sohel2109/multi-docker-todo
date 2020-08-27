import React, { Fragment, useState } from 'react';
import axios from 'axios';

const UpdateTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  const submitUpdatedTodo = async (e) => {
    e.preventDefault();
    try {
      const req = { description };
      await axios.put(`/api/todos/${todo.todo_id}`, {
        description: req,
      });

      window.location = '/';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <button
        className='btn btn-warning'
        data-toggle='modal'
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      <div
        className='modal fade'
        id={`id${todo.todo_id}`}
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
        onClick={() => setDescription(todo.description)}
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Update Todo
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
                onClick={() => setDescription(todo.description)}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <input
                type='text'
                className='form-control'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-warning'
                data-dismiss='modal'
                onClick={(e) => submitUpdatedTodo(e)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateTodo;
