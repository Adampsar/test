var PlayerOnScreen = false;
var playerRotationTimeout = 7000;

var arrayIndex = 0;//don't change
var frmIndex = 0;//don't change
var last = 0;//don't change
var arrayLengthIndex = 0;//don't change


//get scoreboard data xml
function loadPlyrImgXML() {
	listOfAths = new midoriAjax(function() {
		if (this.status == 200) {
			setUpPlyrImgs(this.responseXML)
		} 
	});
	listOfAths.post('/library/xml/mi-13-'+sportCode+'-list-athletes.xml', '', 'GET');

}

function setUpPlyrImgs(xr) {
    athletes = xr.getElementsByTagName('athlete');
}
     
loadPlyrImgXML();


////////////////// BEGIN TELL HEIGHT ////////////////////

function tellHeight() {
	videoIconCheck();
	document.getElementById('mini0').className="miniOn";	
	var layerHeights = new Array;
	function createLayerHeights() {
		for ( frmIndex;  layerHeights.length <  layerHeightsLength; frmIndex++ )	{
			layerHeights[frmIndex] = document.getElementById('frm'+frmIndex).offsetHeight;
		}	
	}
	var i = framePanels-1;
	createLayerHeights();
	if (layerHeights[layerHeights.length-1] >= 0) {
		function compare(a,b) {
		return b - a;
	}
	layerHeights.sort(compare);
	document.getElementById('relativeFrame').style.height =  layerHeights[0] + "px";
	clearInterval(mwcBoxAdjust);
	rotate_timer = setInterval("toggleFlip()",miRotationTime);
	do {
			document.getElementById("mini"+i).style.visibility="visible";
		} while(i--);
	}
}

////////////////// END TELL HEIGHT ////////////////////

if(!document.layers) {
var layerHeights=[document.getElementById('frm0')];
} else {
oLayer = window.document.relativeFrame;
var layerHeights=[oLayer.document.frm0.clip.height,oLayer.document.frm1.clip.height,oLayer.document.frm2.clip.height,oLayer.document.frm3.clip.height];
}
layerHeights.sort()
var divAreaWidth=375;
var divAreaHeight = layerHeights[layerHeights.length-1];
if (document.layers) {
document.writeln('<img src="../images/spacer.gif" width="'+divAreaWidth+'" height="'+divAreaHeight+'" border="0" alt="" />');
}//uncomment line below for png mi

if ( pngLogic == true ) {
	document.getElementById('pngMi').style.backgroundImage = "url(" + firstPhoto + ")";
} else {
	document.getElementById('frame_photo').src = firstPhoto;
}

var getMyDivCount = document.getElementById("relativeFrame").getElementsByTagName("div");
var panels_i = getMyDivCount.length-1;
var getMyPanelCount=0;
do {
	if(getMyDivCount[panels_i].id.indexOf("frm") != -1){
	getMyPanelCount++;
}
} while(panels_i--);
var framePanels=getMyPanelCount;  // set you base panel number here
var oasPrimeToggle = 1;
var oasPrimeToggleState = 1;
var currActiveFrame = 0;
var rotate_timer;


////////// THESE FUNCTIONS USED TO COMMUNICATE WITH THE FLASH PLAYER ////////////////
var flvPlayerLoaded = false;
function videoPlayerReady() {	//flash will call this when it's loaded
	flvPlayerLoaded = true;
}

var videoCounter = 0; //hack
function loadVideoPlayer() {  //makes sure the player has loaded before telling it to call a video
    if (typeof OS != "undefined" && OS == "mobile") { 
        loadmiSinglePlayer();
    } else { 
        if (flvPlayerLoaded) {
            sendToVideoPlayer();
        } else {          //keep checking until player loads
            videoCounter++;//hack
            if (videoCounter >= 10) { flvPlayerLoaded = true; }//hack
            var t = setTimeout("loadVideoPlayer()", 50);
        }
    }
}

function killVideoPlayer() {  //makes sure the player has loaded before telling it to call a video
    videoCounter = 0;
    if (typeof OS != "undefined" && OS == "mobile") { 
        document.getElementById("flvVideoPlayer-iframe").src = "";
        //var e = document.getElementById("flvVideoPlayer");
        //e.src = ""; //e.parentNode.removeChild(e);
    }
    if (flvPlayerLoaded) {
        document.getElementsByName(vidPlyrID)[0].tellVideoToStop();
    }
}

function sendToVideoPlayer() {
	//alert(miCompleteArray[arrayIndex].photoSource);
    document.getElementsByName(vidPlyrID)[0].sendVideoToPlay(miCompleteArray[arrayIndex].photoSource);
}

function onVideoPlayStart(value) {
    clearInterval(rotate_timer);
}
/////////////////////////////// END FLASH FUNCTIONS //////////////////////////////////

function goToStory() {
    if (PlayerOnScreen==false) {
	    parent.window.location = miCompleteArray[currActiveFrame].storySource;
    }
    
}//end func
function toggleFlip() {
    
    rvar  = Math.floor(Math.random()*athletes.length);
    
	clearInterval(rotate_timer);
    if (typeof(player_timer) != 'undefined') { clearTimeout(player_timer); }
	if (PlayerOnScreen == false) {
	    if (miCompleteArray[arrayIndex].mediaType=="video") { killVideoPlayer() }
	    
		//clearInterval(rotate_timer);
	document.getElementById("frame_photo").style.display = "block";
		PlayerOnScreen = true;
		document.getElementById("mi-video-wrap").style.display = "none";
		document.getElementById('relativeFrame').style.display = "none";
		document.getElementById('rel-min-wrap').style.display = "none";
		document.getElementById('buy-me-photo-button-mi').style.display = "none"
		if ( pngLogic == false ) {
			document.getElementById('frame_photo').src = athletes[rvar].childNodes[0].nodeValue;
		} 
		if ( pngLogic == true ) {
			document.getElementById('pngmi').style.backgroundImage = 'url('+athletes[rvar].childNodes[0].nodeValue+')';
			//document.getElementById('miGrad').style.display = "none";
			document.getElementById('miGrad').style.visibility = "hidden";
		}

		player_timer = setTimeout(function() { 
			toggleFlip();
			rotate_timer = setInterval("toggleFlip()",miRotationTime);
		}, playerRotationTimeout);
	} else {
		//document.getElementById('relativeFrame').style.display = "block";
		//document.getElementById('buy-me-photo-button-mi').style.display = "block";
		if ( pngLogic == true ) {
			//document.getElementById('miGrad').style.display = "block";
			document.getElementById('miGrad').style.visibility = "visible";
		}
		document.getElementById('relativeFrame').style.display = "block";
		PlayerOnScreen = false;
		rotate(oasPrimeToggle);
		last=oasPrimeToggle;
		oasPrimeToggleState++;  // if you want toggle to start at Zero, place this statement below:  toggle = toggleState%5;
		oasPrimeToggle = oasPrimeToggleState%framePanels;
	
	}
}
function miNext(){
	clearInterval(rotate_timer);
	if ( pngLogic == true ) {
		//document.getElementById('miGrad').style.display = "block";
		document.getElementById('miGrad').style.visibility = "visible";
	}
    if (typeof(player_timer) != 'undefined') { clearTimeout(player_timer); }	
		document.getElementById('relativeFrame').style.display = "block";
		document.getElementById('buy-me-photo-button-mi').style.display = "block";
		PlayerOnScreen = false;	
		if(last==framePanels-1){last = 0;}else{last++;}
		rotate(last);
}
function miPrev(){
    clearInterval(rotate_timer);
    if ( pngLogic == true ) {
		//document.getElementById('miGrad').style.display = "block";
		document.getElementById('miGrad').style.visibility = "visible";
	}
    if (typeof(player_timer) != 'undefined') { clearTimeout(player_timer); } 
		document.getElementById('relativeFrame').style.display = "block";
		document.getElementById('buy-me-photo-button-mi').style.display = "block";
		PlayerOnScreen = false;
	    if(last==0){last = framePanels-1;}else{last--;}
    	rotate(last);  
}

function rotate(currFrame) {	
        
		currActiveFrame = currFrame;
		arrayIndex = currFrame;
		mediaTypeCheck();	
		checkBuyNow();
		var i = framePanels-1;
		if(!document.layers) {
			do {
				document.getElementById('frm'+i).style.visibility="hidden";
				document.getElementById("mini"+i).className="";
			} while(i--);
			document.getElementById('frm'+currFrame).style.visibility="visible";
			document.getElementById("mini"+currFrame).className="miniOn";
			if ( pngLogic == false ) {
				document.getElementById('frame_photo').src = miCompleteArray[currFrame].photoSource;
			} 
			if ( pngLogic == true ) {
				document.getElementById('pngmi').style.backgroundImage = 'url('+miCompleteArray[currFrame].photoSource+')';
			}
		}
		last=currFrame;	
}

function rotateToPanel(panel) {
	mediaTypeCheck();
	oasPrimeToggle=panel;
	oasPrimeToggleState=panel;
	clearInterval(rotate_timer);
	if ( controlsLogic == true ) {
		changeImage(1);
	}
	rotate(oasPrimeToggle);
}//end func

///////////////////////////////////////// INITIALIZE /////////////////////////////////////////
if (!document.layers) {
	mwcBoxAdjust = setInterval("tellHeight()",500);
} else {
	rotate_timer = setInterval("toggleFlip()",miRotationTime);
  }
///////////////////////////////////////// INITIALIZE /////////////////////////////////////////