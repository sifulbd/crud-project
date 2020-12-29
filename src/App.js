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
    if (newTodo.text === "") {
      alert("fields is empty");
      return;
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
          setTodoItems((prevValue) => {
            return [...prevValue, newTodo];
          });
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
          setTodoItems((previousItem) => {
            const reamingingItem = previousItem.filter((item) => {
              return idx !== item.id;
            });
            return reamingingItem;
          });
        }
      });
  };

  const handleDoneClick = (idx) => {
    const findItem = todoItems.find((item) => item.id === idx);
    console.log(findItem);
    findItem.completed = !findItem.completed;

    let newArr = [...todoItems]; // copying the old datas array
    newArr[index] = e.target.value; // replace e.target.value with whatever you want to change it to

    setDatas(newArr); // ??

    // const updatedItem = todoItems.filter((item) => {
    //   if (item.id === idx) {
    //     item.completed = !item.completed;
    //     // const url = `http://127.0.0.1:5000/update/${idx}`;
    //     // fetch(url, {
    //     //   method: "PUT",
    //     //   headers: {
    //     //     "Content-Type": "application/json",
    //     //   },
    //     //   body: JSON.stringify(item),
    //     // })
    //     //   .then((res) => res.json())
    //     //   .then((data) => {
    //     //     if (data.changedRows > 0) {

    //     //     }
    //     //   })
    //     //   .catch((err) => {
    //     //     console.log(err);
    //     //   });
    //   }
    //   return item;
    // });

    // setTodoItems(updatedItem);
  };

  const a = {
    name: "Saiful",
    address: {
      city: "",
      country: "",
      mobile: [],
      contacts: [
        {
          name: "Aminul",
          relation: "",
        },
      ],
    },
  };

  const b = { ...a };

  b.name = "Islam";

  console.log(a);
  console.log(b);

  let b = a;
  b.name = "Aminul";

  console.log(a);

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
