function use_authenticate_user_2(a, c)
{
    if(a[2]+a[3] >= 2)
        authenticate_user_2(c);
}


function authenticate_user()
{
    messages.message('Deszyfrowanie danych...', 'info', 10000);
    cred = {};
    a = Array(0, 0, 0, 0);

    /*global.ss.get(
        function (value)
        {
            cred.server = value
            a[0] = 1;
            use_authenticate_user_2(a, cred);
        },
        function (error) {
            if(error.indexOf('not found') == -1)
                messages.message('Błąd odczytu adresu serwera: '+error, 'error', 5000);
            a[0] = 1;
            use_authenticate_user_2(a, cred);
            },
        'serverAddress'
    );*/

    cred.server = window.localStorage.getItem('serverAddress');
    
    /*global.ss.get(
        function (value)
        {
            cred.port = value
            a[1] = 1;
            use_authenticate_user_2(a, cred);
        },
        function (error)
        {
            if (error.indexOf('not found') == -1)
                messages.message('Błąd odczytu portu serwera: '+error, 'error', 5000);
            a[1] = 1;
            use_authenticate_user_2(a, cred);
        },
        'serverPort'
    );*/

    cred.port = window.localStorage.getItem('serverPort');

    cred.noCrypto = window.localStorage.getItem('noCrypto') == 'true' ? true : false;

    global.ss.get(
        function (value)
        {
            cred.username = value
            a[2] = 1;
            use_authenticate_user_2(a, cred);
        },
        function (error) {
            if(error.indexOf('not found') == -1)
                messages.message('Błąd odczytu nazwy użytkownika: '+error, 'error', 5000);
            a[2] = 1;
            use_authenticate_user_2(a, cred);
            },
        'username'
    );

    global.ss.get(
        function (value)
        {
            cred.password = value
            a[3] = 1;
            use_authenticate_user_2(a, cred);
        },
        function (error)
        {
            if(error.indexOf('not found') == -1)
                messages.message('Błąd odczytu hasła użytkownika: '+error, 'error', 5000);
            a[3] = 1;
            use_authenticate_user_2(a, cred);
        },
        'password'
    );

}




function authenticate_user_2(cred)
{
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
        url: 'http'+(cred.noCrypto == true ? '' : 's')+'://'+cred.server+':'+cred.port+'/action',
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
                global.noCrypto = cred.noCrypto;
                global.session = data.session;
                global.resourcesState.start();
                ok = true;
            }
            else
                //myAlert('Nieznany status podczas uwierzytelniania: '+data.status, 'Błąd podczas uwierzytelniania');
                messages.message('Nieznany status podczas łączenia z serwerem w celu uwierzytelnienia: <b>'+data.status+'</b>', 'warning', 6500);
        },
        error: function( jqXhr, textStatus, errorThrown )
        {
            //myAlert( "Błąd sieci podczas uwierzytelniania: "+textStatus+": "+jqXhr.status+": "+jqXhr.textStatus, 'Błąd podczas uwierzytelniania');
            messages.message("Błąd sieci podczas łączenia z serwerem w celu uwierzytelnienia: <b>"+textStatus+": "+jqXhr.status+": "+jqXhr.textStatus+'</b>. Oznacza to przeważnie że serwer jest wyłączony lub niedostępny.', 'error', 6500);
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
            url: 'http'+(global.noCrypto == true ? '' : 's')+'://'+global.server+':'+global.port+'/action',
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