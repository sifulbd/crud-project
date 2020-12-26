import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import uuid from "react-uuid";

import "./App.css";
import { Form, Button, Container, ListGroup } from "react-bootstrap";
import AddTodo from "./Components/AddTodo/AddTodo";
import SearchTodo from "./Components/SearchTodo/SearchTodo";
import TodoList from "./Components/TodoList/TodoList";
import User from "./Components/User";
function App() {
  const [newTodo, setnewToDo] = useState([
    {
      text: "",
      completed: false,
    },
  ]);

  const [success, setSuccess] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((response) => response.json())
      .then((data) => setTodoItems(data));
  }, []);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setnewToDo({ text: newValue, completed: false });
    e.preventDefault();
  };
  const handleAddClick = (e) => {
    if (newTodo.text !== "") {
      setTodoItems((prevValue) => {
        return [...prevValue, newTodo];
      });
    }
    fetch("http://localhost:5000/addtodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.affectedRows > 0) {
        }
      });
    setnewToDo({ text: "" });
    e.preventDefault();
  };

  const handleDeleteClick = (idx) => {
    const url = `http://localhost:5000/delete/${idx}`;
    fetch(url, {
      method: "DELETE",
      body: idx,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.affectedRows > 0) {
        }
      });
    setTodoItems((previousItem) => {
      const reamingingItem = previousItem.filter((item) => {
        return idx !== item.id;
      });
      return reamingingItem;
    });
  };

  const handleDoneClick = (idx) => {
    const reamingingItem = todoItems.map((item) => {
      if (idx === item.id) {
        item.completed = !item.completed;
      }
    });
    setTodoItems(todoItems);
    console.log(todoItems);
  };

  return (
    <Container>
      <h3 className="mt-50">Smart Todo</h3>

      <AddTodo
        newTodo={newTodo}
        handleAddClick={handleAddClick}
        handleChange={handleChange}
      ></AddTodo>

      <SearchTodo></SearchTodo>

      <TodoList
        todoItems={todoItems}
        handleDeleteClick={handleDeleteClick}
        handleDoneClick={handleDoneClick}
      ></TodoList>

      <h3>Total Users</h3>
      <User></User>
    </Container>
  );
}

export default App;
