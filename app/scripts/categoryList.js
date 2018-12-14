//Built off of commentList.js

import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';
import Category from './category';
//import PlaylistList from './playlistList';
//import {API_CATS_URL, API_LISTS_URL, POLL_INTERVAL} from './global';
import {API_CATS_URL} from './global';

import Collapsible from 'react-collapsible';
import './base.css';

module.exports = React.createClass({
  render: function() {
    var categoryNodes = this.props.data.map(function(category) {
      return (
	<h4><Collapsible trigger={category.name}>
	    <p> Lists of playlists in {category.name}
	    &nbsp; &nbsp; &nbsp;
            <a href="/addPlaylist">Add Playlist</a></p>
	    </Collapsible>
	</h4>

      );
    });
    return (
      <div className="categoryList">
        {categoryNodes}
      </div>
    );
  }
});

//<PlaylistList data-{this.state.data}/>
//            <Link to={'/addPlaylist'} className="pseudoButton">Add Playlist</Link>

