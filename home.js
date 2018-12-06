//Built off of commentList.js

//external imports
import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';
//local imports
import Category from './category';

module.exports = React.createClass({
  render: function() {
    var categoryNodes = this.props.data.map(function(category) {
      return (
        <Category type={Category.type}>
        </Category>
	<Category id={category.id} type={category.type}>
      );
    });
    return (
      <div className="categoryList">
        {categoryNodes}
      </div>
    );
  }
});
