const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

let todos = [];

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Get all todos
app.get("/api/todos", (req, res) => {
  console.log("Received GET request for /todos");
  res.json(todos);
});

// Get a specific todo
app.get("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id === parseInt(id));
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  res.json(todo);
});

// Create a new todo
app.post("/api/todos", (req, res) => {
  const { task, status, important, createdAt } = req.body;
  const newTodo = {
    id: todos.length + 1,
    task,
    status,
    important,
    createdAt,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo
app.put("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const { task, status, priority, categories } = req.body;
  todos[todoIndex].task = task;
  todos[todoIndex].status = status;
  todos[todoIndex].priority = priority;
  todos[todoIndex].categories = categories;

  res.json(todos[todoIndex]);
});

// Delete a todo
app.delete("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  todos = todos.filter((todo) => todo.id !== parseInt(id));
  res.json({ message: "Todo deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
