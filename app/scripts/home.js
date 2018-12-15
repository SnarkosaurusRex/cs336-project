//Built off of commentBox.js
import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';
import CategoryList from './categoryList';
import { API_CATS_URL, API_LISTS_URL, POLL_INTERVAL } from './global'

module.exports = React.createClass({
  getInitialState: function() {
    return {data: [], _isMounted: false};
  },
  loadCategoriesFromServer: function() {
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
  },
  handleCategorySubmit: function(category) {
    var categories = this.state.data;
    category.id = Date.now();
    var newCategories = categories.concat([category]);
    this.setState({data: newCategories});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: category,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: categories});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.state._isMounted = true;
    this.loadCategoriesFromServer();
    setInterval(this.loadCategoriesFromServer, POLL_INTERVAL);
  },
  componentWillUnmount: function() {
    this.state._isMounted = false;
  },
  render: function() {
    return (
      <div className="homePage">
        <h1>The Playlistinator</h1>
      	<Link to={'/addCategory'}>Add Category</Link>
	      &nbsp; &nbsp; &nbsp;
        <Link to={'/addPlaylist'}>Add Playlist</Link>
        <h2>Categories</h2>
  	    <CategoryList data={this.state.data} />
      </div>
    );
  }
});

