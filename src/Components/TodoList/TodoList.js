import React from "react";
import { Form, Button, Container, ListGroup } from "react-bootstrap";

const TodoList = ({ handleDeleteClick, todoItems, handleDoneClick }) => {
  return (
    <div className="todo-list">
      <ListGroup variant="flush">
        {todoItems
          ? todoItems.map((todoitem, index) => (
              <ListGroup.Item variant="no-style" id={todoitem.id} key={index}>
                {todoitem.completed ? (
                  <b className="done">{todoitem.text}</b>
                ) : (
                  <b>{todoitem.text}</b>
                )}

                <span>
                  <Button
                    onClick={(id) =>
                      handleDoneClick(
                        parseInt(id.target.parentElement.parentElement.id)
                      )
                    }
                    variant="success"
                  >
                    {todoitem.completed ? "Undone" : "Done"}
                  </Button>
                  <Button
                    onClick={(id) =>
                      handleDeleteClick(
                        parseInt(id.target.parentElement.parentElement.id)
                      )
                    }
                    variant="danger"
                  >
                    Delete
                  </Button>
                </span>
              </ListGroup.Item>
            ))
          : "No Items found!!"}
      </ListGroup>
    </div>
  );
};

export default TodoList;
