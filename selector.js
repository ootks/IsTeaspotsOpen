var just_opened = false;
var selector_open = false;

// List of restaurants. The first entry is the name to display. The second is the string used to identify it in the code
var restaurants = [["Teaspots", "Teaspots"], ["Dog Haus", "Doghaus"], ["In-N-Out", "Innout"],["Winchells", "Winchells"]]

function show_selector() {
	if (!selector_open) {
		just_opened = true;
		selector_open = true;
	}
	$("#drop_down_items").show();
}

function hide_selector() {
	$("#drop_down_items").hide();
	selector_open = false;
}

$(document).ready(function(){

	restaurants.forEach(function(name) {
		console.log(name);
		$("#drop_down_items").append(
			$("<div></div>").addClass("item").text(name[0]).click(function() {
				console.log(name);
				$("#selected_name").text(name[0]);
				current_restaurant = name[1];
				document.title = "Is " + name[0] + " Open?";
				displayInfo();
			})
		);
	});

	$("#selected_item").click(show_selector);
	$('html').click(function(event) {
		// if (!just_opened && !$(event.target).closest("#drop_down_items").length) {
		if (!just_opened) {
			hide_selector();
		}
		just_opened = false;
	});
});
