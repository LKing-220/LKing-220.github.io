let mainEssays = null;
let main = null;

function mainFn() {


    function mainContent() {

        ajax("GET", "article/list/page?page=1&pageSize=10", 0, 0, function() {
            console.log(ret);
            var datas = ret.data.records;
            for (var i = 0; i < datas.length; i++) {
                console.log(datas[i]);
                var div = document.createElement('div');
                div.className = 'main_essay';
                if (datas[i].img == null) {
                    datas[i].img = 'https://dummyimage.com/400x400';
                }
                div.index = datas[i].id;
                div.innerHTML = '<a href="javascript:;"><img src="' + datas[i].img + '" alt="" class="main_essayImg"><span class="main_writer">' + datas[i].userDto.nickname + '</span><span class="main_timer">' + datas[i].createTime + '</span><h4>' + datas[i].title + '</h4><p>' + datas[i].summary + '</p></a><ul><li>&#xe8bf;' + datas[i].viewed + '</li><li>&#xe61b;' + datas[i].liked + '</li><li>&#xe618;' + datas[i].shared + '</li></ul>';
                mainEssays.appendChild(div);
                div.addEventListener('click', function() {
                    if (userIsLogin == false) {
                        console.log('未登录');
                        loadFn();
                    } else {
                        essayCF(this.index);
                    }
                })
            }
        });

    }
    mainContent();
}