function navFn() {
    let loadRight = document.querySelector('#load_right');
    let navUse = document.querySelector('#nav_use');
    let add = document.querySelector("#add");
    if (userIsLogin) {
        ajax("GET", "user/id?id=" + userData.data.loginId + "", 0, 0, function() {
            console.log(ret);
            userDatas = ret.data;
            if (userDatas.avator == null) {
                userDatas.avator = 'https://dummyimage.com/400x400';
            }
            navUse.querySelector('img').src = userDatas.avator;
            navUse.style.display = 'block';
            loadRight.style.display = 'none';
        });
    }


    //页面跳转
    var lis = navUse.querySelectorAll('li');
    lis[0].addEventListener('click', function() {
        //转跳用户主页
        none();
        nav.style.display = 'block';
        userinfor.style.display = 'block';
        var obj = document.querySelector('#userinfor_top')
        userinforMy.style.display = 'block';
        obj.children[0].src = userDatas.avator;
        obj.querySelector('h2').innerHTML = userDatas.nickname;

    })
    lis[1].addEventListener('click', function() {
        //转跳修改用户信息页面
        none();
        nav.style.display = 'block';
        modifyinfor.style.display = 'block';
        document.querySelector('#subImg').querySelector('img').src = userDatas.avator;
        document.querySelector('#infor_form').children[1].querySelector('input').value = userDatas.nickname;

    })
    lis[2].addEventListener('click', function() {
        console.log('退出登录');
        localStorage.setItem('userData', '');
        localStorage.setItem('userIsLogin', false);
    })
    add.addEventListener('click', function() {
        if (userIsLogin == false) {
            console.log('未登录');
            loadFn();
        } else {
            none();
            nav.style.display = 'none';
            addEssay.style.display = 'block';
        }
    })

    var retmain = document.querySelectorAll('.main')
    for (var i = 0; i < retmain.length; i++)
        retmain[i].addEventListener('click', function() {
            none();
            main.style.display = 'block';
            nav.style.display = 'block';
        })

}