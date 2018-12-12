var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var db;
var APP_PATH = path.join(__dirname, 'dist');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(APP_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//-------------------- Route functions start here --------------------\\
// Category-related Routes
app.get('/api/categories', function(req, res) {
    db.collection('categories').find().toArray(function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(data);
    });
});


app.post('/api/categories', function(req, res) {
    var newCategory = {
        catID: Date.now(),
        name: req.body.name
    };
    
    db.collection('categories').insertOne(newCategory, function(err, result) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
    res.send('Category added!'); //should this return just a status code instead?
});


//get all the playlists in the category
app.get('/api/categories/:id', function (req, res) {
	var cat = parseInt(req.params['id']);

	db.collection('memberships').find({'catID':cat}, {'plID': 1, _id: 0}).toArray(function(err, data) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		res.json(data);
	});
});


//edit the category
app.put('/api/categories/:id', function (req, res) {
	var cat = parseInt(req.params['id']);

	db.collection('categories').updateOne({'catID':cat}, {$set: {name: req.body.name}}, function(err, result) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
	});
	res.send('Category updated!'); //return just a status code instead?
});


//delete the category
app.delete('/api/categories/:id', function (req, res) {
	var cat = parseInt(req.params['id']);

	db.collection('categories').deleteOne({'catID':cat}, function(err, result) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
	});
	res.send('Category deleted!'); //return just a status code instead?
});


// Playlist-related Routes
app.post('/api/playlists', function(req, res) {
	var newPlaylist = {
		plID: Date.now(),
		name: req.body.name,
		artist: req.body.artist,
		link: req.body.link
	};

	db.collection('playlists').insertOne(newPlaylist, function(err, result) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
	});

	//TO-DO: need to figure out how to loop through checkboxes and add the necessary things to the memberships collection
});


app.get('/api/comments/:id', function(req, res) {
    db.collection("comments").find({"id": Number(req.params.id)}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});


app.put('/api/comments/:id', function(req, res) {
    var updateId = Number(req.params.id);
    var update = req.body;
    db.collection('comments').updateOne(
        { id: updateId },
        { $set: update },
        function(err, result) {
            if (err) throw err;
            db.collection("comments").find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});


app.delete('/api/comments/:id', function(req, res) {
    db.collection("comments").deleteOne(
        {'id': Number(req.params.id)},
        function(err, result) {
            if (err) throw err;
            db.collection("comments").find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});


// need to have MONGO_PASSWORD set as an environment variable for this to work
MongoClient.connect('mongodb://cs336:' + process.env.MONGO_PASSWORD + '@ds227674.mlab.com:27674/playlistinator', function (err, client) {
    if (err) throw err

    db = client;

    // Add this at the bottom, just before starting the server.
    app.use('*', express.static(APP_PATH));

    app.listen(app.get('port'), function() {
        console.log('Server started: http://localhost:' + app.get('port') + '/');
    });
})

