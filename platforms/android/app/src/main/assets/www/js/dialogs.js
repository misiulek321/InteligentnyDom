var thermostatesSetElements;
var partitionKeypadElements;
var partitionKeypadAction;


function showConfiguration()
{
    messages.closeMessage();

    /*global.ss.get(
        function (value) {$('#configuration_server_address').css('fontStyle', 'normal').val(value)},
        function (error) {
            if(error.indexOf('not found') == -1)
                $('#configuration_server_address').css('fontStyle', 'italic').val(error);
            else
                $('#configuration_server_address').css('fontStyle', 'normal').val('');
            },
        'serverAddress'
    );*/

    $('#configuration_server_address').css('fontStyle', 'normal').val(window.localStorage.getItem('serverAddress'));
    
    /*global.ss.get(
        function (value) {$('#configuration_server_port').prop('type', 'number').css('fontStyle', 'normal').val(value)},
        function (error)
        {
            if(error.indexOf('not found') == -1)
                $('#configuration_server_port').prop('type', 'text').css('fontStyle', 'italic').val(error);
            else
                $('#configuration_server_port').prop('type', 'number').css('fontStyle', 'normal').val('');
        },
        'serverPort'
    );*/

    $('#configuration_server_port').prop('type', 'number').css('fontStyle', 'normal').val(window.localStorage.getItem('serverPort'));


    $('#configuration_no_crypto').prop('checked', window.localStorage.getItem('noCrypto') == 'true' ? true : false);


    $('#configuration_username').css('fontStyle', 'normal').val(window.localStorage.getItem('username'));

    $('#configuration_password').prop('type', 'password').css('fontStyle', 'normal').val(window.localStorage.getItem('password') != '' && window.localStorage.getItem('password') !== 'undefined' ? '********' : '');

    /*global.ss.get(
        function (value) {$('#configuration_username').css('fontStyle', 'normal').val(value)},
        function (error) {
            if(error != 'Error: "Key "username" not found."')
                $('#configuration_username').css('fontStyle', 'italic').val(error);
            else
                $('#configuration_username').css('fontStyle', 'normal').val('');
            },
        'username'
    );

    global.ss.get(
        function (value) {$('#configuration_password').prop('type', 'password').css('fontStyle', 'normal').val('********')},
        function (error)
        {
            if(error != 'Error: "Key "password" not found."')
                $('#configuration_password').prop('type', 'text').css('fontStyle', 'italic').val(error);
            else
                $('#configuration_password').prop('type', 'password').css('fontStyle', 'normal').val('');
        },
        'password'
    );*/



    //$('#configuration_always_on_display').prop('checked', window.localStorage.getItem('alwaysOnDisplay') == 'true' ? true : false);

    $('#configuration_on_arming_disarming_sound').prop('checked', window.localStorage.getItem('onArmingDisarmingSound') == 'true' ? true : false);

    $('#configuration_system_keyboard_for_password').prop('checked', window.localStorage.getItem('systemKeyboardForPassword') == 'true' ? true : false);
    

    var background = (window.localStorage.getItem('background') == null ? 1 : window.localStorage.getItem('background'));
    $('#configuration_background input[value="'+background+'"][type="radio"]').prop('checked', true);

    var background_url = (window.localStorage.getItem('background_url') == null ? 'http://10.0.1.1:8888/obrotowa.mjpeg' : window.localStorage.getItem('background_url'));
    $('#configuration_background input[type="url"]').val(background_url);
    

    $('#configuration_app_always_active').prop('checked', window.localStorage.getItem('appAlwaysActive') == 'true' ? true : false);

    $('#configuration_resource_that_unlock').val(window.localStorage.getItem('resourceThatUnlock'));

    $('#configuration_screen_lock_timeout').val(window.localStorage.getItem('screenLockTimeout'));

    $('#configuration_therm_to_permanent_display').val(window.localStorage.getItem('thermToPermanentDisplay') == null ? '' : window.localStorage.getItem('thermToPermanentDisplay'));

    $('#configuration').fadeIn(300);
}


function closeConfiguration()
{
    $('#configuration_password').val('');
    $('#configuration').fadeOut(300);
}


$(document).ready(function()
{
    $('#configuration .configuration_close').click(function(){closeConfiguration()});

    $('#configuration .configuration_save').click(function()
    {
        var ok = true;
        //if($('#configuration_server_address').val().indexOf('not found') == -1)
        //{
            /*global.ss.set(
                function(){},
                function (error) {myAlert('Błąd podczas zapisu adresu serwera: '+error), 'Błąd podczas zapisu ustawień'},
                'serverAddress',
                $('#configuration_server_address').val()
            );*/

            window.localStorage.setItem('serverAddress', $('#configuration_server_address').val());
        //}

        //if($('#configuration_server_port').val().indexOf('not found') == -1)
        //{
            /*global.ss.set(
                function(){},
                function (error) {myAlert('Błąd podczas zapisu portu serwera: '+error), 'Błąd podczas zapisu ustawień'},
                'serverPort',
                $('#configuration_server_port').val()
            );*/

            window.localStorage.setItem('serverPort', $('#configuration_server_port').val());
        //}

        window.localStorage.setItem('noCrypto', $('#configuration_no_crypto').prop('checked'));

        window.localStorage.setItem('username', $('#configuration_username').val());

        /*if($('#configuration_username').val().indexOf('not found') == -1)
        {
            global.ss.set(
                function()
                {*/
                    if($('#configuration_password').val().indexOf('not found') == -1 && $('#configuration_password').val() != '********')
                    {
                        window.localStorage.setItem('password', $('#configuration_password').val());
                        
                        /*global.ss.set(
                            function()
                            {
                                global.resourcesState.stop();
                                messages.message('Czekaj...', 'info', 10000);
                                closeConfiguration();
                            },
                            function (error)
                            {
                                //myAlert('Błąd podczas szyfrowania i zapisu hasła użytkownika: '+error, 'Błąd podczas zapisu ustawień');
                                messages.message('Błąd podczas szyfrowania i zapisu hasła użytkownika: '+error, 'error', 5000);
                                ok = false;
                                closeConfiguration();
                            },
                            'password',
                            $('#configuration_password').val()
                        );*/
                    }
                /*},
                function (error)
                {
                    //myAlert('Błąd podczas szyfrowania i zapisu nazwy użytkownika: '+error, 'Błąd podczas zapisu ustawień');
                    messages.message('Błąd podczas szyfrowania i zapisu nazwy użytkownika: '+error, 'error', 5000);
                    ok = false;
                    closeConfiguration();
                },
                'username',
                $('#configuration_username').val()
            );
        }*/



        //window.localStorage.setItem('alwaysOnDisplay', $('#configuration_always_on_display').prop('checked'));
        /*if(window.localStorage.getItem('alwaysOnDisplay') == 'true')
        {
            window.plugins.insomnia.keepAwake();
            global.alwaysOnDisplayTimer = setInterval(function(){window.plugins.insomnia.keepAwake();}, 20000);
        }
        else
        {
            clearInterval(global.alwaysOnDisplayTimer);
            window.plugins.insomnia.allowSleepAgain();
        }*/

        window.localStorage.setItem('onArmingDisarmingSound', $('#configuration_on_arming_disarming_sound').prop('checked'));

        window.localStorage.setItem('systemKeyboardForPassword', $('#configuration_system_keyboard_for_password').prop('checked'));
        setApplicationOrSystemAlarmKeyboard();

        
        var background = $("#configuration_background input[type='radio']:checked").val();
        window.localStorage.setItem('background', background);
        setBackground(background);


        window.localStorage.setItem('appAlwaysActive', $('#configuration_app_always_active').prop('checked'));
        setAppAlwaysActive()

        window.localStorage.setItem('resourceThatUnlock', $('#configuration_resource_that_unlock').val());

        window.localStorage.setItem('screenLockTimeout', $('#configuration_screen_lock_timeout').val());

        window.localStorage.setItem('thermToPermanentDisplay', $('#configuration_therm_to_permanent_display').val());

        setThermometerVisible();


        if(ok == true)
            messages.message('Konfiguracja zapisana', 'info', 2500);

        //myAlert('Aby zastosować nową konfigurację uruchom ponownie aplikację!', 'Informacja');
        
    });
});



function showTermostatesSet()
{
    var temp = 0;

    thermostatesSetElements.each(function()
    {
        temp += parseFloat($(this).find('.set').text());
    });
    temp = (temp/thermostatesSetElements.length).toFixed(1);

    var on = true;
    if(thermostatesSetElements.length < 2)
        on = thermostatesSetElements.hasClass('active');

    $('#blackout').fadeIn(300);

    var elem = $('#thermostatesSet');

    elem.find('input.temp').val(temp);
    elem.find('.toggleButton input[type="checkbox"]').prop('checked', on);

    elem.show('puff', {}, 300);
}

function hideTermostatesSet()
{
    $('#blackout').fadeOut(300);
    $('#thermostatesSet').hide('drop', {}, 300);
}


function addToTempThermostatesSet(value)
{
    var temp = $('#thermostatesSet input.temp');
    temp.val((parseFloat(temp.val())+value).toFixed(1));
}


function showTermostatesPlusMinus()
{
    $('#blackout').fadeIn(300);

    var elem = $('#thermostatesPlusMinus');

    elem.show('puff', {}, 300);

    elem.find('input.temp').val('').focus();
}

function hideTermostatesPlusMinus()
{
    $('#blackout').fadeOut(300);
    $('#thermostatesPlusMinus').hide('drop', {}, 300);
}

function addToTempThermostatesPlusMinus(value)
{
    var temp = $('#thermostatesPlusMinus input.temp');
    temp.val((parseFloat(temp.val() == '' ? 0 : temp.val())+value).toFixed(1));
}


$(document).ready(function()
{
    $('#thermostatesSet .ppp').click(function(){ addToTempThermostatesSet(5); });
    $('#thermostatesSet .pp').click(function(){ addToTempThermostatesSet(1); });
    $('#thermostatesSet .p').click(function(){ addToTempThermostatesSet(0.1); });
    $('#thermostatesSet .mmm').click(function(){ addToTempThermostatesSet(-5); });
    $('#thermostatesSet .mm').click(function(){ addToTempThermostatesSet(-1); });
    $('#thermostatesSet .m').click(function(){ addToTempThermostatesSet(-0.1); });

    $('#thermostatesSet .thermostatesSetDelete .x').click(function()
    {
        $('#thermostatesSet input.temp').val('');
        $('#thermostatesSet input.temp').focus();
    });

    $('#thermostatesSet .close').click(function() { hideTermostatesSet(); });
    $('#thermostatesSet .apply').click(function()
    {
        thermostatesSetElements.each(function()
        {
            var temp = parseFloat($('#thermostatesSet input.temp').val());

            controlResource({id: $(this).attr('id'), action: 'setTempAndActivation', temp: parseInt(temp*10), activation: $('#thermostatesSet .toggleButton input[type="checkbox"]').prop('checked')},
            function( data, textStatus, jQxhr ){ successCallback(data, textStatus, jQxhr); },
            function( jqXhr, textStatus, errorThrown ){ failCallback(jqXhr, textStatus, errorThrown); }
            );
        });

        hideTermostatesSet();
        uncheckAll($('#menu2_thermostates'));
    });



    $('#thermostatesPlusMinus .ppp').click(function(){ addToTempThermostatesPlusMinus(5); });
    $('#thermostatesPlusMinus .pp').click(function(){ addToTempThermostatesPlusMinus(1); });
    $('#thermostatesPlusMinus .p').click(function(){ addToTempThermostatesPlusMinus(0.1); });
    $('#thermostatesPlusMinus .mmm').click(function(){ addToTempThermostatesPlusMinus(-5); });
    $('#thermostatesPlusMinus .mm').click(function(){ addToTempThermostatesPlusMinus(-1); });
    $('#thermostatesPlusMinus .m').click(function(){ addToTempThermostatesPlusMinus(-0.1); });


    $('#thermostatesPlusMinus .close').click(function() { hideTermostatesPlusMinus(); });
    $('#thermostatesPlusMinus .apply').click(function()
    {
        thermostatesSetElements.each(function()
        {
            var temp = parseFloat($('#thermostatesPlusMinus input.temp').val());

            controlResource({id: $(this).attr('id'), action: 'setTempAndActivation', temp: (parseFloat($(this).find('.set').text())*10)+parseInt(temp*10), activation: $(this).hasClass('active')},
            function( data, textStatus, jQxhr ){ successCallback(data, textStatus, jQxhr); },
            function( jqXhr, textStatus, errorThrown ){ failCallback(jqXhr, textStatus, errorThrown); }
            );
        });

        hideTermostatesPlusMinus();
        uncheckAll($('#menu2_thermostates'));
    });
});








function showPartitionKeypad()
{
    $('#blackout').fadeIn(300);

    $('#partitionKeypad').show('puff', {}, 300);

    if(window.localStorage.getItem('systemKeyboardForPassword') == 'true')
        $('#partitionKeypad .password').focus();
}

function hidePartitionKeypad()
{
    $('#blackout').fadeOut(300);
    $('#partitionKeypad').hide('drop', {}, 300);
}

function addDigitToPasswordPartitionKeypad(digit)
{
    var elem = $('#partitionKeypad .password');

    elem.val(elem.val()+digit);
}


function delayedOperationsOnPartition(delay, id, action, password)
{
    setTimeout(function()
    {
        controlResource({id: id, action: action, password: password},
            function( data, textStatus, jQxhr ){ successCallback(data, textStatus, jQxhr); },
            function( jqXhr, textStatus, errorThrown ){ failCallback(jqXhr, textStatus, errorThrown); }
            );
    }, delay);
}


$(document).ready(function()
{
    $('#partitionKeypad .key0').click(function() { addDigitToPasswordPartitionKeypad('0'); });
    $('#partitionKeypad .key1').click(function() { addDigitToPasswordPartitionKeypad('1'); });
    $('#partitionKeypad .key2').click(function() { addDigitToPasswordPartitionKeypad('2'); });
    $('#partitionKeypad .key3').click(function() { addDigitToPasswordPartitionKeypad('3'); });
    $('#partitionKeypad .key4').click(function() { addDigitToPasswordPartitionKeypad('4'); });
    $('#partitionKeypad .key5').click(function() { addDigitToPasswordPartitionKeypad('5'); });
    $('#partitionKeypad .key6').click(function() { addDigitToPasswordPartitionKeypad('6'); });
    $('#partitionKeypad .key7').click(function() { addDigitToPasswordPartitionKeypad('7'); });
    $('#partitionKeypad .key8').click(function() { addDigitToPasswordPartitionKeypad('8'); });
    $('#partitionKeypad .key9').click(function() { addDigitToPasswordPartitionKeypad('9'); });
    $('#partitionKeypad .keyBack').click(function()
    {
        $('#partitionKeypad .password').val($('#partitionKeypad .password').val().substring(0, $('#partitionKeypad .password').val().length-1));
    });

    $('#partitionKeypad .cancel').click(function() { hidePartitionKeypad(); });
    $('#partitionKeypad .apply').click(function()
    {
        var delay = 0;
        partitionKeypadElements.each(function()
        {
            delayedOperationsOnPartition(delay, $(this).attr('id'), partitionKeypadAction, $('#partitionKeypad .password').val());
            delay = delay + 300;
        });

        $('#partitionKeypad .password').val("");
        hidePartitionKeypad();
        uncheckAll($('#menu2_partitions'));
    });

    $('#partitionKeypad #formPartitionKeypad').submit(function(event)
    {
        $('#partitionKeypad .apply').trigger('click');
        event.preventDefault();
    });
});