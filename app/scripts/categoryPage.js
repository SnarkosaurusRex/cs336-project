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
	currentCategory = this.state.category.trim();
	<h1>
	   <script type="text/javascript">
		document.write(currentCategory)
	   </script>
	</h1>
        <CategoryList data={this.state.data} />
      </div>
    );
  }
});
