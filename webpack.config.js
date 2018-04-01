module.exports = {
  mode: 'production',
  output: {
    filename: 'autokana.js',
    library: 'AutoKana',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
};
