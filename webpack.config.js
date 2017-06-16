module.exports = {
  entry: [
    './source/js/react/Root.jsx'
  ],
  output: {
    path: __dirname + '/public/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ["es2015", "react"]
          }
        },
          { test: /\.css$/, loader: "style-loader!css-loader" },
          {
                 test: /\.(eot|svg|ttf|woff|woff2)$/,
                 loader: 'file?name=adapublic/fonts/[name].[ext]'
             },
      ]
    },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './public'
  }
};
