/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function()
    {
        secure_starage_init();
        authenticate_user();
        setAppAlwaysActive();
        setThermometerVisible();
        setLockScreenTImeout();
        /*if(window.localStorage.getItem('alwaysOnDisplay') == 'true')
        {
            window.plugins.insomnia.keepAwake();
            global.alwaysOnDisplayTimer = setInterval(function(){window.plugins.insomnia.keepAwake();}, 20000);
        }*/
        //else
            //window.plugins.insomnia.allowSleepAgain();
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/
    },

    start: function() {
        /*httpd = ( cordova && cordova.plugins && cordova.plugins.CorHttpd ) ? cordova.plugins.CorHttpd : null;

        httpd.startServer({
            'www_root' : "",
            'port' : 8080,
            'localhost_only' : false
        }, function( url ){
          // if server is up, it will return the url of http://<server ip>:port/
          // the ip is the active network connection
          // if no wifi or no cell, "127.0.0.1" will be returned.
            alert("Start: "+url);
        }, function( error ){
            alert("Błąd: "+error);
        });*/
    }
};

app.initialize();
//setTimeout(function(){ app.start(); }, 2000);