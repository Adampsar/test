function topstoriesTabs(i) {
	document.getElementById("topstories").style.display = (i == "on-topstories") ? "block" : "none";
	document.getElementById("videos").style.display = (i == "on-videos") ? "block" : "none";
	document.getElementById("liveevents").style.display = (i == "on-liveevents") ? "block" : "none";
	
	document.getElementById("topstories-tab").className = i;
}

function topstories2Tabs(i) {
	document.getElementById("topstories2").style.display = (i == "on-topstories2") ? "block" : "none";
	document.getElementById("videos2").style.display = (i == "on-videos2") ? "block" : "none";
	
	document.getElementById("topstories2-tab").className = i;
}

function shopnowTabs(i) {
	document.getElementById("shopnow").style.display = (i == "on-shopnow") ? "block" : "none";
	document.getElementById("auctions").style.display = (i == "on-auctions") ? "block" : "none";
	document.getElementById("photostore").style.display = (i == "on-photostore") ? "block" : "none";
	
	document.getElementById("shopnow-tab").className = i;
}

function moreheadlines1Tabs(i) {
	document.getElementById("moreheadlines1").style.display = (i == "on-moreheadlines1") ? "block" : "none";
	document.getElementById("quicklinks").style.display = (i == "on-quicklinks") ? "block" : "none";
	
	document.getElementById("moreheadlines1-tab").className = i;
}

function moreheadlines2Tabs(i) {
	document.getElementById("moreheadlines2").style.display = (i == "on-moreheadlines2") ? "block" : "none";
	document.getElementById("blogs").style.display = (i == "on-blogs") ? "block" : "none";
	
	document.getElementById("moreheadlines2-tab").className = i;
}

function ticketinfoTabs(i) {
	document.getElementById("ticketinfo").style.display = (i == "on-ticketinfo") ? "block" : "none";
	document.getElementById("seatingcharts").style.display = (i == "on-seatingcharts") ? "block" : "none";
	
	document.getElementById("ticketinfo-tab").className = i;
}

var browserName=navigator.appName; 
function resetVideomi() {
	if (browserName=="Microsoft Internet Explorer") {
	} else {
	flvPlayerLoaded=false;
	mediaTypeCheck();
	rotate_timer = setInterval('toggleFlip()',miRotationTime);
	setTimeout(function(){checkBuyNow();}, 500);
	}
}
function clearVideomi() {
	if (browserName=="Microsoft Internet Explorer") {
	} else {
	clearInterval(rotate_timer);
	}
}