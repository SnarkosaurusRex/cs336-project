//Built off of commentList.js

import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';
import Category from './category';
//import PlaylistList from './playlistList';
//import {API_CATS_URL, API_LISTS_URL, POLL_INTERVAL} from './global';
import {API_CATS_URL} from './global';

import Collapsible from 'react-collapsible';

module.exports = React.createClass({
/*  getInitialState: function() {
    return {data: [], _isMounted: false};
  },*/
/* loadPlaylistsFromServer: function() {
      if (this.state._isMounted) {
          $.ajax({
              url: API_CATS_URL,
              dataType: 'json',
              cache: false,
          })
              .done(function (result) {
                  this.setState({data: result});
              }.bind(this))
              .fail(function (xhr, status, errorThrown) {
                  console.error(API_CATS_URL, status, errorThrown.toString());
              }.bind(this));
      }
  },*/
/*  componentDidMount: function() {
    this.state._isMounted = true;
    this.loadPlaylistsFromServer();
    setInterval(this.loadPlaylistsFromServer, POLL_INTERVAL);
  },
  componentWillUnmount: function() {
    this.state._isMounted = false;
  },*/
  render: function() {
    var categoryNodes = this.props.data.map(function(category) {
      return (
	<Collapsible trigger={category.name}>
	  <p> Lists of playlists in {category.name} </p>
	</Collapsible>
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
