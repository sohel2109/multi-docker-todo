import React, { Fragment, useState } from 'react';
import axios from 'axios';

const AddTodo = () => {
  const [description, setDescription] = useState('');

  const submitTodo = async (e) => {
    e.preventDefault();
    try {
      const req = { description };

      await axios.post('/api/todos', {
        description: req,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Max-Age': 600,
        },
      });

      window.location = '/';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <h1 className='text-center mt-5'>Todo App</h1>
      <form className='d-flex mt-5' onSubmit={submitTodo}>
        <input
          type='text'
          className='form-control'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className='btn btn-success'>Add</button>
      </form>
    </Fragment>
  );
};

export default AddTodo;
