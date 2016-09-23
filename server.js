const Express = require('express');
const http = require('http');
const React = require('react');
const ReactDowm = require('react-dom/server');
const Router = require('react-router');
const routesConfig = require('./src/routesConfig');
const path = require('path');
const mongoose = require('mongoose');
const Game = require('./models/GameModel');
const Player = require('./models/PlayerModel');

const app = new Express();
const server = new http.Server(app);

//settings for res.render:
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//connect with DB:
mongoose.connect('mongodb://admin:gw123@ds023468.mlab.com:23468/pool_app_db');
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB');
});

// to run:
// ./node_modules/.bin/babel-node --presets 'react,es2015' server.js

//GET request for the main page:
app.get('*', function(req, res) {
  Router.match(
    {routes: routesConfig, location: req.url},
    (error, redirectLocation, renderProps) => {
      if(error) {
        res.status(500).send(error.message)
      } else if(redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        const markup = ReactDom.renderToString(<Router.RouterContext {...renderProps} />);
        res.render('index', {markup});
      } else {
        res.status(404).send('Not found')
      }
    }
  );
});



//starting the server:
server.listen(3000, (err) => {
  if(err) {
    return console.error(err);
  }
  console.info('Server on localhost:3000');
});
