// index.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

let todos = [];

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Get all todos
app.get("/todos", (req, res) => {
  console.log("Received GET request for /todos");
  res.json(todos);
});

// Get a specific todo
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id === parseInt(id));
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  res.json(todo);
});

// Create a new todo
app.post("/todos", (req, res) => {
  const { title } = req.body;
  const newTodo = {
    id: todos.length + 1,
    title,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo
app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const { title } = req.body;
  todos[todoIndex].title = title;
  res.json(todos[todoIndex]);
});

// Delete a todo
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  todos = todos.filter((todo) => todo.id !== parseInt(id));
  res.json({ message: "Todo deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
