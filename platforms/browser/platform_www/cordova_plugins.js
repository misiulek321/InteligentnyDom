cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.rjfun.cordova.httpd/www/CorHttpd.js",
        "id": "com.rjfun.cordova.httpd.CorHttpd",
        "pluginId": "com.rjfun.cordova.httpd",
        "clobbers": [
            "cordova.plugins.CorHttpd"
        ]
    },
    {
        "file": "plugins/cordova-plugin-secure-storage/www/securestorage.js",
        "id": "cordova-plugin-secure-storage.SecureStorage",
        "pluginId": "cordova-plugin-secure-storage",
        "clobbers": [
            "SecureStorage"
        ]
    },
    {
        "file": "plugins/cordova-plugin-secure-storage/www/sjcl_ss.js",
        "id": "cordova-plugin-secure-storage.sjcl_ss",
        "pluginId": "cordova-plugin-secure-storage",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-insomnia/www/Insomnia.js",
        "id": "cordova-plugin-insomnia.Insomnia",
        "pluginId": "cordova-plugin-insomnia",
        "clobbers": [
            "window.plugins.insomnia"
        ]
    },
    {
        "file": "plugins/cordova-plugin-insomnia/src/browser/Insomnia.js",
        "id": "cordova-plugin-insomnia.InsomniaProxy",
        "pluginId": "cordova-plugin-insomnia",
        "merges": [
            "window.plugins.insomnia"
        ]
    },
    {
        "file": "plugins/es6-promise-plugin/www/promise.js",
        "id": "es6-promise-plugin.Promise",
        "pluginId": "es6-promise-plugin",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-rtsp-vlc/www/VideoPlayerVLC.js",
        "id": "cordova-plugin-rtsp-vlc.VideoPlayerVLC",
        "pluginId": "cordova-plugin-rtsp-vlc",
        "clobbers": [
            "window.VideoPlayerVLC"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.rjfun.cordova.httpd": "0.9.2",
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-secure-storage": "2.6.8",
    "cordova-plugin-insomnia": "4.3.0",
    "es6-promise-plugin": "4.1.0",
    "cordova-plugin-rtsp-vlc": "3.0.4"
}
// BOTTOM OF METADATA
});