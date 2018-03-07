var contextMenuItem = {
		"id" : "addNotes",
		"title" : "Add to NoteMaker",
		"contexts" : ["selection"]
	};

var script = document.createElement('script');
script.src = 'cdn/jquery-3.2.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

chrome.storage.sync.get("loggedIn",function(data) {
    if (data.loggedIn != undefined) {
        chrome.contextMenus.create(contextMenuItem);

        chrome.contextMenus.onClicked.addListener(function (selectedText) {
        	// alert(data.loggedIn);
            if (selectedText.menuItemId == "addNotes" && selectedText.selectionText) {
                var title = prompt("Enter title for the note:");
                
                var text = selectedText.selectionText;
                var d = new Date();
                var newNote = {
                    title: title,
                    content: text,
                    createdBy: data.loggedIn,
                    date: d,
                    done: false
                };

 
                $.post("http://notemaker-server.herokuapp.com/notes", newNote, function () {
                    alert("Note Added");
                	location.reload();
                });

                //Was going to use for title of webpage as Title
                /*
                chrome.tabs.getSelected(null, function(tab) { //<-- "tab" has all the information
                    console.log(tab.url);       //returns the url
                    console.log(tab.title);     //returns the title
                });
                */
            }
        });
    }
});