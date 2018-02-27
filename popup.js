$(document).ready(function(){
    

    chrome.storage.sync.get("loggedIn",function(data){
        if(data.loggedIn===undefined)
        {
            $('.login').show();
            $('.login').siblings().hide();
            $('.valid').hide();
        }
        else
        {
            $('.main_part').show();
            $('.main_part').siblings().hide();
        }
    });

    $('.link_signup').click(function(){
        $('.signup').show();
        $('.signup').siblings().hide();
    });

    $('.loginbtn').click(function(){
        if($('.login_password').val()=='' || $('.login_username').val()=='' )
        {
            $('.valid').show();
        }
        else
        {
            var username = $('.login_username').val();
            var password = $('.login_password').val();
            $.post("http://notemaker-server.herokuapp.com/users/" + username,{password:password}, function(data){
                if(data.statusText === "Success")
                {   
                    chrome.storage.sync.set({"loggedIn": data.user_id}, function(){
                    });
                    location.reload();
                }
                else{
                    $('.valid').show();
                }
            });
        }
    })

    $('#signup-button').click(function(){
        var username=$('#username').val();
        if(username.length===0) {
            alert("Invalid username");
            re_signup();
            return;
        }
        var email=$('#email').val();
        if(email.length===0) {
            alert("Invalid Email-ID");
            re_signup();
            return;
        }
        var password = $('#password').val();
        if(password.length<8) {
            alert("Password should be atleast 8 characters!");
            re_signup();
            return;
        }
        var confirm_password = $('#confirm-password').val();
        if (password!=confirm_password) {
            alert("Passwords dont match!");
            re_signup();
            return;
        }

        var response={
            'username': username,
            'password': password,
            'email': email,
        };

        $.post("http://notemaker-server.herokuapp.com/users",response,function(data){
            if(data.status==='User created'){
                $('.signup').hide();
                $('.main_part').show();

            }
        })

    });

    
    

    var re_signup = function(){
        $('.signup').children('input').each(function (index){
            $(this).val('');
        });
    };

    $('.logout').click(function(){
        chrome.storage.sync.remove("loggedIn",function(){
            location.reload();
        });
        
    });


    //A function which refreshes the current page




    $('#pagination-demo').twbsPagination({

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





});
