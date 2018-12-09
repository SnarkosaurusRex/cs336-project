//based on comment.js

import React from 'react';
import Remarkable from 'remarkable';

module.exports = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    var md = new Remarkable();
    return (
      <div className="category">
        <h2 className="playlistList">
          {this.props.playlistList} //list of all the playlists in this category
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});
