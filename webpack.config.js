const createConfig = require('sn-front-webpack-config');

const config = createConfig('folder', 'FolderApp');

config.devServer.historyApiFallback = { index: '/' };
config.output.publicPath = config.output.publicPath || '/';

// require('sn-front-webpack-config/link')(config, {
//   'sn-front.controls': '../sn-front.controls'
// });

module.exports = config;
