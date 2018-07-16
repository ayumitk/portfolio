module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'development',

  // メインのJS
  entry: {
    index: './src/js/index.js',
    work: './src/js/work.js'
  },

  // ファイルの出力設定
  output: {
    // 出力ファイル名
    filename: '[name].js'
  },

  optimization: {
    splitChunks: {
      name: 'common',
      chunks: 'initial',
    }
  },

  module: {
    rules: [
      // JS
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        // exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
        use: [{
          // Babel を利用する
          loader: 'babel-loader',
          // Babel のオプションを指定する
          options: {
            presets: [
              // env を指定することで、ES2017 を ES5 に変換。
              // {modules: false}にしないと import 文が Babel によって CommonJS に変換され、
              // webpack の Tree Shaking 機能が使えない
              ['env', {
                modules: false
              }]
            ]
          }
        }]
      }
    ]
  }
};