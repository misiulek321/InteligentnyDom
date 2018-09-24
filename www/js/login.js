function getCredentials()
{
    return {server: '172.16.0.100', port: 1234, username: 'tablet', password: 'tablet'};
}

function authenticate_user()
{
    var cred = getCredentials();

    if(typeof cred.server === 'undefined' || cred.server == '')
    {
        myAlert('Nie ustawiono adresu serwera', 'Brak konfiguracji', 'Rozumiem');
        return;
    }

    if(typeof cred.port === 'undefined' || cred.port == '' || cred.port == 0)
    {
        myAlert('Nie ustawiono portu serwera', 'Brak konfiguracji', 'Rozumiem');
        return;
    }

    if(typeof cred.username === 'undefined' || cred.username == '')
    {
        myAlert('Nie ustawiono nazwy użytkownika', 'Brak konfiguracji', 'Rozumiem');
        return;
    }

    if(typeof cred.password === 'undefined' || cred.password == '')
    {
        myAlert('Nie ustawiono hasła użytkownika', 'Brak konfiguracji', 'Rozumiem');
        return;
    }


    $.ajax({
        url: 'http://'+cred.server+':'+cred.port+'/action',
        dataType: 'json',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: {action: 'login', username: cred.username, password: cred.password},
        success: function( data, textStatus, jQxhr ){
            if(data.status == 'badLogin')
                myAlert('Błędny login lub hasło użytkownika', 'Błąd podczas uwierzytelniania');
            else if(data.status == 'internalError')
                myAlert('Wewnętrzny błąd serwera podczas uwierzytelniania', 'Błąd podczas uwierzytelniania');
            else if (data.status == 'OK')
            {
                //session = data.session;
                server = cred.server;
                port = cred.port;
            }
            else
                myAlert('Nieznany status podczas uwierzytelniania: '+data.status, 'Błąd podczas uwierzytelniania');
        },
        error: function( jqXhr, textStatus, errorThrown ){
            myAlert( "Błąd sieci podczas uwierzytelniania: "+textStatus+": "+jqXhr.status+": "+jqXhr.textStatus, 'Błąd podczas uwierzytelniania');
        }
        }); 
}