import React, { Component } from 'react';
import firebase from '../../firebase.config.js';

const propTypes = {
  children: React.PropTypes.element.isRequired,
};

class Home extends Component {
  render() {
    return (
      <div>
        <div className="welcome">
          <h1>Welcome to Secret Spots</h1>
          <p>We're your number one spot for
          hidden restaurants and speakeasies in
          NYC! Wanna know where they are?
          What's the password (and your username)?</p>
        </div>
        <div id="main-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Home.propTypes = propTypes;

export default Home;
