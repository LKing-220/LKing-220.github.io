let userinforRight = document.querySelector('#userinfor_right');

function otherIfu(id) {
    none();
    var is = userinforRight.querySelectorAll('i');
    nav.style.display = 'block';
    userinfor.style.display = 'block';
    userinfor.querySelector('#userinfor_other').style.display = 'block';
    var uIt = document.querySelector('#userinfor_top');
    var obj = document.querySelector('#userinfor_other').querySelector('button');
    //获取用户信息
    ajax("GET", "user/id?id=" + id, 0, 0, function() {
        console.log(ret);
        data = ret.data;
        if (data.avator == null) {
            data.avator = 'https://dummyimage.com/400x400';
        }
        uIt.querySelector('h2').innerHTML = data.nickname;
        uIt.querySelector('img').src = data.avator;
        is[0].innerHTML = data.follows;
        is[1].innerHTML = data.fans;
    });
    //判断是否关注了该用户
    followJudge(id, obj);

    //获取某个用户的文章
    getEssay(id);

    //关注操作
    follow(id, obj);

    //获取关注列表
    followList(id);
    //获取粉丝列表
    fansList(id);
}

//获取某个用户的文章
let userinforList = document.querySelector('#userinfor_list');
let userFollowList = document.querySelector('#userFollow_list');
let getEssaySending = false;

function getEssay(id) {
    if (getEssaySending == false) {
        getEssaySending = true;
        ajax("GET", "article/of/user?id=" + id + "&page=1&pageSize=20", 0, 0, function() {
            console.log('获取某个用户的文章');
            userinforList.innerHTML = '<h3>文章</h3>';
            console.log(userinforList.innerHTML);
            var datas = ret.data.records;
            console.log(datas);
            for (var i = 0; i < datas.length; i++) {
                var div = document.createElement('div');
                div.className = 'userEssay';
                if (checkURL(datas[i].img)) {
                    div.innerHTML = '<div><img src="' + datas[i].img + '" alt="" class="main_essayImg"><span class="main_writer">' + datas[i].userDto.nickname + '</span><span class="main_timer">' + datas[i].createTime + '</span><h4>' + datas[i].title + '</h4><p>' + datas[i].summary + '</p></div><ul><li>&#xe8bf;' + datas[i].viewed + '</li><li>&#xe61b;' + datas[i].liked + '</li><li>&#xe681;' + datas[i].shared + '</li></ul>';
                } else {
                    div.innerHTML = '<div><span class="main_writer">' + datas[i].userDto.nickname + '</span><span class="main_timer">' + datas[i].createTime + '</span><h4>' + datas[i].title + '</h4><p>' + datas[i].summary + '</p></div><ul><li>&#xe8bf;' + datas[i].viewed + '</li><li>&#xe61b;' + datas[i].liked + '</li><li>&#xe681;' + datas[i].shared + '</li></ul>';
                }
                div.index = datas[i].id;
                userinforList.appendChild(div);
                div.addEventListener('click', function() {
                    essayCF(this.index);
                })
            }
            getEssaySending = false;
            sending = false;
        })
    }
}

var userHome = document.querySelectorAll('.userHome');
let updateEssayId = null;
let update = false;
for (var i = 0; i < userHome.length; i++) {
    userHome[i].addEventListener('click', function() {
        uIfu();
    })
}

function uIfu() { //转跳用户主页
    none();
    nav.style.display = 'block';
    userinfor.style.display = 'block';
    var obj = document.querySelector('#userinfor_top')
    userinforMy.style.display = 'block';
    obj.children[2].style.display = '';
    obj.children[0].src = userDatas.avator;
    obj.querySelector('h2').innerHTML = userDatas.nickname;
    var is = userinforRight.querySelectorAll('i');
    is[0].innerHTML = userDatas.follows;
    is[1].innerHTML = userDatas.fans;

    //获取我的文章
    getMyEssay()

    //获取关注列表
    followList(userDatas.userId);
    //获取粉丝列表
    fansList(userDatas.userId);
}

//获取我的文章
function getMyEssay() {
    if (getEssaySending == false) {
        getEssaySending = true;
        ajax("GET", "article/me?satoken=" + tokenValue + "&page=1&pageSize=20", 0, 0, function() {
            console.log('获取我的文章');
            userinforList.innerHTML = '<h3>文章</h3>';
            var datas = ret.data.records;
            console.log(datas);
            for (var i = 0; i < datas.length; i++) {
                var div = document.createElement('div');
                div.className = 'userEssay';
                div.innerHTML = '<div><img src="' + datas[i].img + '" alt="" class="main_essayImg"><span class="main_writer">' + datas[i].userDto.nickname + '</span><span class="main_timer">' + datas[i].createTime + '</span><h4>' + datas[i].title + '</h4><p>' + datas[i].summary + '</p></div><ul><li>&#xe8bf;' + datas[i].viewed + '</li><li>&#xe61b;' + datas[i].liked + '</li><li>&#xe681;' + datas[i].shared + '</li><li class="deleteEssay">删除文章</li><li class="updateEssay">修改文章</li></ul>';
                div.index = datas[i].id;
                userinforList.appendChild(div);
                div.addEventListener('click', function() {
                    essayCF(this.index);
                })
                div.querySelector('.deleteEssay').addEventListener('click', function(event) {
                    event.stopPropagation();
                    this.parentNode.parentNode.style.display = 'none';
                    ajax("POST", "article/delete?articleId=" + this.parentNode.parentNode.index, 0, 0, function() {
                        userinforList.innerHTML = '<h3>文章</h3>';
                        alert(ret.data);

                    });
                }, false)
                div.querySelector('.updateEssay').addEventListener('click', function(event) {
                    event.stopPropagation();
                    updateArticle(this.parentNode.parentNode.index);
                    updateEssayId = this.parentNode.parentNode.index;
                    update = true;
                    console.log(updateEssayId);
                }, false)
            }
            getEssaySending = false;
            sending = false;
        })
    }
}

//修改文章
function updateArticle(id) {
    none();
    nav.style.display = 'none';
    addEssay.style.display = 'block';
    document.querySelector('#addessay_head').querySelector('img').src = userDatas.avator;
    ajax("GET", "article/detail?id=" + id + "", 0, 0, function() {
        console.log(ret);
        var datas = ret.data;
        addInputs[0].value = datas.title;
        addInputs[1].value = datas.content;
        addInputs[2].src = datas.img;
        addInputs[3].value = datas.summary;

    });
}


//获取信息
let doTypeSending = false;
var userInavLis = document.querySelector('#userinfor_nav').querySelectorAll('li');
var userInavLisNow = 1;
userInavLis[1].addEventListener('click', function() {
    this.className = 'blueBottom';
    userInavLis[userInavLisNow].className = '';
    userInavLisNow = 1;
    userinforList.style.display = 'block';
    userFollowList.style.display = 'none';
})

userInavLis[4].addEventListener('click', function() {
    if (userinforMy.style.display == 'block') {
        userInavLis[userInavLisNow].className = '';
        userInavLis[4].className = 'blueBottom';
        userInavLisNow = 4;
        userinforList.style.display = 'block';
        userFollowList.style.display = 'none';
        if (doTypeSending == false) {
            doTypeSending = true;
            ajax("GET", "article/doToArticle?doType=collect&satoken=" + tokenValue, 0, 0, function() {
                userinforList.innerHTML = '<h3>收藏集</h3>';
                var datas = ret.data;
                console.log(datas);
                for (var i = 0; i < datas.length; i++) {
                    var div = document.createElement('div');
                    div.className = 'userEssay';
                    if (checkURL(datas[i].img)) {
                        div.innerHTML = '<div><img src="' + datas[i].img + '" alt="" class="main_essayImg"><span class="main_writer">' + datas[i].userDto.nickname + '</span><span class="main_timer">' + datas[i].createTime + '</span><h4>' + datas[i].title + '</h4><p>' + datas[i].summary + '</p></div><ul><li>&#xe8bf;' + datas[i].viewed + '</li><li>&#xe61b;' + datas[i].liked + '</li><li>&#xe681;' + datas[i].shared + '</li></ul>';
                    } else {
                        div.innerHTML = '<div><span class="main_writer">' + datas[i].userDto.nickname + '</span><span class="main_timer">' + datas[i].createTime + '</span><h4>' + datas[i].title + '</h4><p>' + datas[i].summary + '</p></div><ul><li>&#xe8bf;' + datas[i].viewed + '</li><li>&#xe61b;' + datas[i].liked + '</li><li>&#xe681;' + datas[i].shared + '</li></ul>';
                    }
                    div.index = datas[i].id;
                    userinforList.appendChild(div);
                    div.addEventListener('click', function() {
                        essayCF(this.index);
                        userInavLis[1].className = 'blueBottom';
                        userInavLis[userInavLisNow].className = '';
                        userInavLisNow = 1;
                    })
                }
                doTypeSending = false;
            })
        }
    }
})

userInavLis[6].addEventListener('click', function() {
    if (userinforMy.style.display == 'block') {
        userInavLis[userInavLisNow].className = '';
        userInavLis[6].className = 'blueBottom';
        userInavLisNow = 6;
        userinforList.style.display = 'block';
        userFollowList.style.display = 'none';
        if (doTypeSending == false) {
            doTypeSending = true;
            ajax("GET", "article/doToArticle?doType=like&satoken=" + tokenValue, 0, 0, function() {
                userinforList.innerHTML = '<h3>点赞</h3>';
                var datas = ret.data;
                console.log(datas);
                for (var i = 0; i < datas.length; i++) {
                    var div = document.createElement('div');
                    div.className = 'userEssay';
                    if (checkURL(datas[i].img)) {
                        div.innerHTML = '<div><img src="' + datas[i].img + '" alt="" class="main_essayImg"><span class="main_writer">' + datas[i].userDto.nickname + '</span><span class="main_timer">' + datas[i].createTime + '</span><h4>' + datas[i].title + '</h4><p>' + datas[i].summary + '</p></div><ul><li>&#xe8bf;' + datas[i].viewed + '</li><li>&#xe61b;' + datas[i].liked + '</li><li>&#xe681;' + datas[i].shared + '</li></ul>';
                    } else {
                        div.innerHTML = '<div><span class="main_writer">' + datas[i].userDto.nickname + '</span><span class="main_timer">' + datas[i].createTime + '</span><h4>' + datas[i].title + '</h4><p>' + datas[i].summary + '</p></div><ul><li>&#xe8bf;' + datas[i].viewed + '</li><li>&#xe61b;' + datas[i].liked + '</li><li>&#xe681;' + datas[i].shared + '</li></ul>';
                    }
                    div.index = datas[i].id;
                    userinforList.appendChild(div);
                    div.addEventListener('click', function() {
                        userInavLis[1].className = 'blueBottom';
                        userInavLis[userInavLisNow].className = '';
                        userInavLisNow = 1;
                        essayCF(this.index);
                    })
                }
                doTypeSending = false;
            })
        }
    }
})

userInavLis[5].addEventListener('click', function() {
    this.className = 'blueBottom';
    userInavLis[userInavLisNow].className = '';
    userInavLisNow = 5;
    userinforList.style.display = 'none';
    userFollowList.style.display = 'block';
})
var userFLis = userFollowList.querySelectorAll('li');
userFLis[0].addEventListener('click', function() {
    userFans.style.display = 'none';
    userFollows.style.display = 'block';
    userFLis[1].className = '';
    userFLis[0].className = 'blue';
})
userFLis[1].addEventListener('click', function() {
    userFollows.style.display = 'none';
    userFans.style.display = 'block';
    userFLis[0].className = '';
    userFLis[1].className = 'blue';
})

//获取关注列表
let followListSending = false;

function followList(id) {
    var userFollows = document.querySelector('#userFollows');
    if (followListSending == false) {
        followListSending = true;
        ajax("GET", "follow/me/follows?id=" + id, 0, 0, function() {
            userFollows.innerHTML = '';
            console.log(id + '获取关注列表', ret);
            var data = ret.data;
            for (var i = 0; i < data.length; i++) {
                if (data[i].avator == null) {
                    data[i].avator = 'https://dummyimage.com/400x400';
                }
                var div = document.createElement('div');
                div.index = data[i].userId;
                div.className = 'userFollow_user';
                div.innerHTML = '<img src="' + data[i].avator + '" class="userFollow_userImg"><h3 class="userFollow_userName">' + data[i].nickname + '</h3><p class="userFollow_userFollow">' + data[i].follows + '个关注者</p>'
                userFollows.appendChild(div);
                div.addEventListener('click', function() { otherIfu(this.index) })
            }
            followListSending = false;
        });
    }
}

// 获取粉丝列表

let fansListSending = false;

function fansList(id) {
    var userFans = document.querySelector('#userFans');
    if (fansListSending == false) {
        fansListSending = true;
        ajax("GET", "follow/me/fans?id=" + id, 0, 0, function() {
            userFans.innerHTML = '';
            console.log(id + '获取粉丝列表', ret);
            var data = ret.data;
            for (var i = 0; i < data.length; i++) {
                if (data[i].avator == null) {
                    data[i].avator = 'https://dummyimage.com/400x400';
                }
                var div = document.createElement('div');
                div.index = data[i].userId;
                div.className = 'userFollow_user';
                div.innerHTML = '<img src="' + data[i].avator + '" class="userFollow_userImg"><h3 class="userFollow_userName">' + data[i].nickname + '</h3><p class="userFollow_userFollow">' + data[i].follows + '个关注者</p>'
                userFans.appendChild(div);
                div.addEventListener('click', function() { otherIfu(this.index) })
            }
            fansListSending = false;
        });
    }
}