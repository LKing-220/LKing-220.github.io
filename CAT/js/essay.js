;
let essayCF = null;
let isFollow = 1;

function essayFn() {
    essayContent = essay.querySelector('#essay_content');
    essayUser = essay.querySelector('#essay_user');
    essayLeft = essay.querySelector('#essay_left');

    essayCF = function(id) {
        ajax("GET", "article/detail?id=" + id + "", 0, 0, function() {
            console.log(ret);
            var datas = ret.data;
            if (datas.img == null) {
                datas.img = 'https://dummyimage.com/400x400';
            }
            //修改文章内容
            essayCont(datas);
            //修改左边框内容
            essayLe(datas, id);
            //修改右边用户内容
            userInfo(datas.userDto.userId);
            //浏览文章
            essayViewed(id);
            //分享操作
            share(id);
        });
    }

    //浏览文章
    function essayViewed(id) {
        ajax("POST", "doArticle/view?articleId=" + id + "&satoken=" + tokenValue, 0, 0, function() {
            console.log(ret);
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
            //判断是否关注了该用户
            essayFollowJudge(id);
            //关注操作
            follow(id)
            none();
            essay.style.display = 'block';
            essayUser.children[0].addEventListener('click', function() { otherIfu(id) })
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
        ajax("GET", "comment/first?articleId=" + num + "&page=1&pageSize=20", 0, 0, function() {
            console.log(ret);
            var datas = ret.data;
            if (datas.img == null) {
                datas.img = 'https://dummyimage.com/400x400';
            }
            obj.innerHTML = datas.total;
        })
    }

    //判断是否关注了该用户
    var followEle = document.querySelector('#essay_follow').children[0];

    function essayFollowJudge(id) {
        followJudge(id, followEle);
    };

    let followSending = false;
    //关注操作
    function follow(id) {
        var followEle = document.querySelector('#essay_follow').children[0];
        followEle.addEventListener('click', function() {
            if (followSending == false) {
                followSending = true;
                ajax("POST", "follow?id=" + id + "&isFollow=" + isFollow + "&satoken=" + tokenValue, 0, 0,
                    function() {
                        console.log(ret);

                        if (isFollow) {
                            isFollow = 0;
                            followEle.innerHTML = '已关注';
                            followEle.style.backgroundColor = '#cdcdcd';
                        } else {
                            isFollow = 1;
                            followEle.innerHTML = '关注';
                            followEle.style.backgroundColor = '';
                        }
                        followSending = false;
                    })
            }
        })

    }

    //判断是否点赞过
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

    //判断是否收藏
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

    var likes = document.querySelectorAll('.essay_like')
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

    var collectes = document.querySelectorAll('.essay_collecte')
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

let shareSending = false;

function share(id) {
    var shares = document.querySelectorAll('.essay_share')
    for (var i = 0; i < shares.length; i++) {
        shares[i].index = i;
        shares[i].addEventListener('click', function() {
            shareOk(this);

            function shareOk(e) {
                if (shareSending == false) {
                    shareSending = true;
                    ajax("POST", "doArticle/share?articleId=" + id + "&satoken=" + tokenValue, 0, 0,
                        function() {
                            console.log(ret);
                            shareSending = false;
                        })
                }
            }
        })
    }
}