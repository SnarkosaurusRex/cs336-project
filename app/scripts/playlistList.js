//Built off of commentList.js

import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';
import Playlist from './playlist';
import {API_LISTS_URL} from './global';

module.exports = React.createClass({

  render: function() {
    var playlistNodes = this.props.data.map(function(playlist) {
      return (
        <Playlist id={playlist.plID} name={playlist.name} artist={playlist.artist}
                  link={playlist.link} key={playlist.plID}>
          {playlist.name} {/* change this to be an <a> with an href of playlist.link? */}
          {playlist.artist}
          {playlist.link}
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

