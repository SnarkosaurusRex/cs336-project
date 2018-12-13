//Built off of commentForm.js
//For both adding new categories and editing existing categories

import React from 'react';
import $ from 'jquery';
import {API_CATS_URL} from './global';

module.exports = React.createClass({
  getInitialState: function() {
    return {name: ''}; //should have contents (list of all playlists in category) here?
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.state.name.trim();
    if (!name) {
      return;
    }
    this.props.onCategorySubmit({name: name});
    this.setState({name: ''});
  },
  handleSave: function () {
    e.preventDefault();
    var name = this.state.category.trim();
    if (!name) {
      return;
    }
    this.props.onCategorySubmit({category: name});
    this.setState({category: ''});

  },
  handleCancel: function () {
    //dont really do anything
    //just clear the text box
    this.setState({category: ''});
  },
  handleDelete: function () {
        $.ajax({
            url: API_CATS_URL + "/" + this.props.params.id,
            type: 'DELETE',
        })
            .done(function (categories) {
                this.context.router.push('/');
            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                console.error(API_CATS_URL, status, errorThrown.toString());
            }.bind(this));

  },
  render: function() {
    return (
      <div className="categoryFormPage">
        <form className="categoryForm" onSubmit={this.handleSubmit}>
    <h>The name of the category to be edited or created</h> //lables the text box
          <input
            type="text"
            placeholder="Category name"
            value={this.state.category}
            onChange={this.handleCategoryChange}
          />
    <input type ="submit"/> //because won't always be post if hit cancel or delete
  //       <input type="submit" value="Post" />
    <input id="categoryName"/>
        </form>
        <button type="button" onClick={this.handleSave}>Save</button>
        <button type="button" onClick={this.handleCancel}>Cancel</button>
        <button type="button" onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
});
