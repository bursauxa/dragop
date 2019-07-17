const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const DtsBundleWebpack = require('dts-bundle-webpack')

module.exports = {
  entry: {
    'dragop': './src/index.ts',
    'dragop.min': './src/index.ts'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new DtsBundleWebpack({
      name: 'dragop',
      main: 'types/**/*.d.ts',
      out: '~/dist/dragop.d.ts',
      outputAsModuleFolder: true
    })
  ],
  resolve: {
    extensions: [ '.tsx', '.ts' ]
  },
  output: {
    filename: '[name].js',
    library: 'dragop',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      include: /\.min\.js$/
    })]
  },
  externals: {
    vue: 'vue'
  }
};
