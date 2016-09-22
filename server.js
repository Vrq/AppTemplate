const express = require('express');
const http = require('http');
const React = require('react');
const ReactDom = require('react-dom/server');
const Router = require('react-router');
const routesConfig = require('./src/routesConfig');
const path = require('path');
const mongoose = require('mongoose');
const Game = require('./models/GameModel');
const Player = require('./models/PlayerModel');

const app = express();


//settings for res.render:
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//connect with DB:
mongoose.connect('mongodb://admin:gw123@ds023468.mlab.com:23468/pool_app_db');
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB');
});

// TODO: strona 337 z ebooka

//GET request for the main page:
app.get('*', function(req, res) {
  Router.match(
    {routes: routesConfig, location: req.url},
    (error, redirectLocation, renderProps) => {
      if(error) {
        res.status(500).send(error.message)
      } else if(redirectLocation) {
        res.redirect(403, redirectLocation.pathname + redirectLocation.search)
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
app.listen(3000, function() {
  console.log("Listening on port 3000");
});
