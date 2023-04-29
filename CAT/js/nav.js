function navFn() {
    let loadRight = document.querySelector('#load_right');
    let navUse = document.querySelector('#nav_use');
    let add = document.querySelector("#add");
    if (userIsLogin) {
        //获取用户信息
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

    let mainsending = false;
    var retmain = document.querySelectorAll('.main')
    for (var i = 0; i < retmain.length; i++)
        retmain[i].addEventListener('click', function() {
            if (mainsending == false) {
                mainsending = true;
                setTimeout(function() {
                    none();
                    console.clear();
                    mainFn()
                    mainEssays.innerHTML = '';
                    main.style.display = 'block';
                    nav.style.display = 'block';
                    navSearch.children[0].value = '';
                    mainsending = false
                }, 500)
            }
        })

}