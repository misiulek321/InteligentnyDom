function controlResource(values, success, fail)
{
    $.ajax({
    url: 'http://'+global.server+':'+global.port+'/action?session='+global.session,
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
    console.log(data);
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