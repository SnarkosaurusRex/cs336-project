//Built off of commentForm.js

import React from 'react';
import $ from 'jquery';
import {API_LISTS_URL} from './global';

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  getInitialState: function() {
    return {name: '', artist: '', link: '', categories: ''};
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
  handleCategoriesChange: function(e) {
    this.setState({categories: e.target.value});
  },
  handleSave: function(e) {
    e.preventDefault();
    var newPlaylist = {
      name: this.state.name.trim(),
      artist: this.state.artist.trim(),
      link: this.state.link.trim(),
      categories: this.state.categories.trim()
    };
    if (!category.name || !category.link) { // only require playlist name and link
     //this should really give more visible/obvious feedback to the user, but this'll suffice for now
      console.error("Playlist name and link are required");
      return;
    }
    this.setState({name: '', artist: '', link: '', categories: ''});

    $.ajax({
      url: API_LISTS_URL,
      dataType: 'json',
      type: 'POST',
      data: newPlaylist,
      success: function(result) {
        // show user a success message?
        this.context.router.push('/');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(API_LISTS_URL, status, err.toString());
      }.bind(this)
    });
  },
  handleCancel: function(e) {
    this.setState({name: '', artist: '', link: '', categories: ''});
    this.context.router.push('/');
  },
  handleDelete: function(e) {
    $.ajax({
        url: API_LISTS_URL + "/" + this.props.params.id,
        type: 'DELETE',
    })
      .done(function (playlists) {
          this.context.router.push('/');
      }.bind(this))
      .fail(function (xhr, status, errorThrown) {
          console.error(API_LISTS_URL, status, errorThrown.toString());
      }.bind(this));
  },
  render: function() {
    return (
      <div className="playlistFormPage">
        <h1>Playlist Details</h1>
        <form className="playlistForm" id="playlistForm" onSubmit={this.handleSubmit}>
          <div className="inputLabel">Name:</div><input
            type="text"
            placeholder="Treasure Planet"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <br/>
          Artist/Composer/Whatever: 
          <input
            type="text"
            placeholder="James N. Howard"
            value={this.state.artist}
            onChange={this.handleArtistChange}
          />
          <br/>
          Link: 
          <input
            type="text"
            placeholder="www.youtube.com/Treasure_Planet"
            value={this.state.link}
            onChange={this.handleLinkChange}
          />
          <br/>
          <div className="inputLabel">Categories:</div>
          <input
            type="text"
            placeholder="Soundtracks, Instrumental" //a text box for right now, will eventually be modified to a selection list
            value={this.state.categories}
            onChange={this.handleCategoriesChange}
          />


          <br/>
        </form>
      <button type="button" onClick={this.handleSave}>Save</button>
      <button type="button" onClick={this.handleCancel}>Cancel</button>
      <button type="button" onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
});

// Using https://stackoverflow.com/questions/14853779/adding-input-elements-dynamically-to-form
//    and http://jsfiddle.net/t656N/1/ for reference here - not sure where this needs to go, but
//    just gonna work on it here for now:

function addCheckboxes(){
  // GET request to '/api/categories'
  var container = document.getElementById("playlistForm");
  //loop through the cats retrieved from the DB and add a checkbox for each
}
