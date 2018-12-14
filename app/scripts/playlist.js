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
      <div className="playlistName">
	<Link to={'/addPlaylist'} className="pseudoButton">Edit This Playlist</Link> //same for now but will differentiate which link was clicked so delete button can show here
	<Link to={'/addPlaylist'} className="pseudoButton">Add New Playlist</Link>//but delete button will not show here
        <h2 className="playlistArtist">
          {this.props.artist}
        </h2>
	<h2 className="playlistLink">
	  {this.props.link}
	</h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});
