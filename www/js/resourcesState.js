global.resourcesState = {
    sse: null,
    start: function()
    {
        this.sse = new EventSource('http://'+global.server+':'+global.port+'/state?session='+global.session);
        this.sse.onerror = function(e)
        {
            myAlert('Błąd SSE: '+e);
            console.log(e);
        }

        this.sse.addEventListener('addResource', function (e)
        {
            var data = JSON.parse(e.data);
            var type;
            if(data.type == 'sensor')
                type = 'sensors';
            else if(data.type == 'partition' || data.type == 'partition24')
                type = 'partitions';
            else if(data.type == 'output' || data.type == 'outputGroup')
                type = 'switches';
            else if(data.type == 'light' || data.type == 'lightGroup')
                type = 'lights';
            else if(data.type == 'blind' || data.type == 'blindGroup')
                type = 'blinds';
            else if(data.type == 'thermometer')
                type = 'thermometer';
            else if(data.type == 'thermostate' || data.type == 'thermostateGroup')
                type = 'thermostates';

            if(type != 'thermometer')
            {
                var elem = $('#menu2_'+type+' .tiles .tile.template').clone();
                elem.removeClass('template');
                elem.attr('id', data.id);
                elem.children('.name').text(data.name);
                elem.data('type', type);
                elem.appendTo('#menu2_'+type+' .tiles');

                $('#menu1_'+type).show();
            }

            console.log(data);
        });
    },
    updateState: function()
    {
        if(this.sse != null)
            if(this.sse.readyState == 1)
                $('.connectionState').addClass('connected');
            else
                $('.connectionState').removeClass('connected');
    },
    stop: function()
    {
        if(this.sse != null)
            this.sse.close();
    }
}