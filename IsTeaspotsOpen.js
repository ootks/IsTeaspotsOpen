function isTeaspotsOpen(){
   //If after 10:30
    return (10 < getHours()) && (getHours() == 10 && getMinutes() > 30);
}
function howManyMoreHours(){
    var minutes = 60 - getMinutes;
    var hours = 23 - getHours();
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
    $("#TimeLeft").text(str(howManyMoreHours()));
}

$(document).ready(setup);
