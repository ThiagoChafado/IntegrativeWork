const Dotenv = require('dotenv-webpack');

module.exports = {
  // Outras configurações do webpack

  plugins: [
    new Dotenv()
  ]
};
