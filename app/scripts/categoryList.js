//Built off of commentList.js

import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';
import Category from './category';
import PlaylistList from './playlistList';

import {API_CATS_URL, API_LISTS_URL} from './global';

import Collapsible from 'react-collapsible';
import '../css/base.css';

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
  loadPlaylistsFromServer: function(category) {
    // if (this.state._isMounted) {
        $.ajax({
            url: API_LISTS_URL,
            dataType: 'json',
            cache: false,
        })
            .done(function (result) {
                this.setState({data: result});
            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                console.error(API_LISTS_URL, status, errorThrown.toString());
            }.bind(this));
    // }
  },
  render: function() {
    var categoryNodes = this.props.data.map(function(category) {
      var catParam = category.catID;
      // moved from <Collapsible> tag below: onOpen={this.loadPlaylistsFromServer()}
      // moved from <PlaylistList> tag below:  data={this.props.data} catID={category.catID}
      return (
        <h3><Collapsible trigger={category.name} onOpen={this.loadPlaylistsFromServer()} >
          <PlaylistList></PlaylistList>
            <p> List of playlists in {category.name}
            {/* &nbsp; &nbsp; &nbsp;
                  <a href="/addPlaylist">Add Playlist</a> */}
            </p>
            </Collapsible>
        </h3>
      );
    });
    return (
      <div className="categoryList">
        {categoryNodes}
      </div>
    );
  }
});