global.resourcesState = {
    sse: null,
    updateStateLast: null,
    updateStateFirstConnection: false,
    start: function () {
        this.sse = new EventSource('http'+(global.noCrypto == true ? '' : 's')+'://' + global.server + ':' + global.port + '/state?session=' + global.session);

        /*this.sse.onerror = function(e)
        {
            myAlert('Błąd SSE: '+e);
            console.log(e);
        }*/

        this.sse.addEventListener('addResource', function (e) {
            var data = JSON.parse(e.data);

            console.log(data);

            var type;
            if (data.type == 'sensor')
                type = 'sensors';
            else if (data.type == 'partition' || data.type == 'partition24')
                type = 'partitions';
            else if (data.type == 'output' || data.type == 'outputGroup')
                type = 'switches';
            else if (data.type == 'light' || data.type == 'lightGroup')
                type = 'lights';
            else if (data.type == 'blind' || data.type == 'blindGroup')
                type = 'blinds';
            else if (data.type == 'thermometer')
                type = 'thermometer';
            else if (data.type == 'thermostate' || data.type == 'thermostateGroup')
                type = 'thermostates';

            //Dodawanie kafelka
            if (type != 'thermometer')
            {
                if ($('#' + data.id).length < 1) {
                    var elem = $('#menu2_' + type + ' .tiles .tile.template').clone();
                    elem.removeClass('template');
                    elem.attr('id', data.id);
                    elem.children('.name').text(data.name);
                    elem.data('type', type);

                    if (type == 'thermostates') {
                        elem.children('.on_and_temp').children('.temp').addClass('thermometer_id_' + data.thermometer);
                    }

                    if(type == 'sensors')
                    {
                        elem.addClass('sensorType-'+data.sensorType);
                    }

                    //Akcje po kliknięciu
                    if (type == 'lights' || type == 'switches')
                    {
                        elem.click(function(){clickLightSwitch($(this))}).children('input[type="checkbox"]').click(function(e){e.stopPropagation();});
                    }
                    else if(type == 'blinds')
                    {
                        elem.click(function(){clickBlind($(this))}).children('input[type="checkbox"]').click(function(e){e.stopPropagation();});
                    }
                    else if(type == 'thermostates')
                    {
                        elem.click(function(){clickThermostate($(this))}).children('input[type="checkbox"]').click(function(e){e.stopPropagation();});
                    }
                    else if(type == 'partitions')
                    {
                        elem.click(function(){clickPartition($(this))}).children('input[type="checkbox"]').click(function(e){e.stopPropagation();});
                    }

                    elem.data('order', data.order);

                    var inserted = false;
                    $('#menu2_' + type + ' .tiles .tile').each(function()
                    {
                        if(parseInt($(this).data('order')) > data.order)
                        {
                            elem.insertBefore($(this));
                            inserted = true;
                            return false;
                        }
                    });

                    if(inserted == false)
                    {
                        $('#menu2_' + type + ' .tiles').append(elem);
                    }

                    $('#menu1_' + type).show();
                }
            }
            else
            {
                global.thermometers[data.id] = 1;
            }

            adjustMenu();
        });


        this.sse.addEventListener('resourceState', function (e) {
            var data = JSON.parse(e.data);

            console.log(data);

            if (typeof global.thermometers[data.id] !== 'undefined' && global.thermometers[data.id] == 1) {
                elem = $('.thermometer_id_' + data.id);
                type = 'thermometer';
            }
            else {
                var elem = $('#' + data.id);
                var type = elem.data('type');
            }


            if (type == 'lights' || type == 'switches')
            {
                if (parseInt(data.value) > 0)
                {
                    elem.addClass('on');
                }
                else
                {
                    elem.removeClass('on');
                }
            }
            else if (type == 'blinds') {
                elem.removeClass('up');
                elem.removeClass('down');

                if (data.state == 1)
                    elem.addClass('up');
                else if (data.state == 2)
                    elem.addClass('down');


                elem.removeClass('state0').removeClass('state25').removeClass('state50').removeClass('state75').removeClass('state100');

                if (data.openState < 20)
                    elem.addClass('state0');
                else if (data.openState < 40)
                    elem.addClass('state25');
                else if (data.openState < 60)
                    elem.addClass('state50');
                else if (data.openState < 80)
                    elem.addClass('state75');
                else
                    elem.addClass('state100');
            }
            else if (type == 'thermostates') {
                if (data.isActive == true)
                    elem.addClass('active');
                else
                    elem.removeClass('active');


                if (data.isOn == true) {
                    elem.addClass('on').removeClass('off')
                }
                else {
                    elem.addClass('off').removeClass('on');
                }

                elem.children('.set').text(Math.floor(data.temp / 10) + '.' + (data.temp % 10));
            }
            else if (type == 'thermometer') {
                elem.text(Math.floor(data.temp / 10) + '.' + (data.temp % 10));
            }
            else if (type == 'partitions') {
                if (data.isArmed == true)
                    elem.addClass('armed');
                else
                    elem.removeClass('armed');

                if (data.isAlarm == true)
                    elem.addClass('alarm');
                else
                    elem.removeClass('alarm');

                if (data.isSabotaged == true)
                    elem.addClass('sabotaged');
                else
                    elem.removeClass('sabotaged');
            }
            else if (type == 'sensors') {
                elem.removeClass('on').removeClass('sabotaged').removeClass('blocked');

                if (data.value == 102)
                    elem.addClass('on');
                else if (data.value == 103)
                    elem.addClass('sabotaged');
                else if (data.value == 254)
                    elem.addClass('blocked');
            }
        });
    },
    updateState: function () {
        if (this.sse != null)
        {
            if (this.sse.readyState == 1)
            {
                $('.connectionState').addClass('connected');
                this.updateStateFirstConnection = true;
                this.updateStateLast = 'connected';
            }
            else
            {
                $('.connectionState').removeClass('connected');
                if(this.updateStateFirstConnection == true && this.updateStateLast == 'connected')
                {
                    this.stop();
                    messages.message('Rozłączono z serwerem!', 'warning', '7000');
                    setTimeout(function(){authenticate_user();}, 1000);
                }
                this.updateStateLast = 'disconected';
            }
        }
    },
    stop: function () {
        if (this.sse != null)
            this.sse.close();
    }
}