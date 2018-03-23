var pageURL = window.location.href;

chrome.storage.sync.get("loggedIn",function(data) {

    console.log(data.loggedIn);
    var user_id = data.loggedIn;
    var myHilitor; // global variable
    document.addEventListener("DOMContentLoaded", function(e) {
        myHilitor = new Hilitor("content");



        $.post("https://notemaker-server.herokuapp.com/note_page/"+user_id,{"url":pageURL},function (response) {
            for(j=0;j<response.length;j++){
                note=response[j];
                str=note.content;
                str=str.split(". ");
                for(i=0;i<str.length-1;i++){
                    str[i]=str[i]+".";
                }
                targetNode = document.body;
                for(i=0;i<str.length;i++) {
                    myHilitor = new Hilitor(targetNode);
                    targetNode = myHilitor.apply(str[i]);
                }

            }
        });

    }, false);

});
// var myHilitor; // global variable
// document.addEventListener("DOMContentLoaded", function(e) {
//     str="Lecturers & Assistant Lecturers quarters, Warden quarters, bachelors quarters and non-teaching staff colony. There are more than 200 residences on campus including indepe";
//     str=str.split(". ");
//     for(i=0;i<str.length-1;i++){
//         str[i]=str[i]+".";
//     }
//     // myHilitor.apply(str[0]);
//     targetNode = document.body;
//     // myHilitor.apply(str);
//     for(i=0;i<str.length;i++) {
//         myHilitor = new Hilitor(targetNode);
//         targetNode = myHilitor.apply(str[i]);
//         // targetNode = targetNode.parentNode;
//     }
//
// }, false);
