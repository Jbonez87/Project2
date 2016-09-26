import React, { Component } from 'react';

const propTypes = {
  content: React.PropTypes.string,
  author: React.PropTypes.string,
  handlePublish: React.PropTypes.func,
  handleDelete: React.PropTypes.func,
  id: React.PropTypes.string,
};

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localAuthor: this.props.author || '',
      localContent: this.props.content || '',
    };
    this.handleEditOfAuthor = this.handleEditOfAuthor.bind(this);
    this.handleEditOfContent = this.handleEditOfContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.isSaved = this.isSaved.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      localAuthor: nextProps.author || '',
      localContent: nextProps.content || '',
    });
  }
  handleEditOfAuthor(e) {
    const newAuthor = e.target.value;
    this.setState({
      localAuthor: newAuthor,
    });
  }
  handleEditOfContent(e) {
    const newContent = e.target.value;
    this.setState({
      localContent: newContent,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.handlePublish({
      id: this.props.id,
      author: this.state.localAuthor,
      content: this.state.localContent,
    });
    this.setState({ saved: true });
  }
  handleDeleteClick() {
    this.props.handleDelete(this.props.id);
  }
  isSaved() {
    return this.props.author === this.state.localAuthor &&
          this.props.content === this.state.localContent;
  }
  render() {
    let activeButtons;
    if (this.isSaved()) {
      activeButtons = (
        <div className="active-buttons">
          <button onClick={this.handleDeleteClick}>x</button>
        </div>
      );
    }
    return (
      <div className={this.isSaved() ? 'saved' : 'not-saved'} >
        <form className="post-display" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="author"
            value={this.state.localAuthor}
            onChange={this.handleEditOfAuthor}
          />
          <input
            type="text"
            name="content"
            value={this.state.localContent}
            onChange={this.handleEditOfContent}
          />
          <input
            type="submit"
            value="SAVE"
            className="hidden"
          />
        </form>
        {activeButtons}
      </div>
    );
  }
}

Post.propTypes = propTypes;

export default Post;
