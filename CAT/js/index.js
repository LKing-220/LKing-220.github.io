let userData = new Object;
let userIsLogin = false;
let userDataPassword = null;
let loadSuccessful = null;
let body = null;
let load = null;
let essay = null;
let nav = null;

window.addEventListener('load', function() {
    let loadRight = document.querySelector('#load_right');
    body = document.querySelector('body');
    load = document.querySelector('#load');


    loadSuccessful = document.querySelector('#loadSuccessful');
    inputs = load.querySelectorAll('input');
    inputs[0].value = "zsj1";
    inputs[1].value = '111111';
    mainFn();
    essayFn();
    //点击登录按钮，转跳到登录界面
    loadRight.addEventListener('click', function() {
        console.log(userData);
        if (Object.getOwnPropertyNames(userData).length == 0) {
            loadFn()
        }
    });
})