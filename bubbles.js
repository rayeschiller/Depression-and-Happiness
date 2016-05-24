minRadius = 5;
maxRadius = 100;
minVel = -3;
maxVel = 3;
maxNumberOfCircles = 100;
var mouseX = 0;
var mouseY = 0;
var w = window.innerWidth; 
var h = window.innerHeight; 
var interval = 50;

// function speedy(sz){
//   var number = parseInt(sz.value);
//     interval = number;
//     console.log("interval is " + interval); 
// };



// circleColor = [ '#4BAAB2', '#84F5FF'];
circleColor = [ '#4BAAB2' ];
var words = ["sad",  "afraid", "anxious", "scared","alone","hurt","upset","nervous","depressed","guilty", "shameful", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "," ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "];
var words2 = ["happy", "calm", "safe", "comfortable", "peaceful", "joyful", "glad", "secure","okay", "good", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "," ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "," ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "];
$(document).ready(function(){
	var browser = new checkBrowser();
	$('canvas').attr('width',browser.width).attr('height',browser.height);
	// main();
})  

$(document).on("mousemove", function( event ) {
  mouseX = event.pageX; 
  mouseY = event.pageY;
  // console.log("interval is " + interval);
  // console.log("mouseX is " + mouseX)

});
function v1(sz){
  var number = parseInt(sz.value);
    // console.log("the circles are " + number); 
    maxNumberOfCircles = number;
    console.log("maxNumberOfCircles is " + maxNumberOfCircles); 
};



  
function main(){
	circles = new Array();
	 
	for(i=0;i<maxNumberOfCircles;i++){
		circles[i] = buildCircle();
	};
	setInterval(circleDrawing, interval);
	console.log("interval is " + interval);
}

//DRAWS THE CIRCLES
function circleDrawing(){
	var canvas = document.getElementById('canvas');

	//CLEARS CANVAS
	canvas.width = canvas.width;
	var browser = checkBrowser();
	for(i=0;i<maxNumberOfCircles;i++){
		circles[i].x = circles[i].x + circles[i].xVel;
		circles[i].y = circles[i].y + circles[i].yVel;
		
		//IF CIRCLE IS TOO FAR OFF SCREEN, REBUILD
		if(((circles[i].x > (browser.width + circles[i].radius)+10) || circles[i].x < ((0 - circles[i].radius)-10)) || ((circles[i].y > (browser.height + circles[i].radius)+10) || circles[i].y < ((0 - circles[i].radius)-10))){
			circles[i] = buildCircle();
	
		}
		
		drawCircle(circles[i]);
		}
		
}

//RETURNS VARIABLES OF THE BROWSER
function checkBrowser(){
	browser = new Object();
	browser.height = document.documentElement.clientHeight;
	browser.width = document.documentElement.clientWidth;
	//IF BROWSER HEIGHT OR WIDTH HAS CHANGED, FIX
	if(($('canvas').attr('width') != browser.width) || $('canvas').attr('height') != browser.height){
		$('canvas').attr('width',browser.width).attr('height',browser.height);
	}
	return browser;
}	

function buildCircle(){
	var browser = new checkBrowser();
	var circle = new Object();
	circle.radius = randomXToY(minRadius,maxRadius);

	var fourth = w/2 + w/4;
	if (mouseX<w/4){
		music(1);
		// console.log("section 1");
	}
	else if (mouseX<w/2){
		music(2);
		// console.log("section 2");
	}
	else if (mouseX>w/2 && mouseX<fourth){
		music(3);
		// console.log("section 3");
	}
	else if(mouseX>fourth){
		music(4);
		// console.log("section 4");
	}
	//DETERMINES WHERE TO START OFF SCREEN, HAS TO BE THIS LENGTHY
	if(betweenZeroAnd(2) == 1){
		//ANYWHERE ON THE Y AXIS
		circle.y = randomXToY(0 - circle.radius,browser.height + circle.radius);
		
		if(betweenZeroAnd(2) == 1){
			//LEFT SIDE
			circle.x = 0 - circle.radius;
		}else{
			//RIGHT SIDE
			circle.x = browser.width + circle.radius;
		}
	}else{
		//ANYWHERE ON THE X AXIS
		circle.x = randomXToY(0 - circle.radius,browser.width + circle.radius);
		if(betweenZeroAnd(2) == 1){
			//TOP SIDE
			circle.y = 0 - circle.radius;
		}else{
			//BOTTOM SIDE
			circle.y = browser.height + circle.radius;
		}
	}
	
	if(circle.x < 0){
		circle.xVel = randomXToY(0,maxVel);
	}else{
		circle.xVel = randomXToY(minVel,minVel+maxVel);
	}
	
	if(circle.y < 0){
		circle.yVel = randomXToY(0,maxVel);
	}else{
		circle.yVel = randomXToY(minVel,maxVel-minVel);
	}
	//ENSURE CIRCLE IS NOT STATIONARY;
	if(circle.xVel == 0 && circle.yVel ==0){
		circle.yVel = 1;
	}
	return circle

}


//DRAWS CIRCLE
function drawCircle(obj){

	var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.fillStyle = circleColor[betweenZeroAnd(circleColor.length)];
	ctx.globalAlpha = 0.4;
    ctx.arc((obj.x),(obj.y),(obj.radius),0,Math.PI*2, false);
	ctx.fill();
	var text;	
	ctx.fillStyle = "black"; //font color to write text with 
	if (mouseX < w/2){
		text = words[betweenZeroAnd(words.length)];
		// console.log("sad words");
	}
	if (mouseX > w/2){
		text = words2[betweenZeroAnd(words2.length)];	
		// console.log("happy words");
	}

	var third = h-h/3
	if (mouseY  < h/2 ){
		ctx.font = "bold 25px Lato";
		// console.log("text is big");
	}
	if (mouseY > h/2 && mouseY < third){
		ctx.font="19px Lato";
		// console.log("text is middle");
	}
	if (mouseY > third){
		ctx.font = "0px Lato";
		// console.log("text is small");
	}
	
	
	ctx.fillText(text,(obj.x-obj.radius/2),(obj.y), (obj.radius));
}
	


function betweenZeroAnd(num){
return Math.floor(Math.random()*(num))
}

//RETURNS NUMBER BETWEEN X AND Y, FLOAT VAL IS DECIMAL PLACES
function randomXToY(minVal,maxVal,floatVal){
  var randVal = minVal+(Math.random()*(maxVal-minVal));
  return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
}

function map_range(value, low1, high1, low2, high2) {
    return Math.floor(low2 + (high2 - low2) * (value - low1) / (high1 - low1));
}