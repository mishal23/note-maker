var contextMenuItem = {
		"id" : "addNotes",
		"title" : "Add to NoteMaker",
		"contexts" : ["selection"]
	};

	chrome.contextMenus.create(contextMenuItem);

	chrome.contextMenus.onClicked.addListener(function (selectedText) {
		if(selectedText.menuItemId=="addNotes" && selectedText.selectionText)
		{
			var title = prompt("Enter title for the note:");
			var lists=[];
		    if(localStorage.lists!=undefined)
		        lists=JSON.parse(localStorage.lists);
		    
		    lists.sort(function(a,b){
		        return b.date>a.date;
		    });

		    var text=selectedText.selectionText;
		    var d=new Date();
		    lists.push({title: title, notes: text ,done:false, date: d});
		    localStorage.setItem('lists',JSON.stringify(lists));
		    location.reload();
				
			//Was going to use for title of webpage as Title	
			/*
			chrome.tabs.getSelected(null, function(tab) { //<-- "tab" has all the information
    			console.log(tab.url);       //returns the url
    			console.log(tab.title);     //returns the title
			});
			*/
		}
	});