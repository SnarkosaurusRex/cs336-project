//Built off of commentForm.js

import React from 'react';
import $ from 'jquery';

module.exports = React.createClass({
  getInitialState: function() {
    return {name: ''}; //should have contents (list of all playlists in category) here?
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.state.name.trim();
    if (!name) {
      return;
    }
    this.props.onCommentSubmit({name: name});
    this.setState({name: ''});
  },
  render: function() {
    return (
      <form className="categoryForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="New category"
          value={this.state.category}
          onChange={this.handleCategoryChange}
        />
        <input type="submit" value="Post" />
      </form>
      <button>Save</button> <button>Cancel</button>
    );
  }
});
