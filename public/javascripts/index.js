var roomId;

var poll = function() {
    var yt = $('#googleYouTube')[0];
    yt_data = {
        id: roomId,
        currenttime: yt.currenttime,
        state: yt.state,
        videoId: yt.videoId
    }
    socket.emit('update',yt_data);
    //console.log(yt_data);
}

var emit = function(){
    var oReq = new XMLHttpRequest();
    oReq.open("POST", "/?url="+$('input').val(), true);
    oReq.onloadend = function(data){
        var response = JSON.parse(oReq.response)
        $(".subtitle").html(
            "<a href='"+window.location.origin+"/"+response.id+"'>"+response.id+"</a>"
        );
        $('#googleYouTube')[0].videoId = response.videoId;
        socket.emit('start',response.id);
        roomId = response.id;
        $(".send").removeAttr("hidden");
        $(".submit").attr("hidden",true);
        $('input').val('');
        
        //start the video state polling emitter, 100ms
        setInterval(poll,10)
    }
    oReq.send();
}
var send = function() {
    var url = $('input').val();
    var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)[1];
    if(videoid!=null){
        console.log(videoid);
        $('#googleYouTube')[0].videoId = videoid;
    } 
}

document.addEventListener('WebComponentsReady',function(){
    $('#googleYouTube')[0].addEventListener("google-youtube-state-change",function(ev){
        //console.log(ev);
    })
});