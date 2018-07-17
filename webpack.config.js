module.exports = {
  // 'production' => Enables optimizations including minification, scope hoisting and tree-shaking.
  // 'development' => Enables sourcemaps
  mode: 'production',

  // Entry point
  entry: {
    index: './src/js/index.js',
    work: './src/js/work.js'
  },

  output: {
    filename: '[name].js'
  },

  // Create common.js
  optimization: {
    splitChunks: {
      name: 'common',
      chunks: 'initial', // 'all' | 'async' | 'initial'
    }
  },

  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            // Setting 'env' will transform ES2018 to ES5.
            // modules => 'amd' | 'umd' | 'systemjs' | 'commonjs' | false, defaults to 'commonjs'.
            // Enable transformation of ES6 module syntax to another module type.
            // Setting this to false will not transform modules.
            ['env', {
              modules: false
            }]
          ]
        }
      }]
    }]
  }
};