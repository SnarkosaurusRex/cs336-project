//Built off of commentBox.js

//external imports
import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';
//local imports
import CategoryList from './categoryList';
// import CommentForm from './commentForm';
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
    // Reset the isMounted flag so that the loadCommentsFromServer callback
    // stops requesting state updates when the commentList has been unmounted.
    // This switch is optional, but it gets rid of the warning triggered by
    // setting state on an unmounted component.
    // See https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
    this.state._isMounted = false;
  },
  render: function() {
    return (
      <div className="homePage">
        <h1>The Playlistinator</h1> <button>Add Category</button> <button>Add Playlist</button>
        <Link to={'/addPlaylist'} className="pseudoButton">Add Playlist</Link>
        <h2>Categories</h2>
  	    <CategoryList data={this.state.data} />
      </div>
    );
  }
});

