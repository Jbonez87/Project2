import React, { Component } from 'react';
import PostItem from './PostItem.jsx';

const propTypes = {
  posts: React.PropTypes.array.isRequired,
  handleDelete: React.PropTypes.func,
};

class PostList extends Component {
  render() {
    if(this.props.posts.length > 0){
      const postElements = this.props.posts.map((post, idx) => {
        return (
            <PostItem
              key={idx}
              handleDelete={this.props.handleDelete}
              author={post.author}
              name={post.name}
              address={post.address}
              spotUrl={post.spotUrl}
              entry={post.entry}
              id={post.id}
            />
        );
      });
      return (
        <ul>
          {postElements}
        </ul>
      )
      } else {
        return (
          <div>No posts</div>
        )
      }
  }
}

PostList.propTypes = propTypes;

export default PostList;
