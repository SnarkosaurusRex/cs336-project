//categoryPage based on commentBox.js
//displays  all playlists/minimal information contained in the category

import React from 'react';
import $ from 'jquery';
import CommentList from './categoryList';
import Global from './global'

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
  },
  componentDidMount: function() {
    this.loadCategoriesFromServer();
    setInterval(this.loadCategoriesFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="categoryPage">
	currentCategory = this.state.category.trim(); //title of page is the category's name
	<h1>
	   <script type="text/javascript">
		document.write(currentCategory) //category name put here
	   </script>
	</h1>
	<Link to={'/home'} className="pseudoButton">Home</Link>
	<Link to={'/addCategory'} className="pseduoButton">Edit Category</Link> //same page as add category
	<Link to={'/addCategory'} className="pseudoButton">Add Category</Link>//same as edit category - figure out they clicked add category rather than edit so delete button is not there?
	<Link to={/addPlaylist'} className="pseudoButton>Add Playlist</Link>
        <CategoryList data={this.state.data} />
	//need to figure out how to create a button to Edit Playlist for each playlist in thsi cateogry
	//so that the Edit Playlist button takes you to an edit page specific to that playlist
      </div>
    );
  }
});
