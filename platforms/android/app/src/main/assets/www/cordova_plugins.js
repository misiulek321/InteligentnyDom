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
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-httpd": "0.9.3",
  "cordova-plugin-secure-storage": "2.6.8"
};
// BOTTOM OF METADATA
});