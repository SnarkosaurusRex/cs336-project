//Built off of commentForm.js
//For both adding new categories and editing existing categories

import React from 'react';
import $ from 'jquery';
import {API_CATS_URL} from './global';

module.exports = React.createClass({
  getInitialState: function() {
    return {name: ''}; //should have contents (list of all playlists in category) here?
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
//        <Link to={'/'} className="pseudoButton">Home</Link>
  render: function() {
    return (
      <div className="categoryFormPage">
	<h1>Edit or Add a Category</h1>
        <form className="categoryForm" onSubmit={this.handleSubmit}>
    <h>The name of the category to be edited or created </h>
          <input
            type="text"
            placeholder="Category name"
            value={this.state.category}
            onChange={this.handleCategoryChange}
          />
        </form>
        <button type="button" onClick={this.handleSave}>Save</button>
        <button type="button" onClick={this.handleCancel}>Cancel</button>
        <button type="button" onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
});
