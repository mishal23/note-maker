var app=angular.module('notemaker',[]);

app.controller('DisplayList',function($scope,$filter,$window,$timeout) {

    $scope.saved=localStorage.getItem('lists');
    $scope.lists=(localStorage.getItem('lists')!==null)?JSON.parse($scope.saved):[{title:'First',done:'false'}];
    /*
    chrome.storage.sync.get(['title','done'], function (saved) {
        $scope.lists = [{title:saved.title, done:saved.done}];
    });
    */
    localStorage.setItem('lists',JSON.stringify($scope.lists));
    //chrome.storage.sync.set({'title': JSON.stringify($scope.lists.title), 'done': JSON.stringify($scope.lists.done)});
    $scope.add=function () {
        if($scope.addTitle===undefined)
        {

        }
        else {
        	var d = new Date();
            $scope.lists.push({title: $scope.addTitle, notes: $scope.addNotes,done:false, date:JSON.stringify(d)});
           	$scope.addTitle='';
           	$scope.addNotes='';
        }
        add=document.getElementsByClassName('addbutton');
        add[0].innerHTML='Add';
        //chrome.storage.sync.set({'title': JSON.stringify($scope.lists.title), 'done': JSON.stringify($scope.lists.done)});
        localStorage.setItem('lists',JSON.stringify($scope.lists));
        $window.location.reload();

    };
    $scope.edit=function () {
    	$('.note').css({"display":"none"});
        add=document.getElementsByClassName('addbutton');
        add[0].innerHTML='Update';
        this.list.done=true;
        editItem=$scope.remove();
        $scope.addTitle=editItem.title;
        $scope.addNotes=editItem.notes;
        document.getElementsByClassName('text')[1].focus();


        
        localStorage.setItem('lists',JSON.stringify($scope.lists));
        //chrome.storage.sync.set({'title': JSON.stringify($scope.lists.title), 'done': JSON.stringify($scope.lists.done)});
   
    };
    $scope.remove=function () {
        var removedItem;
        var oldList=$scope.lists;
        $scope.lists=[];
        angular.forEach(oldList,function (todo){
            if (!todo.done) {
                $scope.lists.push(todo);
            }
            else{
                removedItem=todo;
            }
        });

        localStorage.setItem('lists',JSON.stringify($scope.lists));
        //chrome.storage.sync.set({'title': JSON.stringify($scope.lists.title), 'done': JSON.stringify($scope.lists.done)});
        return removedItem;
    };
});

$(document).ready(function(){
	$('.container').css({"width":"250px"});
	$('.note').css({"width":"80%"})
	$('.notebutton').click(function(){
		note=$(this).parent().parent().next(".note");
		note.toggle();
		if (note.css("display")==="none")
			$(this).text('Show');
		else
			$(this).text('Hide');
	})
});