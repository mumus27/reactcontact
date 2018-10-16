import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/textInputGroup";
import axios from "axios";
class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  onChangeHandler = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onSubmitHandler = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    if (name === "") {
      this.setState({
        errors: {
          name: "name is required"
        }
      });
      return;
    }
    if (email === "") {
      this.setState({
        errors: {
          email: "email is required"
        }
      });
      return;
    }
    if (phone === "") {
      this.setState({
        errors: {
          phone: "phone is required"
        }
      });
      return;
    }
    const newContact = {
      name,
      phone,
      email
    };
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );
    dispatch({ type: "ADD_CONTACT", payload: res.data });
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });
    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-4">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmitHandler.bind(this, dispatch)}>
                  <TextInputGroup
                    name="name"
                    label="Name"
                    placeholder="Enter name..."
                    value={name}
                    onChange={this.onChangeHandler}
                    error={errors.name}
                  />
                  <TextInputGroup
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter email..."
                    value={email}
                    onChange={this.onChangeHandler}
                    error={errors.email}
                  />
                  <TextInputGroup
                    name="phone"
                    label="Phone"
                    placeholder="Enter phone..."
                    value={phone}
                    onChange={this.onChangeHandler}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-danger btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default AddContact;
