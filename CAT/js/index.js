//判断是否登录过
let userData = new Object;
let userDatas = new Object;
let tokenValue = null;
let userDataPassword = null;
var temp = localStorage.getItem('userData');
let userIsLogin = (localStorage.getItem('userIsLogin') == 'true') ? true : false;
console.log(userIsLogin);
if (userIsLogin) {
    userDataPassword = localStorage.getItem('userDataPassword');
    userData = JSON.parse(temp);
    console.log(userData);
    tokenValue = userData.data.tokenValue;
} else {
    console.log('未登录');
}

//页面加载完毕后进行的第一个操作
window.addEventListener('load', function() {
    let loadRight = document.querySelector('#load_right');
    navFn()
    loadSuccessful = document.querySelector('#loadSuccessful');
    inputs = load.querySelectorAll('input');
    inputs[0].value = "";
    inputs[1].value = "";
    // mainFn();
    // essayFn();
    //点击登录按钮，转跳到登录界面
    loadRight.addEventListener('click', function() {
        if (Object.getOwnPropertyNames(userData).length == 0) {
            loadFn()
        }
    });
})