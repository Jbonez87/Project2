import React, { Component } from 'react';
import { withRouter } from 'react-router';
import firebase from '../../firebase.config.js';

const propTypes = {
  uid: React.PropTypes.string,
};

class Register extends Component {
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
    const regObj = {};
    const regKey = e.target.name;
    regObj[regKey] = e.target.value;
    this.setState(regObj);
  }

  handleSubmit() {
    const { username, password } = this.state;
    firebase.auth()
    .createUserWithEmailAndPassword(username, password)
    .catch((err) => {
      console.log(err);
    })
    .then((user) => {
      firebase.database().ref('users')
        .child(user.uid)
        .set({first_name: '', last_name: '', email: username })
    })
    .then(() => {
      const userId = firebase.auth().currentUser.uid;
      this.props.router.push(`/${userId}`);
    })
  }
  render() {
    return (
      <div>
        <div className="registration-form">
          <div>
            <input name="username" onChange={this.handleChange} type="text" placeholder="What's your username?" />
          </div>
          <div>
            <input name="password" onChange={this.handleChange} type="password" placeholder="What's the password?" />
          </div>
          <button className="btn" onClick={this.handleSubmit}>Register</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
