import React, { Fragment } from 'react';
import './App.css';

// Components
import AddTodo from './components/addTodo';
import TodoList from './components/todoList';

function App() {
  return (
    <Fragment>
      <div className='container'>
        <AddTodo />
        <TodoList />
      </div>
    </Fragment>
  );
}

export default App;
