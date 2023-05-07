const webpack = require('webpack');
const path = require('path');

// return a function from the config file
// the `env` variable will be a simple Object: { API_URL: 'http://localhost:3000' }
// it will contain all the environment variables (that we set in package.json) as key/value pairs
module.exports = (env) => {
  // this object is our actual webpack config
  console.log(env.SERVER_URL)
  return {
    context: __dirname,
    entry: './client/src/App.js',
    output: {
      path: path.resolve(__dirname, 'public/js'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        include: [path.resolve(__dirname, 'client/src')],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }]
    },
    plugins: [
      // add the plugin to your plugins array
      new webpack.DefinePlugin({ 'process.env.CLIENT_URL': JSON.stringify(`${env.CLIENT_URL}`) })
    ]
  };
};