var could_select = new Array();
var selected = new Array();
var all = 0;
var big_select = false;
for (var i = 0; i < 5; i++) {
	could_select[i] = true;
	selected[i] = false;
};

window.onload = function() {
	initialize();
}


function initialize() {
	var buttons = document.getElementById("control-ring-container").getElementsByTagName("li");
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].onclick = make_click(buttons[i], buttons, i);
	};
	var big = document.getElementById("info-bar");
	big.onclick = big_click(big);
	document.getElementById("bottom-positioner").onmouseleave=function() {
		hidden();
	};
	document.getElementById("icon").onclick = one_by_one(buttons);
}

function one_by_one (buttons) {
	return function() {
		/*for (var i = 0; i < buttons.length; i++) {
			buttons[i].click();
		};*/
		buttons[0].click();
	};
}

function hidden() {
	var big_select = false;
	var buttons = document.getElementById("control-ring-container").getElementsByTagName("li");
    for (var i = 0; i < 5; i++) {
	    could_select[i] = true;
	    selected[i] = false;
	    buttons[i].style.backgroundColor = "rgba(48, 63, 159, 1)";
	    buttons[i].getElementsByTagName("span")[1].style.visibility = "hidden";
    };
    document.getElementsByTagName("p")[0].innerHTML = "";
}

var http = new XMLHttpRequest();

function loadXMLDoc(fun) {
	http.onreadystatechange=fun;
	http.open("GET","/", true);
	http.send();
}

function make_click(button, buttons, index) {
	return function() {
		if (could_select[index] == false)
			return;
		var ballon = button.getElementsByTagName("span")[1];
		ballon.style.visibility = "visible";
		ballon.style.backgroundColor="#F7382E";
		ballon.innerHTML = "...";
		could_select[index] = false;
		for (var i = 0; i <buttons.length; i++) {
			if (i == index)
				continue;
			buttons[i].style.backgroundColor = "#7E7E7E";
			could_select[i] = false;
		};
		loadXMLDoc( function() {
			console.log(http.readyState);
			if (http.readyState == 4) {
		        for (var i = 0; i < buttons.length; i++) {
		    	    if (index == i) {
		    	    	buttons[i].style.backgroundColor = "#7E7E7E";
		    	    	selected[i] = true;
		    	    	could_select[i] = false;
		    	    } else {
		    	    	if (selected[i] == false)
		    	    	    buttons[i].style.backgroundColor = "rgba(48, 63, 159, 1)";
		    	    	if (selected[i] == false)
		    	    		could_select[i] = true;
		    	    }
		        }
		    	var num = http.responseText;
		        ballon.innerHTML = num;
		        all = all+parseInt(num);
		        if (index<4)
		            buttons[index+1].click();
		        else {
		            var big = document.getElementById("info-bar");
	                big.click();
                }
		    }
		});


	};
}

function big_click(big) {
	return function() {
		if (big_select == true)
			return;
		for (var i = 0; i < 5; ++i) {
			if (selected[i] == false) {
				return;
			}
		}
		context = big.getElementsByTagName("p")[0];
		context.innerHTML = all;
		big_select = true;
	};
}