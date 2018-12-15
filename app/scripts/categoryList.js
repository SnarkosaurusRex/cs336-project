import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';
import Category from './category';

import {API_CATS_URL} from './global';

import Collapsible from 'react-collapsible';
import '../css/base.css';

module.exports = React.createClass({
  render: function() {
    var categoryNodes = this.props.data.map(function(category) {
      return (
        <h3><Collapsible trigger={category.name} transitionTime={150}>
            <p> List of playlists in {category.name}</p>
            </Collapsible>
        </h3>
      );
    });
    return (
      <div className="categoryList">
        {categoryNodes}
      </div>
    );
  }
});