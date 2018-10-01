function getCredentials()
{
    cred = {};

    global.ss.get(
        function (value) {cred.server = value},
        function (error) {
            if(error.indexOf('not found') == -1)
                messages.message('Błąd odczytu adresu serwera: '+error, 'error', 5000);
            },
        'serverAddress'
    );
    
    global.ss.get(
        function (value) {cred.port = value},
        function (error)
        {
            if (error.indexOf('not found') == -1)
                messages.message('Błąd odczytu portu serwera: '+error, 'error', 5000);
        },
        'serverPort'
    );

    global.ss.get(
        function (value) {cred.username = value},
        function (error) {
            if(error.indexOf('not found') == -1)
                messages.message('Błąd odczytu nazwy użytkownika: '+error, 'error', 5000);
            },
        'username'
    );

    global.ss.get(
        function (value) {cred.password = value},
        function (error)
        {
            if(error.indexOf('not found') == -1)
                messages.message('Błąd odczytu hasła użytkownika: '+error, 'error', 5000);
        },
        'password'
    );

    return cred;
}






function authenticate_user()
{
    var cred = getCredentials();

    if(typeof cred.server === 'undefined' || cred.server == '')
    {
        //myAlert('Nie ustawiono adresu serwera', 'Brak konfiguracji', 'Rozumiem');
        messages.message('Nie ustawiono adresu serwera', 'warning', 0);
        return;
    }

    if(typeof cred.port === 'undefined' || cred.port == '' || cred.port == 0)
    {
        //myAlert('Nie ustawiono portu serwera', 'Brak konfiguracji', 'Rozumiem');
        messages.message('Nie ustawiono portu serwera', 'warning', 0);
        return;
    }

    if(typeof cred.username === 'undefined' || cred.username == '')
    {
        //myAlert('Nie ustawiono nazwy użytkownika', 'Brak konfiguracji', 'Rozumiem');
        messages.message('Nie ustawiono nazwy użytkownika', 'warning', 0);
        return;
    }

    if(typeof cred.password === 'undefined' || cred.password == '')
    {
        //myAlert('Nie ustawiono hasła użytkownika', 'Brak konfiguracji', 'Rozumiem');
        messages.message('Nie ustawiono hasła użytkownika', 'warning', 0);
        return;
    }

    
    var ok = false;

    logout();

    $.ajax({
        url: 'http://'+cred.server+':'+cred.port+'/action',
        dataType: 'json',
        type: 'post',
        async: false,
        contentType: 'application/x-www-form-urlencoded',
        data: {action: 'login', username: cred.username, password: cred.password},
        success: function( data, textStatus, jQxhr ){
            if(data.status == 'badLogin')
                //myAlert('Błędny login lub hasło użytkownika', 'Błąd podczas uwierzytelniania');
                messages.message('Błędny login lub hasło użytkownika', 'error', 0);
            else if(data.status == 'internalError')
                //myAlert('Wewnętrzny błąd serwera podczas uwierzytelniania', 'Błąd podczas uwierzytelniania');
                messages.message('Wewnętrzny błąd serwera podczas uwierzytelniania', 'error', 6500);
            else if (data.status == 'OK')
            {
                messages.message('Użytkownik połączony z serwerem i uwierzytelniony', 'confirmation', 3500);
                global.server = cred.server;
                global.port = cred.port;
                global.session = data.session;
                global.resourcesState.start();
                ok = true;
            }
            else
                //myAlert('Nieznany status podczas uwierzytelniania: '+data.status, 'Błąd podczas uwierzytelniania');
                messages.message('Nieznany status podczas łączenia z serwerem w celu uwierzytelnienia: '+data.status, 'warning', 6500);
        },
        error: function( jqXhr, textStatus, errorThrown )
        {
            //myAlert( "Błąd sieci podczas uwierzytelniania: "+textStatus+": "+jqXhr.status+": "+jqXhr.textStatus, 'Błąd podczas uwierzytelniania');
            messages.message("Błąd sieci podczas łączenia z serwerem w celu uwierzytelnienia: "+textStatus+": "+jqXhr.status+": "+jqXhr.textStatus+'. Oznacza to przeważnie że serwer jest wyłączony lub niedostępny.', 'error', 6500);
        }
    });

    if(ok == false)
        setTimeout(function(){authenticate_user();}, 7000)
}


function logout()
{
    if(global.session != null)
    {
        $.ajax({
            url: 'http://'+cred.server+':'+cred.port+'/action',
            dataType: 'json',
            type: 'post',
            async: false,
            contentType: 'application/x-www-form-urlencoded',
            data: {action: 'logout'},
            success: function( data, textStatus, jQxhr )
            {
                global.session = null;
            },
            error: function( jqXhr, textStatus, errorThrown )
            {
                //myAlert( "Błąd sieci podczas wylogowywania: "+textStatus+": "+jqXhr.status+": "+jqXhr.textStatus, 'Błąd podczas uwierzytelniania');
                messages.message("Błąd sieci podczas wylogowywania: "+textStatus+": "+jqXhr.status+": "+jqXhr.textStatus, 'error', 10000);
            }
        });
    }
}