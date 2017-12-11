$(document).ready(function(){
    $($('.text')[0]).focus();
    $('#pagination-demo').twbsPagination({
            totalPages: 35,
            visiblePages: 4,
            onPageClick: function (event, page) {
                pagelimit=2;
                $('#page-content').text('Page '+page);
            

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
                            pagelist[i].done=true;
                        else
                            pagelist[i].done=false;
                });

                $('.addbutton').click(function(){
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

                var remove=function(){
                    oldlist=lists;
                    lists=[];
                    for (i in oldlist){
                        if(!oldlist[i].done)
                            lists.push(oldlist[i]);
                    localStorage.setItem('lists',JSON.stringify(lists));
                    }
                }

                $('.removebutton').click(function(){
                    remove();
                    location.reload();
                });

                $('.editbutton').click(function(){
                    edititem=$(this).parents('.listItems')[0];
                    $($(edititem).children('.checkbox')[0]).prop('checked',true);
                    indexp=$(edititem).index();
                    index=(page-1)*pagelimit + indexp;
                    text=$('.text');
                    lists[index].done=true;
                    $(text[0]).val(lists[index].title);
                    $(text[1]).val(lists[index].notes);
                    $(text[1]).focus();
                    $('.addbutton').value="Update";
                });

                $('.note').css({"display":"block"})
                $('.notebutton').text("Hide");
                $('.notebutton').click(function(){
                    note=$(this).parent().parent().next(".note");
                    note.toggle();
                    if (note.css("display")==="none")
                        $(this).text('Show');
                    else
                        $(this).text('Hide');
                });
            }
});
});