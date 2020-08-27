const dbKeys = require('./db');

const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');

// Middleware
app.use(cors());
app.use(express.json());

const pgClient = new Pool({
  user: dbKeys.dbUser,
  host: dbKeys.dbHost,
  database: dbKeys.dbName,
  password: dbKeys.dbPassword,
  port: dbKeys.dbPort,
});

// Create database table
pgClient.on('connect', () => {
  pgClient
    .query(
      'CREATE TABLE IF NOT EXISTS todos (todo_id SERIAL PRIMARY KEY, description VARCHAR(255))'
    )
    .catch((err) => console.log(err));
});

/** ---- Routes ---- **/
// Create a todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body.description;

    const newTodo = await pgClient.query(
      'INSERT INTO todos (description) VALUES($1) RETURNING *',
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pgClient.query('SELECT * FROM todos');

    res.json(allTodos.rows);
  } catch (error) {
    console.log(error);
  }
});

// Get a todo
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pgClient.query(
      'SELECT * FROM todos WHERE todo_id = $1 ORDER BY todo_id DESC',
      [id]
    );

    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

// Update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body.description;

    pgClient.query('UPDATE todos SET description = $1 WHERE todo_id = $2', [
      description,
      id,
    ]);

    res.json('Todo has been updated.');
  } catch (error) {
    console.log(error);
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    pgClient.query('DELETE FROM todos WHERE todo_id = $1', [id]);

    res.json('Todo has been deleted.');
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
