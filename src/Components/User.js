import React from "react";
import Items from "./Items";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
    };
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  handleClick(event) {
    let user = {
      name: this.state.name,
      email: this.state.email,
    };
    fetch("http://localhost:5000/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.affectedRows > 0) {
          console.log("added items");
        }
      });
    this.setState({ name: "", email: "" });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="enter name"
            id="name"
            name="name"
            onChange={this.handleChange.bind(this)}
            value={this.state.name || null}
          />
          <input
            type="email"
            placeholder="enter email"
            id="email"
            name="email"
            onChange={this.handleChange.bind(this)}
            value={this.state.email || null}
          />
          <button onClick={this.handleClick.bind(this)}>Submit</button>
        </form>

        <Items></Items>
      </div>
    );
  }
}

export default User;
