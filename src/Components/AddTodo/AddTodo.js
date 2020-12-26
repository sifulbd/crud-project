import React, { useState } from "react";
import { Form, Button, Container, ListGroup } from "react-bootstrap";

const AddTodo = ({ handleChange, handleAddClick, newTodo }) => {
  return (
    <>
      <Form className="addForm">
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter Todo Text"
            onChange={handleChange}
            value={newTodo.text || ""}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleAddClick}>
          Add To Do
        </Button>
      </Form>
    </>
  );
};

export default AddTodo;
