import React, { Component } from 'react';

const propTypes = {
  message: React.PropTypes.string.isRequired
};

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Test">
        <h1>{this.props.message}</h1>
      </div>
    );
  }
}

export default App;
