function dayOfWeek(n)
{
    if (n == 0)
        return "Niedziela";
    if (n == 1)
        return "Poniedziałek";
    if (n == 2)
        return "Wtorek";
    if (n == 3)
        return "Środa";
    if (n == 4)
        return "Czwartek";
    if (n == 5)
        return "Piątek";
    if (n == 6)
        return "Sobota";
}


function zero(n)
{
    if(n < 10)
        return '0'+n;
    else
        return n;
}


function updateDateTime()
{
    var d = new Date();

    $('#time').text(d.getHours()+':'+zero(d.getMinutes())+':'+zero(d.getSeconds()));
    $('#date').text(dayOfWeek(d.getDay())+', '+d.getDate()+'.'+zero(d.getMonth()+1)+'.'+d.getFullYear()+'r.');
}



$(document).ready(function()
{
    setInterval(function(){updateDateTime()}, 1000);
    updateDateTime();
});