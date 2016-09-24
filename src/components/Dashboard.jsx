import React, { Component } from 'react';
import superagent from 'superagent';
import SpotList from './SpotList.jsx';
import SpotPost from './SpotPost.jsx';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spotPosts: [],
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
    const url = 'https://secret-spots.firebaseio.com/users/posts.json';
    request.get(url)
           .then((response) => {
             const postsData = response.body;
             let spotPosts = [];
             if (postsData) {
               spotPosts = Object.keys(postsData).map((id) => {
                 const postData = postsData[id];
                 return {
                   id,
                   author: postData.author,
                   spotName: postData.spotName,
                   address: postData.address,
                   secretEntry: postData.secretEntry,
                 };
               });
             }
             this.setState({ spotPosts });
           });
  }
  handlePublish({ id, author, spotName, address, secretEntry }) {
    if (id) {
      this.httpUpdatePost({ id, author, spotName, address, secretEntry });
    } else {
      this.httpPublishPost({ spotName, address, secretEntry });
    }
  }
  httpDeletePost(id) {
    const url = `https://secret-spots.firebaseio.com/users/posts${id}`;
    request.del(url)
           .then(() => {
             this.httpGetPosts();
           });
  }
  httpUpdatePost({ id, author, spotName, address, secretEntry }) {
    const url = `https://secret-spots.firebaseio.com/users/posts${id}`;
    request.patch(url)
           .send({ author, spotName, address, secretEntry })
           .then(() => {
             this.httpGetPosts();
           });
  }
  httpPublishPost({ author, spotName, address, secretEntry }) {
    const url = 'https://secret-spots.firebaseio.com/users/posts';
    request.post(url)
           .send({ author, spotName, address, secretEntry })
           .then(() => {
             this.httpGetPosts();
           })
  }
  render() {
    return (
      <div>
        {/* <SpotQuery /> */}
        <SpotList handleDelete={this.httpDeletePost}
        handlePublish={this.handlePublish}
        spotPosts={this.state.posts} />
        <SpotPost
        handleDelete={this.httpDeletePost}
        handlePublish={this.handlePublish} />
      </div>
    );
  }
}

export default Dashboard;
