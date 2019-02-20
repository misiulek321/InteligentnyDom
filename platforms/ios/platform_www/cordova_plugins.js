cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-insomnia.Insomnia",
    "file": "plugins/cordova-plugin-insomnia/www/Insomnia.js",
    "pluginId": "cordova-plugin-insomnia",
    "clobbers": [
      "window.plugins.insomnia"
    ]
  },
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
  "cordova-plugin-insomnia": "4.3.0",
  "es6-promise-plugin": "4.1.0",
  "cordova-plugin-rtsp-vlc": "3.0.4"
};
// BOTTOM OF METADATA
});