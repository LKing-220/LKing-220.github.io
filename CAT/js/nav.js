function navFn() {
    let loadRight = document.querySelector('#load_right');
    let navUse = document.querySelector('#nav_use');
    let add = document.querySelector("#add");
    if (userIsLogin) {
        ajax("GET", "/user/id?id=" + userData.data.loginId + "", 0, 0, function() {
            console.log(ret);
            var datas = ret.data;
            if (datas.img == null) {
                datas.img = 'https://dummyimage.com/400x400';
            }
            navUse.querySelector('img').src = datas.img;
            navUse.style.display = 'block';
            loadRight.style.display = 'none';
        });
    }


    //页面跳转
    var lis = navUse.querySelectorAll('li');
    lis[0].addEventListener('click', function() {
        none();
        nav.style.display = 'block';
        userinfo.style.display = 'block';
    })
    lis[1].addEventListener('click', function() {
        none();
        nav.style.display = 'block';
        modifyInformation.style.display = 'block';
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
    var a = document.querySelectorAll('.main')
    for (var i = 0; i < a.length; i++)
        a[i].addEventListener('click', function() {
            none();
            main.style.display = 'block';
            nav.style.display = 'block';
        })
}