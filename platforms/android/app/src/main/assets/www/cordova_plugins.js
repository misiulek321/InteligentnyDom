cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "es6-promise-plugin.Promise",
    "file": "plugins/es6-promise-plugin/www/promise.js",
    "pluginId": "es6-promise-plugin",
    "runs": true
  },
  {
    "id": "cordova-plugin-rtsp-vlc.VideoPlayerVLC",
    "file": "plugins/cordova-plugin-rtsp-vlc/www/VideoPlayerVLC.js",
    "pluginId": "cordova-plugin-rtsp-vlc",
    "clobbers": [
      "window.VideoPlayerVLC"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "es6-promise-plugin": "4.1.0",
  "cordova-plugin-rtsp-vlc": "3.0.0"
};
// BOTTOM OF METADATA
});