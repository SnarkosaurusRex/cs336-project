//Built off of commentList.js
import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';
import Playlist from './playlist';
import {API_CATS_URL} from './global';

module.exports = React.createClass({

  render: function() {
    var playlistNodes = this.props.data.map(function(playlist) {
      return (
        <Playlist name={Playlist.name} artist={Playlist.artist} link={Playlist.link}>
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

