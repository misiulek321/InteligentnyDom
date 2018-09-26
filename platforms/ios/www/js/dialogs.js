var thermostatesSetElements;
var partitionKeypadElements;
var partitionKeypadAction;

function showTermostatesSet()
{
    var temp = 0;

    thermostatesSetElements.each(function()
    {
        temp += parseFloat($(this).find('.set').text());
    });
    temp = (temp/thermostatesSetElements.length).toFixed(1);

    var on = true;
    if(thermostatesSetElements.length < 2)
        on = thermostatesSetElements.hasClass('active');

    $('#blackout').fadeIn(300);

    var elem = $('#thermostatesSet');

    elem.find('input.temp').val(temp);
    elem.find('.switch input[type="checkbox"]').prop('checked', on);

    elem.show('puff', {}, 300);
}

function hideTermostatesSet()
{
    $('#blackout').fadeOut(300);
    $('#thermostatesSet').hide('drop', {}, 300);
}


function addToTempThermostatesSet(value)
{
    var temp = $('#thermostatesSet input.temp');
    temp.val((parseFloat(temp.val())+value).toFixed(1));
}


$(document).ready(function()
{
    $('#thermostatesSet .ppp').click(function(){ addToTempThermostatesSet(5); });
    $('#thermostatesSet .pp').click(function(){ addToTempThermostatesSet(1); });
    $('#thermostatesSet .p').click(function(){ addToTempThermostatesSet(0.1); });
    $('#thermostatesSet .mmm').click(function(){ addToTempThermostatesSet(-5); });
    $('#thermostatesSet .mm').click(function(){ addToTempThermostatesSet(-1); });
    $('#thermostatesSet .m').click(function(){ addToTempThermostatesSet(-0.1); });

    $('#thermostatesSet .close').click(function() { hideTermostatesSet(); });
    $('#thermostatesSet .apply').click(function()
    {
        thermostatesSetElements.each(function()
        {
            var temp = parseFloat($('#thermostatesSet input.temp').val());

            controlResource({id: $(this).attr('id'), action: 'setTempAndActivation', temp: parseInt(temp*10), activation: $('#thermostatesSet .switch input[type="checkbox"]').prop('checked')},
            function( data, textStatus, jQxhr ){ successCallback(data, textStatus, jQxhr); },
            function( jqXhr, textStatus, errorThrown ){ failCallback(jqXhr, textStatus, errorThrown); }
            );
        });

        hideTermostatesSet();
    });
});








function showPartitionKeypad()
{
    $('#blackout').fadeIn(300);

    $('#partitionKeypad').show('puff', {}, 300);
}

function hidePartitionKeypad()
{
    $('#blackout').fadeOut(300);
    $('#partitionKeypad').hide('drop', {}, 300);
}

function addDigitToPasswordPartitionKeypad(digit)
{
    var elem = $('#partitionKeypad .password');

    elem.val(elem.val()+digit);
}

$(document).ready(function()
{
    $('#partitionKeypad .key0').click(function() { addDigitToPasswordPartitionKeypad('0'); });
    $('#partitionKeypad .key1').click(function() { addDigitToPasswordPartitionKeypad('1'); });
    $('#partitionKeypad .key2').click(function() { addDigitToPasswordPartitionKeypad('2'); });
    $('#partitionKeypad .key3').click(function() { addDigitToPasswordPartitionKeypad('3'); });
    $('#partitionKeypad .key4').click(function() { addDigitToPasswordPartitionKeypad('4'); });
    $('#partitionKeypad .key5').click(function() { addDigitToPasswordPartitionKeypad('5'); });
    $('#partitionKeypad .key6').click(function() { addDigitToPasswordPartitionKeypad('6'); });
    $('#partitionKeypad .key7').click(function() { addDigitToPasswordPartitionKeypad('7'); });
    $('#partitionKeypad .key8').click(function() { addDigitToPasswordPartitionKeypad('8'); });
    $('#partitionKeypad .key9').click(function() { addDigitToPasswordPartitionKeypad('9'); });
    $('#partitionKeypad .keyBack').click(function()
    {
        $('#partitionKeypad .password').val($('#partitionKeypad .password').val().substring(0, $('#partitionKeypad .password').val().length-1));
    });

    $('#partitionKeypad .cancel').click(function() { hidePartitionKeypad(); });
    $('#partitionKeypad .apply').click(function()
    {
        partitionKeypadElements.each(function()
        {
            controlResource({id: $(this).attr('id'), action: partitionKeypadAction, password: $('#partitionKeypad .password').val()},
            function( data, textStatus, jQxhr ){ successCallback(data, textStatus, jQxhr); },
            function( jqXhr, textStatus, errorThrown ){ failCallback(jqXhr, textStatus, errorThrown); }
            );
        });

        $('#partitionKeypad .password').val("");
        hidePartitionKeypad();
    });
});