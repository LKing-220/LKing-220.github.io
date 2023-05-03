//是否发送登录/注册请求
let loadSending = false;

function loadFn() {
    load.style.display = 'flex'
    body.className = 'bodyHidden';
    //登录注册按钮
    btns = load.querySelectorAll('button');
    //账号密码框
    inputs = load.querySelectorAll('input');
    let i = load.querySelector('i');

    //登录页面密码是否显示看见按钮
    var close = true;
    i.addEventListener('click', function() {
        if (close) {
            i.innerHTML = '&#xe8bf;';
            inputs[1].type = "text";
            close = false;
        } else {
            i.innerHTML = '&#xe69e;';
            inputs[1].type = "password";
            close = true;
        }
    })

    //点击登录事件
    btns[0].addEventListener('click', function() {
        if (loadSending == false) {
            loadSending = true;
            console.log('发送登录申请');
            //获取账号密码
            var data = {
                password: "" + inputs[1].value,
                username: "" + inputs[0].value
            };
            ajax("POST", "user/doLogin", data, 1, function() {
                if (ret.msg == null) {
                    userData = ret;
                    tokenValue = userData.data.tokenValue;
                    console.log('登录操作', userData);
                    userDataPassword = inputs[1].value;
                    userIsLogin = userData.data.isLogin;
                    localStorage.setItem('userDataPassword', userDataPassword)
                    localStorage.setItem('userData', JSON.stringify(userData));
                    localStorage.setItem('userIsLogin', userData.data.isLogin);
                    loadSusseful();
                    navFn();
                } else {
                    alert(ret.msg + '请检查是否注册过，或者是密码是否错误');
                }
                loadSending = false;
            });
        }
    })

    //点击注册事件
    btns[1].addEventListener('click', function() {
        if (loadSending == false) {
            loadSending = true;
            console.log('发送注册申请');
            //获取账号密码
            var data = {
                password: "" + inputs[1].value,
                username: "" + inputs[0].value
            };
            ajax("POST", "user/register", data, 1, function() {
                console.log('注册操作', ret);
                if (ret.msg)
                    alert(ret.msg);
                else
                    alert(ret.data + '请点击登录按钮即可登录');
                loadSending = false;
            });
        }
    })

    //登陆成功
    function loadSusseful() {
        if (userData.code == 1) {
            loadSuccessful.style.display = 'block';
            body.className = '';
            load.style.display = 'none';
            setTimeout(function() {
                loadSuccessful.style.display = 'none';
            }, 300)
        }
    }

    //关闭注册登录页面
    var em = load.querySelector('em');
    em.addEventListener('click', function() {
        body.className = '';
        load.style.display = 'none';
    })

}