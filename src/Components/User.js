import React from "react";
import Items from "./Items";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mobile: [{ phone: "" }],
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

  handleInputChange = (i, e) => {
    const mobile = [...this.state.mobile];
    const { name, value } = e.target;
    mobile[i][name] = value;
    this.setState({ mobile });
  };

  addPhone = (e) => {
    this.setState((prevState) => ({
      mobile: [...prevState.mobile, { phone: "" }],
    }));
    e.preventDefault();
  };

  handleClick(event) {
    let user = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.mobile[0].phone,
    };

    console.log(this.state);
    console.log(this.state);
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
    event.preventDefault();
  }

  render() {
    let { mobile } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="enter name"
            id="name"
            className="nform"
            name="name"
            onChange={this.handleChange.bind(this)}
            value={this.state.name || null}
          />
          <input
            type="email"
            placeholder="enter email"
            id="email"
            className="nform"
            name="email"
            onChange={this.handleChange.bind(this)}
            value={this.state.email || null}
          />
          {mobile.map((field, id) => {
            return (
              <div key={id}>
                <input
                  type="text"
                  className="nform"
                  name="phone"
                  id="phone"
                  value={this.val}
                  onChange={(e) => this.handleInputChange(id, e)}
                  placeholder="Enter your Phone"
                />
              </div>
            );
          })}
          <button onClick={this.addPhone}>Add phone</button>
          <br /> <br />
          <button onClick={this.handleClick.bind(this)}>Submit</button>
        </form>

        <Items></Items>
      </div>
    );
  }
}

export default User;
