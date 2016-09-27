import React, { Component } from 'react';

const propTypes = {
  author: React.PropTypes.string,
  name: React.PropTypes.string,
  address: React.PropTypes.string,
  spotUrl: React.PropTypes.string,
  entry: React.PropTypes.string,
  handlePublish: React.PropTypes.func,
  handleDelete: React.PropTypes.func,
  id: React.PropTypes.string,
};

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localAuthor: this.props.author || '',
      localName: this.props.name || '',
      localAddress: this.props.address || '',
      localSpotUrl: this.props.spotUrl || '',
      localEntry: this.props.entry || '',
    };

    this.handleEditOfAuthor = this.handleEditOfAuthor.bind(this);
    this.handleEditOfAddress = this.handleEditOfAddress.bind(this);
    this.handleEditOfSpotUrl = this.handleEditOfSpotUrl.bind(this);
    this.handleEditOfEntry = this.handleEditOfEntry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      localAuthor: nextProps.author || '',
      localAddress: nextProps.address || '',
      localSpotUrl: nextProps.spotUrl || '',
      localEntry: nextProps.entry || '',
    });
  }

  handleEditOfAuthor(e) {
    const newAuthor = e.target.value;
    this.setState({
      localAuthor: newAuthor,
    });
  }

  handleEditOfName(e) {
    const newName = e.target.value;
    this.setState({
      localName: newName,
    });
  }

  handleEditOfAddress(e) {
    const newAddress = e.target.value;
    this.setState({
      localAddress: newAddress,
    });
  }

  handleEditOfSpotUrl(e) {
    const newSpotUrl = e.target.value;
    this.setState({
      localSpotUrl: newSpotUrl,
    });
  }

  handleEditOfEntry(e) {
    const newEntry = e.target.value;
    this.setState({
      localEntry: newEntry,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.handlePublish({
      id: this.props.id,
      author: this.state.localAuthor,
      name: this.state.localName,
      address: this.state.localAddress,
      spotUrl: this.state.localSpotUrl,
      entry: this.state.localEntry,
    });

    this.setState({ saved: true });
  }

  handleDeleteClick() {
    this.props.handleDelete(this.props.id);
  }

  render() {
    let activeButtons;
      activeButtons = (
        <div className="active-buttons">
          <button onClick={this.handleDeleteClick}>x</button>
        </div>
      );

    return (
      <div className="" >
        <form className="post-display" onSubmit={this.handleSubmit}>
          <p>Author</p>
          <input
            type="text"
            name="author"
            value={this.state.localAuthor}
            onChange={this.handleEditOfAuthor}
          />
          <p>Name of Speakeasy</p>
          <input
            type="text"
            name="name"
            value={this.state.localName}
            onChange={this.handleEditOfName}
          />
          <p>Address</p>
          <input
            type="text"
            name="address"
            value={this.state.localAddress}
            onChange={this.handleEditOfAddress}
          />
          <p>Link</p>
          <input
            type="text"
            name="spotUrl"
            value={this.state.localSpotUrl}
            onChange={this.handleEditOfSpotUrl}
          />
          <p>How to get in</p>
          <input
            type="text"
            name="entry"
            value={this.state.localEntry}
            onChange={this.handleEditOfEntry}
          />
          <input
            type="submit"
            value="Post"
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
