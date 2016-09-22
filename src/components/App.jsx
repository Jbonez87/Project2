import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Dashboard from './Dashboard.jsx'

const propTypes = {
  message: React.PropTypes.string.isRequired,
};

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <h1>{this.props.message}</h1>
        <div className="paths">
          <Router history={hashHistory}>
            <Route path="/" component={Home}>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/dashboard" component={Dashboard} />
            </Route>
          </Router>
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
