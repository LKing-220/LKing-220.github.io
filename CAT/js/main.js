let mainArticlePage = 1;

function mainContent() {
    ajax("GET", "article/list/page?page=" + mainArticlePage + "&pageSize=10", 0, 0, function() {
        var datas = ret.data.records;
        console.log('获取文章', datas);
        for (var i = 0; i < datas.length; i++) {
            var div = document.createElement('div');
            div.className = 'main_essay';
            if (checkURL(datas[i].img)) {
                div.innerHTML = '<div><img src="' + datas[i].img + '" alt="" class="main_essayImg"><span class="main_writer">' + datas[i].userDto.nickname + '</span><span class="main_timer">' + datas[i].createTime + '</span><h4>' + datas[i].title + '</h4><p>' + datas[i].summary + '</p></div><ul><li>&#xe8bf;' + datas[i].viewed + '</li><li>&#xe61b;' + datas[i].liked + '</li><li>&#xe681;' + datas[i].shared + '</li></ul>';
            } else {
                div.innerHTML = '<div><span class="main_writer">' + datas[i].userDto.nickname + '</span><span class="main_timer">' + datas[i].createTime + '</span><h4>' + datas[i].title + '</h4><p>' + datas[i].summary + '</p></div><ul><li>&#xe8bf;' + datas[i].viewed + '</li><li>&#xe61b;' + datas[i].liked + '</li><li>&#xe681;' + datas[i].shared + '</li></ul>';
            }
            div.index = datas[i].id;
            mainEssays.appendChild(div);
            div.addEventListener('click', function() {
                if (userIsLogin == false) {
                    console.log('未登录');
                    loadFn();
                } else {
                    essayID = this.index;
                    essayCF();
                }
            })
        }
        if (datas.length < 10) {
            mainMoreArticle.innerHTML = '已经到底啦';
        } else {
            mainMoreArticle.innerHTML = '点击加载更多文章';
        }
    });
}

mainContent();
let mainMoreArticle = document.querySelector('#main_moreArticle');
mainMoreArticle.addEventListener('click', function() {
    mainArticlePage++;
    mainContent();
})