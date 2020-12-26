import React from "react";
import { Form, Button, Container, ListGroup } from "react-bootstrap";

const SearchTodo = () => {
  return (
    <>
      <h6>All Todos: </h6>
      <Form className="search-form">
        <Form.Group controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Search Todos" />
        </Form.Group>

        <Button variant="light" type="submit">
          Find To do
        </Button>
      </Form>
    </>
  );
};

export default SearchTodo;
