/*
created by david parnell
copyright College Sports Online, Inc.
no part of this application may be used, duplicated or accessed without permission
*/
var NS4 = (document.layers) ? true : false;
var IE5 = (document.all) ? true : false;
var myTimer = new Array();
var is_newer = parseInt(navigator.appVersion);
var timerid=0;

function browser(objName,objParent){
if(document.getElementById && !document.all){
tObj = document.getElementById(objName);
}else if (document.all){
tObj =  eval("document.all."+objName);
}else{
tObj = (objParent) ? document.layers[objParent].document.layers[objName] : document.layers[objName] ;
}
return tObj;

/*
if(document.layers){tObj = (objParent) ? eval("document."+objParent+".document."+objName) : eval("document."+objName);}
else{tObj = (document.all) ? eval("document.all."+objName) : eval("document.getElementById('"+objName+"')");}
return tObj;
*/

} // END FUNC
function imgWriter(imgname,wide,hi,alt){
imgObj = "<img src=\""+imgname+"\" width="+wide+" height="+hi+" alt=\""+alt+"\" border=0>";
return imgObj;
}

function showObj(objName,objPar) {
(objPar)? eleObj = browser(objName,objPar) : eleObj = browser(objName);
(NS4)? eleObj.visibility = 'visible' : eleObj.style.visibility = 'visible';
} // END FUNC
function hideObj(objName,objPar) {
(objPar)? eleObj = browser(objName,objPar) : eleObj = browser(objName);
//alert(eleObj);
(NS4)? eleObj.visibility = 'hidden' : eleObj.style.visibility = 'hidden';
} // END FUNC
function eleX(objName,objParent){
eleObj = browser(objName);
if(!document.layers){
objX = eleObj.offsetLeft;
eleParent = eleObj.offsetParent;
while (eleParent != null){
objX += eleParent.offsetLeft;
eleParent = eleParent.offsetParent;
}
}else{objX = parseInt(eleObj.pageX);}
return objX;
} // END FUNC
function eleY(objName,objParent){
eleObj = browser(objName);
if(!document.layers){
objY = eleObj.offsetTop;
eleParent = eleObj.offsetParent;
while (eleParent != null){
objY += eleParent.offsetTop;
eleParent = eleParent.offsetParent;
}
}else{objY = parseInt(eleObj.pageY);}
return objY;
} // END FUNC
function origin(objName,keyEle,originLeft,originDown,originPar) {
	originObj = browser(objName); // the layer to be moved
	originKey = browser(keyEle); // the layer to Key On
	if(document.all) {//**** IE CASE *******
	originisLeft = (eleX(keyEle)+originLeft);
	originisTop = (eleY(keyEle)+originDown);
	}else{
	originisLeft = (document.layers) ? parseInt(originKey.pageX + originLeft): (originPar) ?  parseInt(originKey.offsetLeft) : parseInt(originKey.offsetLeft + originLeft);// + originLeft
	originisTop = (document.layers) ? parseInt(originKey.pageY + originDown): parseInt(originKey.offsetTop + originDown);
	}// END ELSE
	moveObj(objName,(originisLeft),originisTop);
} // END FUNC
function Timeout(objNumber,delayTime,timerObj) {
	//alert(objNumber+"\n"+delayTime+"\n"+timerObj);
	activeObj = objNumber;
	myTimer[timerObj] = setTimeout("hideObj(activeObj)",delayTime);
}// END FUNC
function Timeclr(timerObj) {
	//alert(timerObj);
	clearTimeout(myTimer[timerObj]);	
}// END FUNC
function moveKeyedObj(objName,keyEle,objLeft,objTop,objParent) {
	eleObj = browser(objName,objParent); // the layer to be moved
	eX = eleX(keyEle);
	eY = eleY(keyEle);
	moveObj(objName,(eX+objLeft),(eY+objTop));
} // END FUNC
function moveObj(objName,leftOffset,topOffset,state) {
	eleObj = browser(objName);
	if(NS4) {
	eleObj.moveToAbsolute(leftOffset,topOffset);
	}
	else {
	eleObj.style.top = topOffset + "px";
	eleObj.style.left = leftOffset + "px";
	}
}



