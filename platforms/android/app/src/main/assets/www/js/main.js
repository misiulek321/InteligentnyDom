var global = {
    resourcesState: null,
    server: null,
    port: null,
    noCrypto: null,
    session: null,
    ss: null,
    thermometers: Array(),
    alwaysOnDisplayTimer: null,
    soundTimer: null,
    soundCounter: 0,
    outTimeTimeout: -1,
    outTimeState: -1,
    inTimeTimeout: -1,
    inTimeState: -1,
    lockScreenTimer: null
}

function myAlert(text, title, button)
{
    /*if(typeof window.cordova !== 'undefined')
    {
        if (typeof title === 'undefined')
            title = 'Informacja';
        
        if (typeof button === 'undefined')
            button = 'OK';

        navigator.notification.alert(text, function(){}, title, button);
    }
    else
    {*/
        alert(text);
    //}
}


function setBackground(number)
{
    document.body.className = 'background'+number;

    if(number != 100)
    {
        $('#background_image').hide();
    }
    else
    {
        setBackgroundImage((window.localStorage.getItem('background_url') == null ? 'http://10.0.1.1:8888/obrotowa.mjpeg' : window.localStorage.getItem('background_url')));
        $('#background_image').show();

        setInterval(function(){setBackgroundImage((window.localStorage.getItem('background_url') == null ? 'http://10.0.1.1:8888/obrotowa.mjpeg' : window.localStorage.getItem('background_url')))}, 60000);
    }
}


function setBackgroundImage(image)
{
    $('#background_image').attr('src', image+'?timestamp='+Date.now());
}


var secure_starage_init = function () {
    global.ss = new cordova.plugins.SecureStorage(
        function () {
            console.log('Secure Storage OK');
        },
        function () {
            navigator.notification.alert(
                'Musisz włączyć zabezpieczenie ekranu blokady. Ta aplikacja nie może inaczej działać bezpiecznie.',
                function () {
                    ss.secureDevice(
                        function () {
                            secure_starage_init();
                        },
                        function () {
                            secure_starage_init();
                        }
                    );
                },
                'Blkoada ekranu jest wyłączona'
            );
        },
        'InteligentnyDom');
};


function replaceAt(string, index, replace)
{
    return string.substring(0, index) + replace + string.substring(index + 1);
}

function onResize()
{
    adjustMenu();
}

function adjustMenu()
{
    var topBarHeight = $('#topBar').outerHeight();

    if($(window).height() >= $(window).width())
    {
        var max_text = 0;
        $('.menu1_text_portrait').each(function()
        {
            var w = $(this).outerHeight(true);
            if(w > max_text)
                max_text = w;
        });

        $('#menu3').css({width: $(window).width(), height: ''});


        //$('#menu1').css('display', 'inline-block');

        if($('#menuIcon').hasClass('open') == true)
        {
            $('#menu1').css({top: topBarHeight, left: 0, height: $('.menu1_ img').outerHeight(true) + max_text});
        }
        else
        {
            $('#menu1').css({top: -max_text + topBarHeight, left: 0, height: $('.menu1_ img').outerHeight(true) + max_text});
        }


        $('.menu2_').each(function(t)
        {
            $(this).css({top: topBarHeight+$('.menu1_ img').outerHeight(true), left: 0, width: '100%', height: $(window).height()-(topBarHeight+$('.menu1_ img').outerHeight(true)+$('#menu3').outerHeight(true))})

            $(this).show();
            var menu_title = $(this).children('.menu2_title').outerHeight(true);
            var groups = ($(this).children('.groups').length > 0 ? $(this).children('.groups').outerHeight(true) : 0);

            $(this).children('.groups').css({justifyContent: 'space-evenly'});

            $(this).children('.actions').css({width: '100%', height: 'auto', marginBottom: '3pt', marginRight: '0pt'});
            
            $(this).children('.tiles').css({height: $(this).height()-menu_title-groups, paddingBottom: $(this).children('.actions').outerHeight(true)+7, paddingRight: 0});
            
            if($('#'+replaceAt($(this).attr('id'), 4, '1')).hasClass('active') != true)
                $(this).hide();
        });
    }
    else
    {
        $('#menu3').css({height: $(window).height()-topBarHeight, width: ''});

        if($('#menuIcon').hasClass('open') == true)
        {
            var max_text = 0;
            $('.menu1_text_landscape').each(function()
            {
                var w = $(this).outerWidth(true);
                if(w > max_text)
                    max_text = w;
            });

            $('#menu1').css({top: topBarHeight, left: -$('#menu1').outerWidth() + $('.menu1_ img').outerWidth(true) + max_text, height: $(window).height()-topBarHeight});
        }
        else
        {
            $('#menu1').css({top: topBarHeight, left: -$('#menu1').outerWidth() + $('.menu1_ img').outerWidth(true), height: $(window).height()-topBarHeight});
        }


        $('.menu2_').each(function()
        {
            $(this).css({top: topBarHeight, left: $('.menu1_ img').outerHeight(true), width: $(window).width()-$('.menu1_ img').outerWidth(true)-$('#menu3').outerWidth(true), height: $(window).height()-topBarHeight})

            $(this).show();
            var menu_title = $(this).children('.menu2_title').outerHeight(true);
            var groups = ($(this).children('.groups').length > 0 ? $(this).children('.groups').outerHeight(true) : 0);

            $(this).children('.groups').css({justifyContent: 'left'});

            $(this).children('.actions').css({width: 'auto', height: $(this).height()-menu_title-groups, marginBottom: '0pt', marginRight: '3pt'});
            
            $(this).children('.tiles').css({height: $(this).height()-menu_title-groups, paddingRight: $(this).children('.actions').outerWidth(true), paddingBottom: 7});
            
            if($('#'+replaceAt($(this).attr('id'), 4, '1')).hasClass('active') != true)
                $(this).hide();
        });

        $('#background_image').css({width: $(window).width()-($('#menu1').outerWidth(true)+parseInt($('#menu1').css('left')))+1, height: $(window).height()-$('#topBar').outerHeight(true), left: $('#menu1').outerWidth(true)+parseInt($('#menu1').css('left'))-1, top: $('#topBar').outerHeight(true)});
    }
}

function addLettersToPortrait(elem)
{
    var text = elem.text();
    var e = elem.parent().children('.menu1_text_portrait');
    for(i = text.length-1; i>=0; i--)
    e.append('<div>'+text.charAt(i)+'</div>');
}


function closeMenu(m)
{
    m.fadeOut(300);

    $('.menu1_').removeClass('active');
}


function clickOnMenu(m)
{
    if(m.hasClass('active') == true)
        return;

    $('.menu1_').removeClass('active');
    m.addClass('active');

    var id = 'menu2_'+m.attr('id').substring(6);

    $('.menu2_').each(function()
    {
        if($(this).attr('id') == id)
        {
            $('#menu2').css({background: 'rgb(60, 60, 60)'});
            $(this).stop().fadeIn(300, function(){$('#menu2').css({background: 'none'});});
        }
        else
            $(this).stop().fadeOut(300);
    });
}


function setApplicationOrSystemAlarmKeyboard()
{
    if(window.localStorage.getItem('systemKeyboardForPassword') == 'true')
    {
        $('.applicationPasswordKeyboard').hide();
        $('#partitionKeypad').addClass('systemKeyboard');
    }
    else
    {
        $('.applicationPasswordKeyboard').show();
        $('#partitionKeypad').removeClass('systemKeyboard');
    }
}


function setAppAlwaysActive()
{
    if(window.localStorage.getItem('appAlwaysActive') == 'true')
    {
        cordova.plugins.backgroundMode.setDefaults({
            title: 'Inteligentny Dom',
            text: 'Działam w tle...',
            resume: true
        });
        cordova.plugins.backgroundMode.enable();
    }
    else
    {
        cordova.plugins.backgroundMode.disable();
    }
}


function setThermometerVisible()
{
    var v = window.localStorage.getItem('thermToPermanentDisplay');
    if(v != '' && v != null)
    {
        $('#thermometer').show();
    }
    else
    {
        $('#thermometer').hide();
    }
}


function setLockScreenTImeout()
{
    if(global.lockScreenTimer != null)
        clearTimeout(global.lockScreenTimer);
    
    global.lockScreenTimer = setTimeout(function()
    {
        $('.menu2_').each(function()
        {
            closeMenu($(this));
        });
    }, window.localStorage.getItem('screenLockTimeout') == null ? 30000 : window.localStorage.getItem('screenLockTimeout')*1000);
}


$(document).ready(function ()
{
    $('.menu1_text_landscape').each(function(){addLettersToPortrait($(this))});

    $('.groups_template *').clone().appendTo('.menu2_ .groups');
    /*$('<div class="group groupUser">ALa ma kota</div>').appendTo('.menu2_ .groups');
    $('<div class="group groupUser">Kot ma Alę</div>').appendTo('.menu2_ .groups');
    $('<div class="group groupUser">Elo alalala</div>').appendTo('.menu2_ .groups');
    $('<div class="group groupUser">Mama mama mama amam</div>').appendTo('.menu2_ .groups');
    $('<div style="clear: both"></div>').appendTo('.menu2_ .groups');*/

    $('.groups .group.checkAll').click(function()
    {
        $(this).parent().parent().children('.tiles').children(':not(.template).tile').children('input[type="checkbox"]').prop('checked', true).change();
    });
    $('.groups .group.uncheckAll').click(function()
    {
        $(this).parent().parent().children('.tiles').children('.tile').children('input[type="checkbox"]').prop('checked', false).change();
    });

    $(window).resize(function(){ onResize(); });
    onResize();

    $('#menuIcon').click(function() {$(this).toggleClass('open'); adjustMenu();});

    $('.menu1_').click(function()
    {
        clickOnMenu($(this));
        if($('#menuIcon').hasClass('open') == true)
        {
            $('#menuIcon').removeClass('open');
            adjustMenu();
        }
    });

    $('.menu2_close').click(function()
    {
        closeMenu($(this).parent().parent())
        $('.tile').find('input[type="checkbox"]').prop('checked', false);
    });

    $('.configuration').click(function(){showConfiguration();});

    $('#topBar .connectionState').click(function()
    {
        global.resourcesState.stop();
    });

    setInterval(function(){global.resourcesState.updateState();}, 100);

    setBackground(window.localStorage.getItem('background') == null ? 1 : window.localStorage.getItem('background'));

    setApplicationOrSystemAlarmKeyboard();

    if(window.localStorage.getItem('screenLockTimeout') == null)
    {
        window.localStorage.setItem('screenLockTimeout', 20);
    }

    $('*').click(function()
    {
        setLockScreenTImeout();
    })

});