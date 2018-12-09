//Built off of commentBox.js

//external imports
import React from 'react';
import $ from 'jquery';
//local imports
import CategoryList from './categoryList';
// import CommentForm from './commentForm';
//import Global from './global'

module.exports = React.createClass({
  getInitialState: function() {
        return {data: []};
  },
    loadCategoriesFromServer: function() {
        if (this.state._isMounted) {
            $.ajax({
                url: API_URL,
                dataType: 'json',
                cache: false,
            })
                .done(function (result) {
                    this.setState({data: result});
                }.bind(this))
                .fail(function (xhr, status, errorThrown) {
                    console.error(API_URL, status, errorThrown.toString());
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
    this.loadCategoriesFromServer();
    setInterval(this.loadCategoriesFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="homePage">
        <h1>The Playlistinator</h1> <button>Add Category</button> <button>Add Playlist</button>
          <h2>Categories</h2>
  	  <CategoryList data={this.state.data} />
      </div>
    );
  }
});

