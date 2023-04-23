function navFn() {
    let loadRight = document.querySelector('#load_right');
    let navUse = document.querySelector('#nav_use');

    if (userDataPassword) {
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
    } else {}
    var lis = navUse.querySelectorAll('li');
    lis[0].addEventListener('click', function() {
        none();
        myOrother.style.display = 'block';
        console.log(777);
    })
    lis[1].addEventListener('click', function() {
        none();
        modifyInformation.style.display = 'block';
        console.log(213);
    })
}