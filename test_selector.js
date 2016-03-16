var just_opened = false;
var selector_open = false;

var restaurants = [["Teaspots", "Teaspots"], ["Dog Haus", "Doghaus"], ["In-N-Out", "Innout"],["Winchells", "Winchells"],["Test", "test"]]

function show_selector() {
	if (!selector_open) {
		selector_open = true;
        $(".previous").show();
        $(".next").show();
	    $(".selected_item").show();
	}
}

function hide_selector() {
    $(".previous").hide();
    $(".next").hide();
    
    selector_open = false;
    just_opened = false;
}

function requeue(){
    $(".previous").removeClass("previous");
    $(".next").removeClass("next");
    $(".selected_item").removeClass("selected_item");

    var next = curr_selector.next();
    var prev = curr_selector.prev();

    if(next.length == 0){
        $(".dropdown").append(prev).append(curr_selector);
    }
    if(prev.length == 0){
        $(".dropdown").append(curr_selector).append(next);
    }
    
    curr_selector.addClass("selected_item");
    curr_selector.prev().addClass("previous");
    curr_selector.next().addClass("next");
}

var selector_divs = [];
var curr_selector;
var lastScrollTop = 0;

$(document).ready(function(){
    
	restaurants.forEach(function(name) {
        selector_divs.push($("<div></div>").text(name[0]).bind("make_current", function(){
                curr_selector = $(this);
            }
		).click(function() {
				$(".selected_name").text(name[0]);
				current_restaurant = name[1];
				document.title = "Is " + name[0] + " Open?";
				displayInfo();
                $(this).trigger("make_current");
                if(selector_open){
                    hide_selector();
                    requeue();
                    $(this).show();
                }
                else{
                    show_selector();
                }            
			}).hide()
        );
		$(".dropdown").append(selector_divs[selector_divs.length - 1]);
     });
    curr_selector = selector_divs[0];
    requeue();
	$(".selected_item").show();
    var scroll_name;

    //How to tell if the browser if firefox, apparently?
    if(typeof InstallTrigger !== 'undefined'){
        scroll_name = "DOMMouseScroll";
    }
    else{
        scroll_name = "mousewheel";
    }
    $(".dropdown").on(scroll_name, function(e){
        console.log("Scolling");
        requeue();
        hide_selector();
        if(e.originalEvent.deltaY >= 0){
            curr_selector = curr_selector.next();
        }
        else{
            curr_selector = curr_selector.prev();
        }
        requeue();
        show_selector();
    });
	$('html').click(function(event) {
		// if (!just_opened && !$(event.target).closest("#drop_down_items").length) {
        console.log("html clicked");
		if (!just_opened) {
            console.log("It's not just been opened");
            curr_selector.trigger('make_current');
			hide_selector();
		}
		just_opened = false;
	});
});
