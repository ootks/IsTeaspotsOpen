function isTeaspotsOpen(){
    var d = new Date();
   //If after 10:30
    return (10 < d.getHours()) && (d.getHours() == 10 && d.getMinutes() > 30);
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
function displayInfo(){
    if(isTeaspotsOpen()){
       $("#IsTeaspotsOpen").text("Yes").addClass("yes");
       $("#TimeLeft").hide();
    }
    else{
        $("#IsTeaspotsOpen").text("No").addClass("no");
        var time = howManyMoreHours();
        $("#TimeLeft").show();
        $("#TimeLeft").text("Hours left before opening " + time["hours"] + ":" + time["minutes"]+ ":" + time["seconds"]);
    }
}
$(document).ready(function(){
    $("#TimeLeft").hide();
    displayInfo();
    setInterval(displayInfo, 1000);
});
