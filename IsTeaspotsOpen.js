function isTeaspotsOpen(){
    var d = new Date();
   //If after 10:30
    return (10 < d.getHours()) || (d.getHours() == 10 && d.getMinutes() > 30);
}
function getBackground(){

    var background_data = g_backgrounds[Math.floor(Math.random() * g_backgrounds.length)];
    var background = "url(\"" +background_data["url"] +"\")";
    $('<img/>').attr('src', background_data["url"]).load(function(){
        $("body").css('background-image', background);
        $("#credit").append("With thanks to "+ background_data["author"] + " for the image");
    });
}
function howManyMoreHours(){
    var d = new Date();

    //10:30:00 - h:m:s
    var seconds = 60 - d.getSeconds();
    if(seconds < 10){
        seconds = "0" + seconds;
    }
 
    if(seconds == 60){
        seconds = "00";
    }
    
    var minutes = 29 - d.getMinutes();
    var hours = 10 - d.getHours(); 
    
    if(minutes < 0){
        minutes = 60 +  minutes;
        hours = hours - 1;
    }
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    return {hours: hours, minutes: minutes, seconds: seconds};
}

function howManyHoursLeftUntilClose() {
    var d = new Date();
    
    var hours = 24 - (d.getHours() + 1);
    var minutes = 60 - (d.getMinutes() + 1);
    var seconds = 60 - d.getSeconds();

    if (minutes < 10)
        minutes = "0" + minutes;
    if (seconds < 10)
        seconds = "0" + seconds;

    return {hours: hours, minutes: minutes, seconds: seconds};
}

function displayInfo(){
    if(isTeaspotsOpen()){
       $("#IsTeaspotsOpen").text("Yes").addClass("yes");
       var time = howManyHoursLeftUntilClose();
       $("#TimeLeft").text("Hours left until closing: " + time["hours"] + ":" + time["minutes"] + ":" + time["seconds"]);
    }
    else{
        $("#IsTeaspotsOpen").text("No").addClass("no");
        var time = howManyMoreHours();
        $("#TimeLeft").text("Hours left before opening " + time["hours"] + ":" + time["minutes"]+ ":" + time["seconds"]);
    }
}
$(document).ready(function(){
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
    getBackground();
    displayInfo();
    setInterval(displayInfo, 1000);
});
