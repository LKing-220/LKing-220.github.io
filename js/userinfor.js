var userHome = document.querySelectorAll('.userHome');
for (var i = 0; i < userHome.length; i++) {
    userHome[i].addEventListener('click', function() {
        //转跳用户主页
        none();
        nav.style.display = 'block';
        userinfor.style.display = 'block';
        var obj = document.querySelector('#userinfor_top')
        userinforMy.style.display = 'block';
        obj.children[2].style.display = '';
        obj.children[0].src = userDatas.avator;
        obj.querySelector('h2').innerHTML = userDatas.nickname;
        uIfu();
    })
}

function uIfu() {

    var uIRight = document.querySelector('#userinfor_right')
    var is = uIRight.querySelectorAll('i');
    is[0].innerHTML = userDatas.fans;
    is[1].innerHTML = userDatas.follows;
}


function otherIfu(id) {
    none();
    nav.style.display = 'block';
    userinfor.style.display = 'block';
    userinfor.querySelector('#userinfor_other').style.display = 'block';
    var uIt = document.querySelector('#userinfor_top');
    var obj = document.querySelector('#userinfor_other').querySelector('button');
    //获取用户信息
    ajax("GET", "user/id?id=" + id + "", 0, 0, function() {
        console.log(ret);
        data = ret.data;
        if (data.avator == null) {
            data.avator = 'https://dummyimage.com/400x400';
        }
        uIt.querySelector('h2').innerHTML = data.nickname;
        uIt.querySelector('img').src = data.avator;
    });
    //判断是否关注了该用户
    followJudge(id, obj);
}