var contextMenuItem = {
    "id" : "addNotes",
    "title" : "Add to NoteMaker",
    "contexts" : ["selection","image"]
};


chrome.storage.sync.get("loggedIn",function(data) {
    if (data.loggedIn != undefined) {
        chrome.contextMenus.create(contextMenuItem);

        chrome.contextMenus.onClicked.addListener(function (selectedText) {
            if (selectedText.menuItemId == "addNotes" ) {
                var title = prompt("Enter title for the note:");
                if (title!=null && title!="") {
                    var imageURL = selectedText.srcUrl;
                    var text = selectedText.selectionText;
                    var d = new Date();

                    var newNote = {
                        title: title,
                        content: text,
                        imageURL: imageURL,
                        createdBy: data.loggedIn,
                        date: d,
                        done: false
                    };


                    $.post("http://notemaker-server.herokuapp.com/notes", newNote, function () {
                        var notification = {
                            type: 'basic',
                            iconUrl: 'icon.png',
                            title: 'Note created',
                            message: 'Note with title: ' + newNote.title + ' added'
                        };
                        chrome.notifications.create('createNote', notification);
                        location.reload();
                    });
                }
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