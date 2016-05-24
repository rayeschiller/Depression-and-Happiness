$(document).on("mousemove", function( event ) {
  mouseX = event.pageX; 
  mouseY = event.pageY;
  // console.log("mouseX is " + mouseX)
   // console.log("mouseY is " + mouseY);
   var w = window.innerWidth; 
   var h = window.innerHeight; 
   // var r = map_range(mouseX, 0, h, 0, 100);
   var g = 40;
   var b = map_range(mouseX, 0, w, 65, 150);
   var r = map_range(mouseX, 0, w, 15, 200);
   // var b = 60;
   $("body").css("background-color","rgb("+r+","+g+","+b+")");
});


function map_range(value, low1, high1, low2, high2) {
    return Math.floor(low2 + (high2 - low2) * (value - low1) / (high1 - low1));
}

//notes
var synth = new Tone.SimpleSynth().toMaster();
var notes1 = ["A2", "B2", "C2", "D2", "E2", "G2"];
var notes2 = ["A3", "B3", "C3", "D3", "E3", "G3"];
var notes3 = ["A4", "B4", "C4", "D4", "E4", "G4"];
var notes4 = ["A5", "B5", "C5", "D5", "E5", "G5"];


function music(n){
  if (n==1){
    var oneNote = notes1[betweenZeroAnd(notes1.length-1)];
    synth.triggerAttackRelease(oneNote, 0.25);
    // console.log("playing notes");
 }
 else if (n==2){
    var theNote = notes2[betweenZeroAnd(notes2.length-1)];
    synth.triggerAttackRelease(theNote, 0.25);
    // console.log("playing notes2");
 }
 else if (n==3){
    var aNote = notes3[betweenZeroAnd(notes3.length-1)];
    synth.triggerAttackRelease(aNote, 0.25);
    // console.log("playing notes3");
 }
 else if (n==4){
    var nNote = notes4[betweenZeroAnd(notes4.length-1)];
    synth.triggerAttackRelease(nNote, 0.25);
    // console.log("playing notes4");
 }
 else 
     synth.triggerAttackRelease("A1", 0.25);
    // console.log("n is not 1");
};

$(document).ready(function() {  

    var id = '#dialog';
  
    //Get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
  
    //Set heigth and width to mask to fill up the whole screen
    $('#mask').css({'width':maskWidth,'height':maskHeight});
    
    //transition effect   
    $('#mask').fadeIn(500); 
    $('#mask').fadeTo("fast",0.9);  
  
    //Get the window height and width
    var winH = $(window).height();
    var winW = $(window).width();
              
    //Set the popup window to center
    $(id).css('top',  winH/2-$(id).height()/2);
    $(id).css('left', winW/2-$(id).width()/2);
  
    //transition effect
    $(id).fadeIn(2000);   
  
  //if close button is clicked
  $('.window .close').click(function (e) {
    //Cancel the link behavior
    e.preventDefault();
    
    $('#mask').hide();
    $('.window').hide();
  });   
  
  //if mask is clicked
  $('#mask').click(function () {
    $(this).hide();
    $('.window').hide();
  });   
  
});
