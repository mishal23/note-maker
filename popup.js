var app=angular.module('notemaker',[]);

app.controller('DisplayList',function($scope,$timeout) {

    $scope.saved=localStorage.getItem('lists');
    $scope.lists=(localStorage.getItem('lists')!==null)?JSON.parse($scope.saved):[{title:'First',done:'false',date: new Date()}];

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
            //dt = $filter('d')(new Date(), 'dd/MM/yyyy');
            $scope.lists.push({title: $scope.addTitle,done:false, date: d});
            $scope.addTitle='';
        }
        add=document.getElementsByClassName('addbutton');
        add[0].innerHTML='Add';
        //chrome.storage.sync.set({'title': JSON.stringify($scope.lists.title), 'done': JSON.stringify($scope.lists.done)});
        localStorage.setItem('lists',JSON.stringify($scope.lists));

    };
    $scope.edit=function () {
        add=document.getElementsByClassName('addbutton');
        add[0].innerHTML='Update';
        this.list.done=true;
        $scope.addTitle=$scope.remove().title;
        document.getElementsByClassName('text')[0].focus();

        
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
