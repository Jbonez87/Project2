import React, { Component } from 'react';
import Post from './Post.jsx';

const propTypes = {
  posts: React.PropTypes.array.isRequired,
  handlePublish: React.PropTypes.func,
  handleDelete: React.PropTypes.func,
};

class PostList extends Component {
  render() {
    const postElements = this.props.posts.map((post, idx) => {
      return (
        <li key={idx}>
          <Post
            handleDelete={this.props.handleDelete}
            handlePublish={this.props.handlePublish}
            author={post.author}
            address={post.address}
            spotUrl={post.spotUrl}
            entry={post.entry}
            id={post.id}
          />
        </li>
      );
    });

    return (
      <ul>
        {postElements}
      </ul>
    );
  }
}

PostList.propTypes = propTypes;

export default PostList;
