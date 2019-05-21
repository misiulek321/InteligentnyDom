cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-screen-locker.ScreenLocker",
    "file": "plugins/cordova-plugin-screen-locker/www/ScreenLocker.js",
    "pluginId": "cordova-plugin-screen-locker",
    "clobbers": [
      "window.screenLocker"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-screen-locker": "0.2.2"
};
// BOTTOM OF METADATA
});