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
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-background-mode.BackgroundMode",
    "file": "plugins/cordova-plugin-background-mode/www/background-mode.js",
    "pluginId": "cordova-plugin-background-mode",
    "clobbers": [
      "cordova.plugins.backgroundMode",
      "plugin.backgroundMode"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-httpd": "0.9.3",
  "cordova-plugin-secure-storage": "2.6.8",
  "cordova-plugin-device": "2.0.2",
  "cordova-plugin-background-mode": "0.7.2"
};
// BOTTOM OF METADATA
});