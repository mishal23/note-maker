$(document).ready(function(){

    $('#pagination-demo').twbsPagination({

            totalPages: 35,
            visiblePages: 4,
            onPageClick: function (event, page) {

                var refresh = function (page) {  //A function which refreshes the current page

                    $($('.text')[0]).focus();

                    $.get("http://localhost:3000/notes", function(lists){

                        lists.sort(function(a,b){
                            return b.date > a.date;
                        });

                        var pagelist = lists.slice((page-1)*pagelimit, page*pagelimit);
                        var ol = $('.lists');
                        ol.empty();
                        var li = [];
                        checkbox = '<input type="checkbox"  class="checkbox">';
                        buttons =
                            '<ul class="notebuttons">' +
                                '<li><button type="button" class="editbutton">Edit</button></li>' +
                                '<li><button type="button" class="notebutton">Show</button></li>' +
                            '</ul>';
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
                        ol.append(li);

                        $('.checkbox').click(function(){
                            for (i in li)
                                if ($($('.checkbox')[i]).prop("checked"))
                                    lists[(page-1)*pagelimit+parseInt(i)].done = true;
                                else
                                    lists[(page-1)*pagelimit+parseInt(i)].done = false;
                        });

                        $('.container').css({"width":"250px"});
                        $('.note').css({"width":"80%"});

                        $('.notebutton').click(function(){
                            var note = $(this).parent().parent().next(".note");
                            note.toggle();
                            if (note.css("display")==="none")
                                $(this).text('Show');
                            else
                                $(this).text('Hide');
                        });

                        $('#page-content').text('Page ' + page);

                        $('.addbutton').click(function(){               //function which adds a new entry
                            remove();

                            text=$('.text');
                            if ($(text[0]).val()!==''){
                                var d = new Date();
                                var newNote = {
                                    title: $(text[0]).val(),
                                    content: $(text[1]).val(),
                                    createdBy : "user",
                                    date: d,
                                    done:false
                                };
                                $.post("http://localhost:3000/notes", newNote, function() {
                                    location.reload();
                                });

                                $(text[0]).val('');
                                $(text[1]).val('');
                            }
                            this.value = "Add";
                        });

                        var remove = function(){        //function which removes the checked items
                            for(i in lists) {
                                if(lists[i].done) {
                                    $.ajax ({
                                       type: 'DELETE',
                                       url: "http://localhost:3000/notes/"+lists[i]._id
                                    });
                                }
                            }

                        };

                        $('.removebutton').click(function(){            //function for removing
                            remove();
                            refresh(page);
                        });

                        $('.editbutton').click(function(){              //function for editing a specific entry
                            var edititem = $(this).parents('.listItems')[0];
                            $($(edititem).children('.checkbox')[0]).prop('checked',true);
                            var indexp = $(edititem).index()/2,
                            index = (page-1)*pagelimit + indexp,
                            text = $('.text');
                            lists[index].done = true;
                            $(text[0]).val(lists[index].title);
                            $(text[1]).val(lists[index].content);
                            $(text[1]).focus();
                            $(".addbutton").attr('value','Update');
                            $('.addbutton').addClass('updating');

                        });

                        $('.addbutton .updating').click(function() {
                            var text = $('.text');
                            for(i in lists) {
                                if(lists[i].done) {
                                    $.ajax({
                                        type: 'PUT',
                                        url: 'http://localhost:3000/notes/'+lists[i]._id,
                                        dataType: 'json',
                                        data: {
                                            title: $(text[0]).val(),
                                            content: $(text[1]).val(),
                                            createdBy : lists[i].createdBy,
                                            date: lists[i].data,
                                            done:false
                                        }
                                    });
                                }
                            }
                            $('.addbutton .updating').removeClass('updating');
                        });

                    });
                };

                var pagelimit = 2;

                refresh(page);
            }
    });
});