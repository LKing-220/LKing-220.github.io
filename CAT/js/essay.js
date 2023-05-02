;
let essayCF = null;
let isFollow = 1;
let sending = false;
let ID = null;
let followSending = false;

function essayFn() {
    essayContent = essay.querySelector('#essay_content');
    essayUser = essay.querySelector('#essay_user');
    essayLeft = essay.querySelector('#essay_left');
    var userComment = essayContent.querySelector('#user_comment');
    essayCF = function(id) {
        ajax("GET", "article/detail?id=" + id + "", 0, 0, function() {
            console.log(ret);
            var datas = ret.data;
            if (datas.img == null) {
                datas.img = 'https://dummyimage.com/400x400';
            }
            userComment.querySelector('img').src = userDatas.avator;
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
            //发表评论
            lunchComment(id)
            ID = datas.userDto.userId;
        });
    }

    //浏览文章
    function essayViewed(id) {
        ajax("POST", "doArticle/view?articleId=" + id + "&satoken=" + tokenValue, 0, 0, function() {
            console.log(ret);
        });
    }

    //修改右边用户内容
    let userInfoSending = false;

    function userInfo(id) {
        if (userInfoSending == false) {
            userInfoSending = true;
            ajax("GET", "user/id?id=" + id + "", 0, 0, function() {
                var datas = ret.data;
                if (datas.avator == null) {
                    datas.avator = 'https://dummyimage.com/400x400';
                }
                essayContent.children[1].children[0].children[0].src = datas.avator;
                essayUser.querySelector('img').src = datas.avator;
                essayUser.children[1].innerHTML = datas.nickname;
                //判断是否关注了该用户
                essayFollowJudge(id);
                //关注操作
                follow(id, document.querySelector('#essay_follow').children[0]);
                none();
                essay.style.display = 'block';
                essayUser.children[0].addEventListener('click', function(event) {
                    event.stopPropagation();
                    if (sending == false) {
                        sending = true;
                        if (ID == userDatas.userId) {
                            uIfu();
                        } else {
                            otherIfu(ID);
                        }
                    }
                })
                userInfoSending = false;
            });
        }
    }

    //修改文章内容
    function essayCont(datas) {
        essayContent.children[0].innerHTML = datas.title;
        essayContent.children[3].innerHTML = datas.content;
        if (checkURL(datas.img)) {
            essayContent.children[2].src = datas.img;
        } else {
            essayContent.children[2].src = '';
        }
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

    var comments = essayContent.querySelector('#comments');
    //获取评论信息
    function essayComment(num, obj) {
        comments.innerHTML = '';
        ajax("GET", "comment/first?articleId=" + num + "&page=1&pageSize=20", 0, 0, function() {
            console.log('获取评论');
            var datas = ret.data.records;
            console.log(datas);
            obj.innerHTML = datas.length;
            //渲染评论信息
            for (var i = 0; i < datas.length; i++) {
                if (datas[i].userDto.avator == null) {
                    datas[i].userDto.avator = 'https://dummyimage.com/400x400';
                }
                if (datas[i].childs == null) {
                    datas[i].childs = '点赞';
                }
                var div = document.createElement('div');
                div.innerHTML = '<img src="' + datas[i].userDto.avator + '"><div><span class="essay_commenter">' + datas[i].userDto.nickname + '</span><span class="essay_commentTime">' + datas[i].createTime + '</span></div><p>' + datas[i].content + '</p><ul><li>&#xe66e;<i>点赞</i></li><li>&#xe618;<i>' + datas[i].childs + '</i></li></ul>'
                comments.appendChild(div);
            }

        })
    }


    //判断是否关注了该用户
    var followEle = document.querySelector('#essay_follow').children[0];

    function essayFollowJudge(id) {
        followJudge(id, followEle);
    };

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

    //发表评论
    let lunchCommentSending = false;

    function lunchComment(id) {
        var commentContent = userComment.querySelector('#essay_user_comment');
        var userCommentBtn = userComment.querySelector('button');
        userCommentBtn.addEventListener('click', function() {
            var data = {
                "articleId": id,
                "content": commentContent.value,
                "parentCommentId": -1,
                "rootCommentId": -1
            };
            if (commentContent.value && lunchCommentSending == false) {
                lunchCommentSending = true;
                ajax("POST", "comment?satoken=" + tokenValue, data, 1, function() {
                    alert(ret.data);
                    lunchCommentSending = false;
                    essayCF(id);
                })
            } else {
                alert('未填写评论内容');
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