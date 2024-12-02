import React, { useState } from "react";
import "./App.css"

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn JavaScript", completed: true },
    { id: 2, text: "Learn React", completed: false },
    { id: 3, text: "Have a life!", completed: false },
  ]);
  
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo, completed: false },
      ]);
      setNewTodo(""); // Clear the input field
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleAll = () => {
    const areAllCompleted = todos.every((todo) => todo.completed);
    setTodos(
      todos.map((todo) => ({ ...todo, completed: !areAllCompleted }))
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={addTodo}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            autoFocus
          />
        </form>
      </header>

      <section className="main">
        <input
          className="toggle-all"
          type="checkbox"
          onChange={toggleAll}
          checked={todos.every((todo) => todo.completed)}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? "completed" : ""}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <label>{todo.text}</label>
                <button
                  className="destroy"
                  onClick={() => deleteTodo(todo.id)}
                ></button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          <strong>{todos.filter((todo) => !todo.completed).length}</strong>
          items left
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected">
              All
            </a>
          </li>
          <li>
            <a href="#/">Active</a>
          </li>
          <li>
            <a href="#/">Completed</a>
          </li>
        </ul>

        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>

      <footer className="info">
        <p>Click to edit a todo</p>
        <p>
          Created by <a href="https://d12n.me/">Dmitry Sharabin</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </section>
  );
};

export default App;
