resourcesState = {
    sse: null,
    start: function()
    {
        this.sse = new EventSource('http://'+server+':'+port+'/state?session='+session);
        this.sse.onerror = function(e)
        {
            myAlert('Błąd SSE: '+e);
        }
    }
}