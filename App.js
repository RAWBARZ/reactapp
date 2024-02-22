import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

class Home extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div className="home">
        <h2>Home</h2>
        <p>Name: {user.name}</p>
        <p>Age: {user.age}</p>
        <p>Address: {user.address}</p>
        <p>Email: {user.email}</p>
      </div>
    );
  }
}

class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <h2>Navbar</h2>
        <Link to="/home">Home</Link>
        <Link to="/form">Form</Link>
      </div>
    );
  }
}

class FormAction extends React.Component {
  state = {
    name: '',
    age: '',
    address: '',
    email: '',
    errors: {
      name: false,
      age: false,
      address: false,
      email: false
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validateForm = () => {
    let errors = {};
    errors.name = this.state.name === '';
    errors.age = this.state.age === '';
    errors.address = this.state.address === '';
    errors.email = this.state.email === '' || !/\S+@\S+\.\S+/.test(this.state.email);
    this.setState({ errors });
    return !Object.values(errors).some(error => error);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      this.props.updateUser(this.state);
    }
  };

  render() {
    return (
      <div className="form-action">
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <label>
            Age:
            <input type="text" name="age" onChange={this.handleChange} />
          </label>
          <label>
            Address:
            <input type="text" name="address" onChange={this.handleChange} />
          </label>
          <label>
            Email:
            <input type="text" name="email" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    user: {
      name: '',
      age: '',
      address: '',
      email: ''
    }
  };

  updateUser = (user) => {
    this.setState({ user });
  };

  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home user={this.state.user} />} />
          <Route path="/form" element={<FormAction updateUser={this.updateUser} />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
