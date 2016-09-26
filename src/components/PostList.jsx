import React, { Component } from 'react';
import Post from './Post.jsx';

const propTypes = {
  posts: React.PropTypes.array.isRequired,
  handlePublish: React.PropTypes.func,
  handleDelete: React.PropTypes.func,
};

class PostList extends React.Component {
  render() {
    const postElements = this.props.posts.map((post, idx) => {  // for each of the posts... give an li
      return (
        <li key={idx}>
          <Post
            handleDelete={this.props.handleDelete}
            handlePublish={this.props.handlePublish}
            content={post.content}
            author={post.author}
            likeCount={post.likeCount}
            id={post.id}
          />
        </li>
      );
    });
    // Place all the lis in the Postlists elemtns
    return (
      <ul>
        {postElements}
      </ul>
    );
  }
}

PostList.propTypes = propTypes;

export default PostList;
