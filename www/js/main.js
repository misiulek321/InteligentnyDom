function onResize()
{
    adjustMenu();
}

function adjustMenu()
{
    var topBarHeight = $('#topBar').outerHeight();

    if($(document).height() >= $(document).width())
    {
        var max_text = 0;
        $('.menu1_text_portrait').each(function()
        {
            var w = $(this).outerHeight(true);
            if(w > max_text)
                max_text = w;
        });

        if($('#menuIcon').hasClass('open') == true)
        {
            $('#menu1').css({top: topBarHeight, left: 0, height: $('.menu1_ img').outerHeight(true) + max_text});
        }
        else
        {
            $('#menu1').css({top: -max_text + topBarHeight, left: 0, height: $('.menu1_ img').outerHeight(true) + max_text});
        }
    }
    else
    {
        if($('#menuIcon').hasClass('open') == true)
        {
            var max_text = 0;
            $('.menu1_text_landscape').each(function()
            {
                var w = $(this).outerWidth(true);
                if(w > max_text)
                    max_text = w;
            });

            $('#menu1').css({top: topBarHeight, left: -$('#menu1').outerWidth() + $('.menu1_ img').outerWidth(true) + max_text, height: $(document).height()-topBarHeight});
        }
        else
        {
            $('#menu1').css({top: topBarHeight, left: -$('#menu1').outerWidth() + $('.menu1_ img').outerWidth(true), height: $(document).height()-topBarHeight});
        }
    }
}

function addLettersToPortrait(elem)
{
    var text = elem.text();
    var e = elem.parent().children('.menu1_text_portrait');
    for(i = text.length-1; i>=0; i--)
    e.append('<div>'+text.charAt(i)+'</div>');
}


$(document).ready(function ()
{
    $('.menu1_text_landscape').each(function(){addLettersToPortrait($(this))});

    onResize();
    $(window).resize(function(){ onResize(); });

    $('#menuIcon').click(function() {$(this).toggleClass('open'); adjustMenu();});
});