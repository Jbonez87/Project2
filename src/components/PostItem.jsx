import React, { Component } from 'react';

const propTypes = {
  author: React.PropTypes.string,
  name: React.PropTypes.string,
  address: React.PropTypes.string,
  spotUrl: React.PropTypes.string,
  entry: React.PropTypes.string,
  handleDelete: React.PropTypes.func,
  id: React.PropTypes.string,
};

class PostItem extends Component {
  render() {
    return (
      <div>
        <li>
          <div>
          <p>{this.props.name}</p>
          <p>{this.props.address}</p>
          <p>{this.props.entry}</p>
          <p><a href={this.props.spotUrl}>{this.props.spotUrl}</a></p>
          <p>{this.props.author}</p>
          </div>
        </li>
      </div>
    );
  }
}

PostItem.propTypes = propTypes;

export default PostItem;
