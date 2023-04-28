var userHome = document.querySelectorAll('.userHome');
for (var i = 0; i < userHome.length; i++) {
    userHome[i].addEventListener('click', function() {
        //转跳用户主页
        none();
        nav.style.display = 'block';
        userinfor.style.display = 'block';
        var obj = document.querySelector('#userinfor_top')
        userinforMy.style.display = 'block';
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