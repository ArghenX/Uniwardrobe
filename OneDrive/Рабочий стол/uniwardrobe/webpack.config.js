const path = require('path');

module.exports = {
  entry: './src/index.js', // ваши основные файлы, где начинается выполнение кода React
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
};
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './my-app/src/index.js',  // Используйте ваш актуальный путь
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
