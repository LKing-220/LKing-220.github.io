;
let essayCF = null;

function essayFn() {
    essayContent = essay.querySelector('#essay_content');
    essayUser = essay.querySelector('#essay_user');
    essayLeft = essay.querySelector('#essay_left');


    essayCF = function(num) {

        ajax("GET", "article/detail?id=" + num + "", 0, 0, function() {
            console.log(ret);
            var datas = ret.data;
            if (datas.img == null) {
                datas.img = 'https://dummyimage.com/400x400';
            }
            essayCont(datas);
            essayLe(datas, num);
            userInfo(datas.userDto.userId);
        });
    }

    //修改右边用户内容
    function userInfo(id) {
        ajax("GET", "user/id?id=" + id + "", 0, 0, function() {

            var datas = ret.data;
            if (datas.img == null) {
                datas.img = 'https://dummyimage.com/400x400';
            }
            essayContent.children[1].children[0].children[0].src = datas.img;
            essayUser.querySelector('img').src = datas.img;
            essayUser.children[1].innerHTML = datas.nickname;

            none();
            essay.style.display = 'block';
        });

    }

    //修改文章内容
    function essayCont(datas) {
        essayContent.children[0].innerHTML = datas.title;
        essayContent.children[3].innerHTML = datas.content;
        essayContent.children[2].src = datas.img;
        essayContent.children[1].children[1].innerHTML = datas.userDto.nickname;
        essayContent.children[1].children[2].innerHTML = datas.updateTime;
        essayContent.children[1].children[3].innerHTML = "阅读" + datas.viewed;
    }

    //修改左边框内容
    function essayLe(datas, num) {
        var is = essayLeft.querySelectorAll('i');
        is[0].innerHTML = datas.liked;
        is[2].innerHTML = datas.collected;
        is[3].innerHTML = datas.shared;
        essayComment(num, is[1])

        //判断是否点赞过
        likeJudge(datas.id, is[0])

        //判断是否收藏
        collecteJudge(datas.id, is[2])

        //点赞操作
        like(datas.id);


        //收藏操作
        collecte(datas.id)
    }

    //获取评论信息
    function essayComment(num, obj) {

        ajax("GET", "comment/first?articleId=" + num + "&page=1&pageSize=10", 0, 0, function() {
            console.log(ret);

            var datas = ret.data;
            if (datas.img == null) {
                datas.img = 'https://dummyimage.com/400x400';
            }
            obj.innerHTML = datas.total;
        })
    }

    //判断是否收藏
    function likeJudge(id, obj) {

        ajax("GET", "doArticle/or/not/like?articleId=" + id + "&satoken=" + tokenValue, 0, 0,
            function() {
                console.log(ret);
                if (ret.data) {
                    obj.parentNode.style.backgroundColor = '#71aeff';
                } else {
                    obj.parentNode.style.backgroundColor = '';
                }
            })
    }

    //判断是否点赞过
    function collecteJudge(id, obj) {

        ajax("GET", "doArticle/or/not/collect?articleId=" + id + "&satoken=" + tokenValue, 0, 0,
            function() {
                console.log(ret);
                if (ret.data) {
                    obj.parentNode.style.backgroundColor = '#71aeff';
                } else {
                    obj.parentNode.style.backgroundColor = '';
                }
            })
    }

}
let likeSending = false;

//点赞操作
function like(id) {

    var likes = document.querySelectorAll('.like')
    for (var i = 0; i < likes.length; i++) {
        likes[i].index = i;
        likes[i].addEventListener('click', function() {

            likeOk(this);

            function likeOk(e) {
                if (likeSending == false) {
                    likeSending = true;
                    ajax("POST", "doArticle/like?articleId=" + id + "&satoken=" + tokenValue, 0, 0,
                        function() {
                            console.log(ret);
                            var j = e.children[0].innerHTML;
                            if (ret.data == '点赞成功') {
                                e.children[0].innerHTML = 1 + 1 * j;
                                e.style.backgroundColor = '#71aeff';
                            } else {
                                e.children[0].innerHTML = 1 * j - 1;
                                e.style.backgroundColor = '';
                            }
                            likeSending = false;
                        })
                }

            }
        })
    }
}

let collecteSending = false;
//收藏操作
function collecte(id) {

    var collectes = document.querySelectorAll('.collecte')
    for (var i = 0; i < collectes.length; i++) {
        collectes[i].index = i;
        collectes[i].addEventListener('click', function() {
            collecteOK(this);

            function collecteOK(e) {
                if (collecteSending == false) {
                    collecteSending = true;
                    ajax("POST", "doArticle/collect?articleId=" + id + "&satoken=" + tokenValue, 0, 0,
                        function() {
                            console.log(ret);
                            var j = e.children[0].innerHTML;
                            if (ret.data == '收藏成功') {
                                e.children[0].innerHTML = 1 + 1 * j;
                                e.style.backgroundColor = '#71aeff';
                            } else {
                                e.children[0].innerHTML = 1 * j - 1;
                                e.style.backgroundColor = '';
                            }
                            collecteSending = false;
                        })
                }

            }
        })
    }
}