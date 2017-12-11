$(document).ready(function(){
    $('#pagination-demo').twbsPagination({
            totalPages: 35,
            visiblePages: 4,
            onPageClick: function (event, page) {
                var refresh = function (page) {                 //A function which refreshes the current page
                    $($('.text')[0]).focus();
                    lists=[];
				    if(localStorage.lists!=undefined)
                	    lists=JSON.parse(localStorage.lists);
                    lists.sort(function(a,b){
                        return b.date>a.date;
                    });
                    pagelist=lists.slice((page-1)*pagelimit,page*pagelimit);
                    ol=$('.lists');
                    ol.empty();
                    li=[];
                    checkbox='<input type="checkbox"  class="checkbox">';
                    buttons='<ul class="notebuttons"><li><button type="button" class="editbutton">Edit</button></li><li><button type="button" class="notebutton">Show</button></li></ul>';
                    for(i in pagelist){
                        li[i]='<li class="listItems">'+checkbox+'<span class="done check title">'+ pagelist[i].title +'</span>'+buttons+'<div class="note"><p class="text">'+ pagelist[i].notes +'</p></div>'+'</li> <br>';
                    }
                    ol.append(li);

                    $('.checkbox').click(function(){
                        for (i in li)
                            if ($($('.checkbox')[i]).prop("checked"))
                                lists[(page-1)*pagelimit+parseInt(i)].done=true;
                            else
                                lists[(page-1)*pagelimit+parseInt(i)].done=false;
                    });

                    $('.container').css({"width":"250px"});
                    $('.note').css({"width":"80%"})
                    $('.notebutton').click(function(){
                        note=$(this).parent().parent().next(".note");
                        note.toggle();
                        if (note.css("display")==="none")
                            $(this).text('Show');
                        else
                            $(this).text('Hide');
                    });

                    $('#page-content').text('Page '+page);

                    $('.addbutton').click(function(){               //function which adds a new entry
                        remove();
                        text=$('.text');
                        if ($(text[0]).val()!=''){
                            var d=new Date();
                            lists.push({title: $(text[0]).val(), notes: $(text[1]).val(),done:false, date: d});
                            $(text[0]).val('');
                            $(text[1]).val('');
                        }
                        this.value="Add",
                        localStorage.setItem('lists',JSON.stringify(lists));
                        location.reload();
                    });

                    var remove=function(){                          //function which removes the checked items
                        oldlist=lists;
                        lists=[];
                        for (i in oldlist){
                            if(!oldlist[i].done)
                                lists.push(oldlist[i]);
                        localStorage.setItem('lists',JSON.stringify(lists));
                        }
                    }

                    

                    $('.removebutton').click(function(){            //function for removing
                        remove();
                        refresh(page);
                    });

                    $('.editbutton').click(function(){              //function for editing a specific entry
                        edititem=$(this).parents('.listItems')[0];
                        $($(edititem).children('.checkbox')[0]).prop('checked',true);
                        indexp=$(edititem).index()/2;
                        index=(page-1)*pagelimit + indexp;
                        text=$('.text');
                        lists[index].done=true;
                        $(text[0]).val(lists[index].title);
                        $(text[1]).val(lists[index].notes);
                        $(text[1]).focus();
                        $('.addbutton').attr('value','Update');
                    });
                }


                pagelimit=2;

                refresh(page);

                
            }
});
});