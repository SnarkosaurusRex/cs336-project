import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import Home from './home.js';
import AddPlaylist from './addPlaylist.js';
// import CommentEdit from './CommentEdit.js';

// import '../css/base.css';

ReactDOM.render((
        <Router history={browserHistory}>
            <Route path="/" component={Home}/>
            <Route path="/addPlaylist" component={AddPlaylist}/>
            {/* <Route path="/:id" component={CommentEdit}/> */}
        </Router>
    ), document.getElementById('content')
);