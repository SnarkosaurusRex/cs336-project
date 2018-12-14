//Built off of commentList.js

import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';
import Category from './category';

module.exports = React.createClass({
  render: function() {
    var categoryNodes = this.props.data.map(function(category) {
      return (
	<Category id={category.id} artist={category.artist} key={category.id} type={category.type}>
          {category.name}
        </Category>
      );
    });
    return (
      <div className="categoryList">
        {categoryNodes}
      </div>
    );
  }
});
