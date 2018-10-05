function controlResource(values, success, fail)
{
    $.ajax({
    url: 'http'+(global.noCrypto == true ? '' : 's')+'://'+global.server+':'+global.port+'/action?session='+global.session,
    dataType: 'json',
    type: 'post',
    contentType: 'application/x-www-form-urlencoded',
    data: values,
    success: function(data, textStatus, jQxhr) {success(data, textStatus, jQxhr)},
    error: function(jqXhr, textStatus, errorThrown) {fail(jqXhr, textStatus, errorThrown)}
    });
}


function successCallback(data, textStatus, jQxhr)
{
    if (data.status != 'OK')
        myAlert('Status: '+data.status, 'Błąd!');
}

function failCallback(jqXhr, textStatus, errorThrown)
{
    myAlert("Błąd podczas połączenia: "+textStatus+": "+jqXhr.status+": "+jqXhr.textStatus, 'Błąd sieci!');
}


function clickLightSwitch(elem)
{
    controlResource({id: elem.attr('id'), action: elem.hasClass('on') == true ? 'off' : 'on'},
    function( data, textStatus, jQxhr ){ successCallback(data, textStatus, jQxhr); },
    function( jqXhr, textStatus, errorThrown ){ failCallback(jqXhr, textStatus, errorThrown); }
    );
}


function clickBlind(elem)
{
    var e = elem.children('input[type="checkbox"]');
    e.prop("checked", !e.prop("checked"));
}

function clickThermostate(elem)
{
    thermostatesSetElements = elem;
    showTermostatesSet();
}


function clickPartition(elem)
{
    partitionKeypadElements = elem;
    partitionKeypadAction = elem.hasClass('armed') == true ? 'disarm' : 'arm';
    showPartitionKeypad();
}



function uncheckAll(elem)
{
    elem.find('.tile input[type="checkbox"]').prop('checked', false);
}


$(document).ready(function()
{
    //Lights
    $('#menu2_lights img.on').click(function()
    {
        $('#menu2_lights .tile').each(function()
        {
            if($(this).children('input[type="checkbox"]').prop('checked') == true)
            {
                controlResource({id: $(this).attr('id'), action: 'on'},
                function( data, textStatus, jQxhr ){ successCallback(data, textStatus, jQxhr); },
                function( jqXhr, textStatus, errorThrown ){ failCallback(jqXhr, textStatus, errorThrown); }
                );
            }
        });
        uncheckAll($('#menu2_lights'));
    });

    $('#menu2_lights img.off').click(function()
    {
        $('#menu2_lights .tile').each(function()
        {
            if($(this).children('input[type="checkbox"]').prop('checked') == true)
            {
                controlResource({id: $(this).attr('id'), action: 'off'},
                function( data, textStatus, jQxhr ){ successCallback(data, textStatus, jQxhr); },
                function( jqXhr, textStatus, errorThrown ){ failCallback(jqXhr, textStatus, errorThrown); }
                );
            }
        });
        uncheckAll($('#menu2_lights'));
    });

    $('#menu2_lights img.switch').click(function()
    {
        $('#menu2_lights .tile').each(function()
        {
            if($(this).children('input[type="checkbox"]').prop('checked') == true)
            {
                controlResource({id: $(this).attr('id'), action: $(this).hasClass('on') == true ? 'off' : 'on'},
                function( data, textStatus, jQxhr ){ successCallback(data, textStatus, jQxhr); },
                function( jqXhr, textStatus, errorThrown ){ failCallback(jqXhr, textStatus, errorThrown); }
                );
            }
        });
        uncheckAll($('#menu2_lights'));
    });


    //Switches
    $('#menu2_switches img.on').click(function()
    {
        $('#menu2_switches .tile').each(function()
        {
            if($(this).children('input[type="checkbox"]').prop('checked') == true)
            {
                controlResource({id: $(this).attr('id'), action: 'on'},
                function( data, textStatus, jQxhr ){ successCallback(data, textStatus, jQxhr); },
                function( jqXhr, textStatus, errorThrown ){ failCallback(jqXhr, textStatus, errorThrown); }
                );
            }
        });
        uncheckAll($('#menu2_switches'));
    });

    $('#menu2_switches img.off').click(function()
    {
        $('#menu2_switches .tile').each(function()
        {
            if($(this).children('input[type="checkbox"]').prop('checked') == true)
            {
                controlResource({id: $(this).attr('id'), action: 'off'},
                function( data, textStatus, jQxhr ){ successCallback(data, textStatus, jQxhr); },
                function( jqXhr, textStatus, errorThrown ){ failCallback(jqXhr, textStatus, errorThrown); }
                );
            }
        });
        uncheckAll($('#menu2_switches'));
    });

    $('#menu2_switches img.switch').click(function()
    {
        $('#menu2_switches .tile').each(function()
        {
            if($(this).children('input[type="checkbox"]').prop('checked') == true)
            {
                controlResource({id: $(this).attr('id'), action: $(this).hasClass('on') == true ? 'off' : 'on'},
                function( data, textStatus, jQxhr ){ successCallback(data, textStatus, jQxhr); },
                function( jqXhr, textStatus, errorThrown ){ failCallback(jqXhr, textStatus, errorThrown); }
                );
            }
        });
        uncheckAll($('#menu2_switches'));
    });


    //Blinds
    $('#menu2_blinds img.up').click(function()
    {
        $('#menu2_blinds .tile').each(function()
        {
            if($(this).children('input[type="checkbox"]').prop('checked') == true)
            {
                controlResource({id: $(this).attr('id'), action: 'open'},
                function( data, textStatus, jQxhr ){ successCallback(data, textStatus, jQxhr); },
                function( jqXhr, textStatus, errorThrown ){ failCallback(jqXhr, textStatus, errorThrown); }
                );
            }
        });
    });

    $('#menu2_blinds img.stop').click(function()
    {
        console.log($('.tile'));
        $('#menu2_blinds .tile').each(function()
        {
            if($(this).children('input[type="checkbox"]').prop('checked') == true)
            {
                controlResource({id: $(this).attr('id'), action: 'stop'},
                function( data, textStatus, jQxhr ){ successCallback(data, textStatus, jQxhr); },
                function( jqXhr, textStatus, errorThrown ){ failCallback(jqXhr, textStatus, errorThrown); }
                );
            }
        });
    });

    $('#menu2_blinds img.down').click(function()
    {
        $('#menu2_blinds .tile').each(function()
        {
            if($(this).children('input[type="checkbox"]').prop('checked') == true)
            {
                controlResource({id: $(this).attr('id'), action: 'close'},
                function( data, textStatus, jQxhr ){ successCallback(data, textStatus, jQxhr); },
                function( jqXhr, textStatus, errorThrown ){ failCallback(jqXhr, textStatus, errorThrown); }
                );
            }
        });
    });



    //Thermostates
    $('#menu2_thermostates img.activate').click(function()
    {
        $('#menu2_thermostates .tile').each(function()
        {
            if($(this).children('input[type="checkbox"]').prop('checked') == true)
            {
                controlResource({id: $(this).attr('id'), action: 'on'},
                function( data, textStatus, jQxhr ){ successCallback(data, textStatus, jQxhr); },
                function( jqXhr, textStatus, errorThrown ){ failCallback(jqXhr, textStatus, errorThrown); }
                );
            }
        });
        uncheckAll($('#menu2_thermostates'));
    });

    $('#menu2_thermostates img.deactivate').click(function()
    {
        $('#menu2_thermostates .tile').each(function()
        {
            if($(this).children('input[type="checkbox"]').prop('checked') == true)
            {
                controlResource({id: $(this).attr('id'), action: 'off'},
                function( data, textStatus, jQxhr ){ successCallback(data, textStatus, jQxhr); },
                function( jqXhr, textStatus, errorThrown ){ failCallback(jqXhr, textStatus, errorThrown); }
                );
            }
        });
        uncheckAll($('#menu2_thermostates'));
    });

    $('#menu2_thermostates img.set').click(function()
    {
        thermostatesSetElements = null;

        $('#menu2_thermostates .tile').each(function()
        {
            if($(this).children('input[type="checkbox"]').prop('checked') == true)
            {
                if(thermostatesSetElements == null)
                    thermostatesSetElements = $(this);
                else
                thermostatesSetElements = thermostatesSetElements.add($(this));
            }
        });

        if(thermostatesSetElements != null)
        {
            showTermostatesSet();
        }
    });



    //Partitions
    $('#menu2_partitions img.arm').click(function()
    {
        partitionKeypadElements = null;
        partitionKeypadAction = 'arm';

        $('#menu2_partitions .tile').each(function()
        {
            if($(this).children('input[type="checkbox"]').prop('checked') == true)
            {
                if(partitionKeypadElements == null)
                    partitionKeypadElements = $(this);
                else
                    partitionKeypadElements = partitionKeypadElements.add($(this));
            }
        });

        if(partitionKeypadElements != null)
        {
            showPartitionKeypad();
        }
    });

    $('#menu2_partitions img.disarm').click(function()
    {
        partitionKeypadElements = null;
        partitionKeypadAction = 'disarm';

        $('#menu2_partitions .tile').each(function()
        {
            if($(this).children('input[type="checkbox"]').prop('checked') == true)
            {
                if(partitionKeypadElements == null)
                    partitionKeypadElements = $(this);
                else
                    partitionKeypadElements = partitionKeypadElements.add($(this));
            }
        });

        if(partitionKeypadElements != null)
        {
            showPartitionKeypad();
        }
    });

    $('#menu2_partitions img.clear').click(function()
    {
        partitionKeypadElements = null;
        partitionKeypadAction = 'clearAlarm';

        $('#menu2_partitions .tile').each(function()
        {
            if($(this).children('input[type="checkbox"]').prop('checked') == true)
            {
                if(partitionKeypadElements == null)
                    partitionKeypadElements = $(this);
                else
                    partitionKeypadElements = partitionKeypadElements.add($(this));
            }
        });

        if(partitionKeypadElements != null)
        {
            showPartitionKeypad();
        }
    });
});