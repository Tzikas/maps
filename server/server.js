const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../config/config');
const webpackConfig = require('../webpack.config');

const isDev = process.env.NODE_ENV !== 'production';
// const {DATABASE_URL, PORT} = require('../config/config');
// console.log(DATABASE_URL);
// console.log(PORT);
const port  = process.env.PORT || 8080;

const cors = require('cors'); 

console.log('pajama');
console.log(isDev)
console.log(process.env.NODE_ENV)
console.log(port)
console.log(__dirname)
	
console.log(config.db); 
// Configuration
// ================================================================================================

// Set up Mongoose
mongoose.connect(config.db);
mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());
console.log('yo')
//app.get('/api', games.find);
app.get('/products', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
});



// API routes
require('./routes')(app);

if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(historyApiFallback({
    verbose: false
  }));

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, '../client/public'),
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    res.end();
  });
}

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.info('>>> 🌎 Open localhost:%s in your browser.', port);
});

module.exports = app;