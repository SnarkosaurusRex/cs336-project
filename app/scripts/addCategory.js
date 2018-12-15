//Built off of commentForm.js
//For both adding new categories and editing existing categories

import React from 'react';
import $ from 'jquery';
import {API_CATS_URL} from './global';

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  getInitialState: function() {
    return {name: ''};
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleSave: function(e) {
    e.preventDefault();
    var newCat = {
      name: this.state.name.trim()
    };
    if (!newCat.name) {
      return;
    }
    this.setState({category: ''});
    $.ajax({
      url: API_CATS_URL,
      dataType: 'json',
      type: 'POST',
      data: newCat,
      success: function(result) {
        // show user a success message?
        this.context.router.push('/');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(API_CATS_URL, status, err.toString());
      }.bind(this)
    });
  },
  handleCancel: function () {
    this.setState({category: ''});
    this.context.router.push('/');
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
	<h1>Edit or Add a Category</h1>
    <form className="categoryForm" onSubmit={this.handleSubmit}>
      Category name: <input
        type="text"
        placeholder="Category name"
        size='44'
        maxLength='60'
        value={this.state.category}
        onChange={this.handleNameChange}
      />
    </form>
        <button type="button" onClick={this.handleSave}>Save</button>
        <button type="button" onClick={this.handleCancel}>Cancel</button>
        <button type="button" onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
});
