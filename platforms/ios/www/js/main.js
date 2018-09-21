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


        if($('#menuIcon').hasClass('open') == true)
        {
            $('#menu1').css({top: topBarHeight, left: 0, height: $('.menu1_ img').outerHeight(true) + max_text});
        }
        else
        {
            $('#menu1').css({top: -max_text + topBarHeight, left: 0, height: $('.menu1_ img').outerHeight(true) + max_text});
        }


        $('.menu2_').each(function()
        {
            $(this).css({top: topBarHeight+$('.menu1_ img').outerHeight(true), left: 0, width: '100%', height: $(window).height()-(topBarHeight+$('.menu1_ img').outerHeight(true)+$('#menu3').outerHeight(true))})
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
        });
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


$(document).ready(function ()
{
    $('.menu1_text_landscape').each(function(){addLettersToPortrait($(this))});

    onResize();
    $(window).resize(function(){ onResize(); });

    $('#menuIcon').click(function() {$(this).toggleClass('open'); adjustMenu();});

    $('.menu1_').click(function(){clickOnMenu($(this))});

    $('.menu2_close').click(function(){closeMenu($(this).parent().parent())});
});