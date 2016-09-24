import React, { Component } from 'react';

const propTypes = {
  uid: React.propTypes.string,
  author: React.PropTypes.string,
  spotName: React.PropTypes.string,
  address: React.PropTypes.string,
  secretEntry: React.PropTypes.string,
};

class SpotPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localSpotName: this.props.spotName || '',
      localAddress: this.props.address || '',
      localSecretEntry: this.props.secretEntry || '',
    };
    this.handleEditOfSpotName = this.handleEditOfSpotName.bind(this);
    this.handleEditOfAddress = this.handleEditOfAddress.bind(this);
    this.handleEditOfSecretEntry = this.handleEditOfSecretEntry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeletClick = this.handleDeletClick.bind(this);
    this.isSaved = this.isSaved.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.setState({
      localSpotName: nextProps.spotName || '',
      localAddress: nextProps.address || '',
      localSecretEntry: nextProps.secretEntry || '',
    });
  }
  handleEditOfSpotName(e) {
    const newSpotName = e.target.value;
    this.setState({
      localSpotName: newSpotName,
    });
  }
  handleEditOfAddress(e) {
    const newAddress = e.target.value;
    this.setState({
      localAddress: newAddress,
    });
  }
  handleEditOfSecretEntry(e) {
    const newSecretEntry = e.target.value;
    this.setState({
      localSecretEntry: newSecretEntry,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.handlePublish({
      uid: this.props.uid,
      spotName: this.state.spotName,
      address: this.state.localAddress,
      secretEntry: this.state.localSecretEntry,
    });
    this.setState({ saved: true });
  }
  handleDeleteClick() {
    this.props.handleDelete(this.props.uid);
  }
  isSaved() {
    return this.props.spotName === this.state.localSpotName && this.props.address === this.state.localAddress && this.props.localSecretEntry === this.state.localSecretEntry;
  }
  render() {
    let activeButtons;
    if (this.isSaved()) {
      activeButtons = (
        <div className="active-buttons">
          <button onClick={this.handleDeleteClick}>X
          </button>
        </div>
      );
    }
    return (
      <div className={this.isSaved() ? 'saved' : 'not-saved'} >
        <form className="spot-display"
        onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="spot-name"
            value={this.state.localSpotName}
            onChange={this.handleEditOfSpotName}
          />
          <input
            type="text"
            name="address"
            value={this.state.localAddress}
            onChange={this.handleEditOfAddress}
          />
          <input
            type="text"
            name="secret-entry"
            value={this.state.localSecretEntry}
            onChange={this.handleEditOfSecretEntry}
          />
          <input
              type="submit"
              value="SAVE"
              className="secret"
          />
        </form>
        {activeButtons}
      </div>
    );
  }
}

SpotPost.propTypes = propTypes;

export default SpotPost;

// const userId = firebase.auth().currentUser.uid;
//     const url = `https://notes-app-7cda8.firebaseio.com/users/${userId}/notes.json`;
//     request.get(url)
