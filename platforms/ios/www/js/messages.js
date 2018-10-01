var messages = 
{
    self: this,
    timer: null,
    message: function(text, type, duration)
    {
        if(this.timer != null)
            clearTimeout(this.timer);
        $('#message').removeClass('error').removeClass('warning').removeClass('confirmation').removeClass('info');
        $('#message').addClass(type).html(text).show().css({left: 0, marginLeft: 0}).css('marginLeft', -$('#message').outerWidth()/2).hide().css('left', '50%').fadeIn(300);
        if(duration > 0)
        {
            var thisObj = this;
            this.timer = setTimeout(function(){thisObj.closeMessage();}, duration);
        }
    },
    closeMessage: function()
    {
        $('#message').fadeOut(300);   
    }
}