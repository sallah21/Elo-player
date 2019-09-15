function addClass( element, classname ) {
if (element.classList)
  element.classList.add(classname);
else
  element.className += ' ' + classname;
}

function removeClass( classname, element ) {
    var cn = element.className;
    var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
    cn = cn.replace( rxp, '' );
    element.className = cn;
}

var progressBarEl = document.getElementById("progress-bar");
var controlsPlayEl = document.getElementById("controls-play");

function play() {
  addClass(progressBarEl, "play");
  addClass(controlsPlayEl, "play");
}