//Built off of commentList.js

//external imports
import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';
//local imports
import Playlist from './playlist';

module.exports = React.createClass({
  render: function() {
    var playlistNodes = this.props.data.map(function(playlist) {
      return (
        <Playlist name={Playlist.name}, artist={Playlist.artist}, link={Playlist.link}>
        </Playlist>
      );
    });
    return (
      <div className="playlistList">
        {playlistNodes}
      </div>
    );
  }
});

