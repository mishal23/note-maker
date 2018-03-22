
var myHilitor; // global variable
document.addEventListener("DOMContentLoaded", function(e) {
    myHilitor = new Hilitor("content");
    console.log(myHilitor);
    myHilitor.apply("the");
}, false);
