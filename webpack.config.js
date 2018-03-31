module.exports = {
  mode: 'production',
  output: {
    filename: 'autoKana.js',
    library: 'AutoKana',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
};
