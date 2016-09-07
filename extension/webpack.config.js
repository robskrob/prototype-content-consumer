module.exports = {
  devtool: 'source-map',
  entry: {
    background: './background.js',
    content: './content.js'
  },
  output: {
    path: './dist',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /bootstrap\/js\//,
        loader: 'imports?jQuery=jquery' },
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'}
    ]
  },
  plugins: [
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules']
  }
}
