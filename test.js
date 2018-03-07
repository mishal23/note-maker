('#pagination-demo').twbsPagination({

    totalPages: 35,
    visiblePages: 4,
    onPageClick: function (event, page) {

        var pagelimit = 2;
        var edit=false;
        var note_edit_id;

        var refresh = function (page) {  //A function which refreshes the current page
            $('#page-content').text('Page ' + page);
            $('#title').val('');
            $('#content').val('');
            $('#title').focus();

            chrome.storage.sync.get("loggedIn",function(data){

                $.get("http://notemaker-server.herokuapp.com/notes/" + data.loggedIn, function(lists){
                    lists.reverse();
                    var pagelist = lists.slice((page-1)*pagelimit, page*pagelimit);
                    var display_list = $('.lists');
                    display_list.empty();
                    var li = [];
                    checkbox = '<input type="checkbox"  class="checkbox">';

                    // Button variable to add Edit/Show button
                    buttons =
                        '<ul class="notebuttons">' +
                        '<li><button type="button" class="editbutton">Edit</button></li>' +
                        '<li><button type="button" class="notebutton">Show</button></li>' +
                        '</ul>';

                    // notes on that page
                    for(i in pagelist){
                        li[i] =
                            '<li class="listItems">'+checkbox+'' +
                            '<span class="done check title">'+ pagelist[i].title +'</span>'
                            +buttons+
                            '<div class="note">' +
                            '<p class="text">'+ pagelist[i].content +'</p>' +
                            '</div>'+
                            '</li> <br>';
                    }
                    display_list.append(li);

                    $('.checkbox').click(function(){
                        for (i in li)
                            if ($($('.checkbox')[i]).prop("checked"))
                                lists[(page-1)*pagelimit+parseInt(i)].done = true;
                            else
                                lists[(page-1)*pagelimit+parseInt(i)].done = false;

                    });


                    $('.notebutton').click(function(){
                        var note = $(this).parent().parent().next(".note");
                        note.toggle();
                        if (note.css("display")==="none")
                            $(this).text('Show');
                        else
                            $(this).text('Hide');
                    });

                    $('.editbutton').click(function(){              //function for editing a specific entry
                        var edititem = $(this).parents('.listItems')[0];
                        // $($(edititem).children('.checkbox')[0]).prop('checked',true);
                        var indexp = $(edititem).index()/2;
                        index = (page-1)*pagelimit + indexp;
                        lists[index].done = true;
                        note_edit_id=lists[index]._id;
                        edit=true;
                        $('#title').val(lists[index].title);
                        $('#content').val(lists[index].content);
                        $('#content').focus();
                        $("#addbutton").attr('value','Update');
                    });

                    remove = function(){        //function which removes the checked items
                        for(i in lists) {
                            if(lists[i].done) {
                                $.ajax ({
                                    type: 'DELETE',
                                    url: "http://notemaker-server.herokuapp.com/notes/"+lists[i]._id
                                }).done(function(){
                                    refresh(page);
                                });
                            }
                        }

                    };

                });
            });

        };

        refresh(page);


        chrome.storage.sync.get("loggedIn",function(data) {

            $('#addbutton').click(function () {               //function which adds a new entry
                this.value = "Add";
                if ($('#title').val() !== '') {
                    $('#no_tittle').text("");

                    var d = new Date();
                    var newNote = {
                        title: $('#title').val(),
                        content: $('#content').val(),
                        createdBy: data.loggedIn,
                        date: d,
                        done: false
                    };

                    if (edit) {
                        $.ajax({
                            type: 'PUT',
                            url: 'http://notemaker-server.herokuapp.com/notes/' + note_edit_id,
                            dataType: 'json',
                            data: newNote
                        }).done(function(){
                            edit=false;
                            refresh(1);
                        });
                    }
                    else {
                        $.post("http://notemaker-server.herokuapp.com/notes", newNote, function () {
                            edit=false;
                            refresh(1);
                        });
                    }

                }
                else{
                    $('#no_tittle').text("Please Add a title!");
                }

            });



            $('#removebutton').click(function(){            //function for removing
                remove();
            });
        });

    }
});