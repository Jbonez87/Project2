import React, { Component } from 'react';
import { withRouter } from 'react-router';
import firebase from '../../firebase.config.js';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const logObj = {};
    const logKey = e.target.name;
    logObj[logKey] = e.target.value;
    this.setState(logObj);
  }

  handleSubmit() {
    const { username, password } = this.state;
    firebase.auth()
      .signInWithEmailAndPassword(username, password)
      .catch((err) => {
        const errCode = err.code;
        const errMessage = err.message;
      })
      // .then(() => {
      //   this.props.router.push('/dashboard')
      // })
  }
  render() {
    return (
      <div>
        <div className="login-form">
          <div>
            <input name="username" onChange={this.handleChange} type="text" placeholder="What's your username?" />
          </div>
          <div>
            <input name="password" onChange={this.handleChange} type="password" placeholder="What's the password?" />
          </div>
          <button className="btn" onClick={this.handleSubmit}>Login</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
