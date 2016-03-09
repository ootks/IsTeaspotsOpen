function isTeaspotsOpen(){
    var d = new Date();
   //If after 10:30
    return (10 < d.getHours()) && (d.getHours() == 10 && d.getMinutes() > 30);
}
function howManyMoreHours(){
    var d = new Date();
    var minutes = 60 - d.getMinutes();
    var hours = 23 - d.getHours();
    if(minutes > 0){
        hours = hours - 1;
    }
    return {hours: hours, minutes: minutes};
}
function setup(){
    var response = "No";
    if(isTeaspotsOpen()){
        response = "Yes";
    }
    $("#IsTeaspotsOpen").text(response);
    $("#TimeLeft").text(howManyMoreHours());
}

$(document).ready(setup);
