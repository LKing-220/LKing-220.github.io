let userData = new Object;
let userDatas = new Object;
let tokenValue = null;
var temp = localStorage.getItem('userData');
let userIsLogin = (localStorage.getItem('userIsLogin') == 'true') ? true : false;
console.log(userIsLogin);
if (userIsLogin) {

    userData = JSON.parse(temp);
    console.log(userData);
    tokenValue = userData.data.tokenValue;
} else {

    console.log('未登录');
}
window.addEventListener('load', function() {
    let loadRight = document.querySelector('#load_right');
    body = document.querySelector('body');
    load = document.querySelector('#load');
    acquire();
    navFn()


    loadSuccessful = document.querySelector('#loadSuccessful');
    inputs = load.querySelectorAll('input');
    inputs[0].value = "zsj1";
    inputs[1].value = '111111';
    mainFn();
    essayFn();
    //点击登录按钮，转跳到登录界面

    loadRight.addEventListener('click', function() {
        if (Object.getOwnPropertyNames(userData).length == 0) {
            loadFn()
        }
    });
})