//Built off of commentForm.js

import React from 'react';
import $ from 'jquery';

module.exports = React.createClass({
  getInitialState: function() {
    return {name: '', artist: '', link: '', categories: ''}; //where categories is a list
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleArtistChange: function(e) {
    this.setState({artist: e.target.value});
  },
  handleLinkChange: function(e) {
    this.setState({link: e.target.value});
  },
//handleCatigoriesChange different because list rather than one data point?
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.state.name.trim();
    var artist = this.state.artist.trim();
    var link = this.state.link.trim();
//    var catigories = this.state.catigories.trim();
    if (!name || !artist || !link) {
      return;
    }
    this.props.onCommentSubmit({name: name, artist: artist, link:link});
    this.setState({name: '', artist, '', link: ''});
  },
  render: function() {
    return (
      <form className="playlistForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Treasure Planet"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <input
          type="text"
          placeholder="James N. Howard"
          value={this.state.artist}
          onChange={this.handleArtistChange}
        />
        <input
          type="text"
          placeholder="www.youtube.com/Treasure_Planet"
          value={this.state.link}
          onChange={this.handleLinkChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

