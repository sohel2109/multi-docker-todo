import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import UpdateTodo from './updateTodo';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const getAllTodos = async () => {
    const allTodos = await axios.get('/api/todos');

    setTodos(allTodos.data);
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <Fragment>
      <table className='table mt-5'>
        <thead>
          <tr>
            <th scope='col'>Description</th>
            <th scope='col' className='text-center'>
              Edit
            </th>
            <th scope='col' className='text-center'>
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td className='text-center'>
                <UpdateTodo todo={todo} />
              </td>
              <td className='text-center'>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default TodoList;
