var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const httpStatus = require('http-status-codes');
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
    res.json(newCategory); //send back a json response to appease the ajax call :P
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
	res.send('Category updated!');
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
	res.send('Category deleted!');
});


// Playlist-related Routes
app.post('/api/playlists', function(req, res) {
	var newPlaylist = {
		plID: Date.now(),
		name: req.body.name,
		artist: req.body.artist,
		link: req.body.link,
		categories: req.body.categories
	};

	db.collection('playlists').insertOne(newPlaylist, function(err, result) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
	});
	//handle categories
	var cats = newPlaylist.categories.split(',');
	var membEntry = {
		plID: newPlaylist.plID,
		catID: ""
	};
	cats.forEach(function(c) {
		db.collection('categories').findOne({'name':c}, {catID:1, _id:0}, function(err, rslt) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			membEntry.catID = rslt.catID;
			db.collection('memberships').insertOne(membEntry, function(err, result) {
				if (err) {
					console.error(err);
					process.exit(1);
				}
			});
		});
		/* This was a failed attempt to resolve an issue in which, if the new playlist was to be added to
		 *	more than one category, Mongo for some reason tried to assign both documents in the
		 *	memberships table the same _id value, which obviously caused problems
		 */
		// for (i=0; i<1000000; i++) {
		// 	 var wait = "naptime!";
		// }
	});

	res.json(newPlaylist); //send back a json response to appease the ajax call :P
});


//get all the info to display for the specified playlist
app.get('/api/playlists/:id', function (req, res) {
	var lstid = parseInt(req.params['id']);
	var resData;

	db.collection('playlists').find({'plID':lstid}, {name:1, artist:1, link:1, _id:0}).toArray(function(err, data) {
		if (err) {
			console.error(err);
			process.exit(1);
		}

		//get all the categories the playlist is a member of
		db.collection('memberships').find({'plID':lstid}, {catID:1, _id:0}).toArray(function(err, cats) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			resData = data;
			cats.forEach(function(element) {
				resData.push(element);
			});

			res.json(resData);
		});
	});
});


//edit the playlist info
app.put('/api/playlists/:id', function (req, res) {
	var lstid = parseInt(req.params['id']);

	db.collection('playlists').updateOne({'plID':lstid}, {$set: {name: req.body.name, artist: req.body.artist, link: req.body.link}}, function(err, result) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		//TO-DO: need to figure out how to update the categories the playlist is a member of
	});
	res.send('Playlist updated!');
});


//delete the playlist
app.delete('/api/playlists/:id', function (req, res) {
	var lstid = parseInt(req.params['id']);

	db.collection('playlists').deleteOne({'plID':lstid}, function(err, result) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
	});
	
	db.collection('memberships').deleteMany({'plID':lstid}, function(err, result) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
	});

	res.send('Playlist deleted!');
});



// need to have MONGO_PASSWORD set as an environment variable for this to work
MongoClient.connect('mongodb://cs336:' + process.env.MONGO_PASSWORD + '@ds227674.mlab.com:27674/playlistinator', function (err, client) {
    if (err) throw err

    db = client;

    app.use('*', express.static(APP_PATH));

    app.listen(app.get('port'), function() {
        console.log('Server started: http://localhost:' + app.get('port') + '/');
    });
})
