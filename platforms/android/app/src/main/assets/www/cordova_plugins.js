cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-httpd.CorHttpd",
    "file": "plugins/cordova-plugin-httpd/www/CorHttpd.js",
    "pluginId": "cordova-plugin-httpd",
    "clobbers": [
      "cordova.plugins.CorHttpd"
    ]
  },
  {
    "id": "cordova-plugin-secure-storage.SecureStorage",
    "file": "plugins/cordova-plugin-secure-storage/www/securestorage.js",
    "pluginId": "cordova-plugin-secure-storage",
    "clobbers": [
      "SecureStorage"
    ]
  },
  {
    "id": "cordova-plugin-secure-storage.sjcl_ss",
    "file": "plugins/cordova-plugin-secure-storage/www/sjcl_ss.js",
    "pluginId": "cordova-plugin-secure-storage",
    "runs": true
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
  },
  {
    "id": "cordova-plugin-insomnia.Insomnia",
    "file": "plugins/cordova-plugin-insomnia/www/Insomnia.js",
    "pluginId": "cordova-plugin-insomnia",
    "clobbers": [
      "window.plugins.insomnia"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-httpd": "0.9.3",
  "cordova-plugin-secure-storage": "2.6.8",
  "es6-promise-plugin": "4.1.0",
  "cordova-plugin-rtsp-vlc": "3.0.4",
  "cordova-plugin-insomnia": "4.3.0"
};
// BOTTOM OF METADATA
});