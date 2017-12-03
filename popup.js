var app=angular.module('notemaker',[]);

app.controller('DisplayList',function($scope,$timeout) {

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
            $scope.lists.push({title: $scope.addTitle,done:false});
            $scope.addTitle='';
        }
        //chrome.storage.sync.set({'title': JSON.stringify($scope.lists.title), 'done': JSON.stringify($scope.lists.done)});
        localStorage.setItem('lists',JSON.stringify($scope.lists));

    };

    $scope.edit=function () {

        if (!this.list.done){
            this.list.done=true;
            $scope.addTitle=this.list.title;
            document.getElementById('input').focus();
        }
        else{
            this.list.title=$scope.addTitle;
            this.list.done=false;
            $scope.addTitle='';
        }

        localStorage.setItem('lists',JSON.stringify($scope.lists));
        //chrome.storage.sync.set({'title': JSON.stringify($scope.lists.title), 'done': JSON.stringify($scope.lists.done)});
   
    }

    $scope.remove=function () {
        var a;
        var oldList=$scope.lists;
        $scope.lists=[];
        angular.forEach(oldList,function (todo){
            if (!todo.done) {
                $scope.lists.push(todo);
            }
            else{
                a=todo;
            }
        });

        localStorage.setItem('lists',JSON.stringify($scope.lists));
        //chrome.storage.sync.set({'title': JSON.stringify($scope.lists.title), 'done': JSON.stringify($scope.lists.done)});
        return a;
    };
});
