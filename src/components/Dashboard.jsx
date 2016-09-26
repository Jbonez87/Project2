import React, { Component } from 'react';
import request from 'superagent';
import PostList from './PostList.jsx';
import Post from './Post.jsx';
import firebase from '../../firebase.config.js';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };

    this.handlePublish = this.handlePublish.bind(this);
    this.httpUpdatePost = this.httpUpdatePost.bind(this);
    this.httpPublishPost = this.httpPublishPost.bind(this);
    this.httpDeletePost = this.httpDeletePost.bind(this);
  }

  componentDidMount() {
    this.httpGetPosts();
  }

  httpGetPosts() {
    const userId = firebase.auth().currentUser.uid;
    const url = `https://secret-spots.firebaseio.com/users/${userId}posts.json`;
    request.get(url)
    .then((response) => {
      const postsData = response.body;
      let posts = [];
      if (postsData) {
        posts = Object.keys(postsData).map((id) => {
          const individualPostData = postsData[id];
          return {
            id,
            author: individualPostData.author,
            address: individualPostData.address,
            spotUrl: individualPostData.spotUrl,
            entry: individualPostData.entry,
          };
        });
      }
      this.setState({ posts });
    });
  }

  handlePublish({ id, author, address, spotUrl, entry }) {
    if (id) {
      this.httpUpdatePost({ id, author, address, spotUrl, entry });
    } else {
      this.httpPublishPost({ author, address, spotUrl, entry });
    }
  }

  httpDeletePost(id) {
    const userId = firebase.auth().currentUser.uid;
    const url = `https://secret-spots.firebaseio.com/users/${userId}/posts/${id}.json`;
    request.del(url)
    .then(() => {
      this.httpGetPosts();
    });
  }

  httpUpdatePost({ id, author, address, spotUrl, entry }) {
    const userId = firebase.auth().currentUser.uid;
    const url = `https://secret-spots.firebaseio.com/users/${userId}/posts/${id}.json`;
    request.patch(url)
    .send({ author, address, spotUrl, entry })
    .then(() => {
      this.httpGetPosts();
    });
  }

  httpPublishPost({ author, address, spotUrl, entry }) {
    const userId = firebase.auth().currentUser.uid;
    const url = `https://secret-spots.firebaseio.com/users/${userId}/posts.json`;
    request.post(url)
    .send({ author, address, spotUrl, entry })
    .then(() => {
      this.httpGetPosts();
    });
  }

  render() {
    return (
      <div className="container">
        <PostList
          handleDelete={this.httpDeletePost}
          handlePublish={this.handlePublish}
          posts={this.state.posts}
        />
        <Post
          handleDelete={this.httpDeletePost}
          handlePublish={this.handlePublish}
        />
      </div>
    );
  }
}

export default Dashboard;
