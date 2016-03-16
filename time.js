// stores a time (in 24 hours time). Allows you to subtract and compare times.
function Time(hours, minutes, seconds) {

	while (seconds >= 60) {
		seconds -= 60;
		minutes++;
	}

	while (seconds < 0) {
		seconds += 60;
		minutes --;
	}

	while (minutes >= 60) {
		minutes -= 60;
		hours++;
	}

	while (minutes < 0) {
		minutes += 60;
		hours --;
	}

	while (hours < 0) {
		hours += 24;
	}

	this.hours = hours % 24;
	this.minutes = minutes;
	this.seconds = seconds;
	this.geq = function(t) {
		if (this.hours > t.hours)
			return true;
		if (this.hours < t.hours)
			return false;
		// if you are here, they have the same hours, so check minutess
		if (this.minutes > t.minutes)
			return true;
		if (this.minutes < t.minutes)
			return false;
		// if you are here, hours and minutess are the same, so check secondss
		return (this.seconds >= t.seconds)
	};
	this.difference = function(t) {
		return new Time(this.hours - t.hours, this.minutes - t.minutes, this.seconds - t.seconds);
	};
	this.negate = function() {
		return new Time(-this.hours, -this.minutes, -this.seconds);
	}
	this.second_string = function() {
		if (this.seconds < 10)
			return "0" + this.seconds;
		return this.seconds;
	};
	this.minute_string = function() {
		if (this.minutes < 10)
			return "0" + this.minutes;
		return this.minutes;
	};

	// assume start is meant to be before stop (but if the interval spans midnight, it will
	// look like start is after stop)
	this.in_interval = function(start, stop) {
		// if the interval does not include midnight, it is straightforward
		if (stop.geq(start))
			return this.geq(start) && stop.geq(this);

		// if the interval does not include midnight, then break it up into two components:
		// [0, stop] and [start, midnight)
		return this.in_interval(new Time(0, 0, 0), stop) || this.in_interval(start, new Time(23, 59, 59));
	}
}

							   // this list denotes the times when the state of the store changes.
							   // the first time must be an opening time. For instance, Teaspots opens
							   // at 10:30 and closes at midnight
							   // the list must start with an opening and times must be consecutive
var store_hours = { Teaspots: [new Time(10, 30, 0), new Time(24, 0, 0)]}

function isRestaurantOpen(name, now){
	var openings_and_closings = store_hours[name];
	for (var i = 0; i < openings_and_closings.length - 1; i += 2) {

		// every two elements of the list represents an opening time and a closing time
		var open = openings_and_closings[i];
		var close = openings_and_closings[i + 1];

		// if now is between those times, then it's open
		if (now.in_interval(open, close))
			return true;
	}

	// if we haven't found that the restaurant is open, then it's closed.
	return false;
}

// assumes that the restaurant is currently closed according to the list of times in
// store_hours
// returns -1 if restaurant is not closed
function howManyHoursLeftUntilOpen(name, now){
	var openings_and_closings = store_hours[name];

	// start at i = 1 to check intervals between a closing time and an opening time
	for (var i = 1; i < openings_and_closings.length; i += 2) {

		// every two elements of the list represents a closing time and an opening time
		var close = openings_and_closings[i];

		// taking (i+1)%openings_and_closings.length inside allows us to check if we are
		// between the last closing and the first opening
		var open = openings_and_closings[(i + 1) % openings_and_closings.length];

		// if now is between those times, then it's open. Return the time left before it
		// is close time
		if (now.in_interval(close, open))
			return open.difference(now);
	}

	// if we haven't found that the restaurant is open, then it's closed.
	return -1;
}

// assumes that the restaurant is currently open according to the list of times in
// store_hours
// returns -1 if restaurant is not open
function howManyHoursLeftUntilClose(name, now) {
	var openings_and_closings = store_hours[name];
	for (var i = 0; i < openings_and_closings.length - 1; i += 2) {

		// every two elements of the list represents an opening time and a closing time
		var open = openings_and_closings[i];
		var close = openings_and_closings[i + 1];

		// if now is between those times, then it's open. Return the time left before it
		// is close time
		if (now.in_interval(open, close))
			return close.difference(now);
	}

	// if we haven't found that the restaurant is open, then it's closed.
	return -1;
}

function displayInfo(){
    var d = new Date();
    var now = new Time(d.getHours(), d.getMinutes(), d.getSeconds());

    // var now = new Time(24, 10, 10);

    if(isRestaurantOpen("Teaspots", now)){
       $("#IsTeaspotsOpen").text("Yes").addClass("yes");
       var time = howManyHoursLeftUntilClose("Teaspots", now);
       $("#time_left").text("Hours left until closing: ");
       $("#time").text(time.hours + ":" + time.minute_string() + ":" + time.second_string());
    }
    else{
        $("#IsTeaspotsOpen").text("No").addClass("no");
        var time = howManyHoursLeftUntilOpen("Teaspots", now);
       $("#time_left").text("Hours left until opening: ");
        $("#time").text(time.hours + ":" + time.minute_string()+ ":" + time.second_string());
    }
}


function getBackground(){
    var background_data = g_backgrounds[Math.floor(Math.random() * g_backgrounds.length)];
    var background = "url(\"" +background_data["url"] +"\")";
    $('<img/>').attr('src', background_data["url"]).load(function(){
        $("body").css('background-image', background);
        $(".overlay").fadeOut();
        $("#credit").append("With thanks to "+ background_data["author"] + " for the image");
    });
}

$(document).ready(function(){
    $(".social_media_buttons").hide();
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

    $(".social_media_buttons").show();
    getBackground();
    displayInfo();
    setInterval(displayInfo, 1000);
});
