let loadFnSending = false;

function loadFn() {
    load.style.display = 'flex'
    body.className = 'bodyHidden';
    btns = load.querySelectorAll('button');
    inputs = load.querySelectorAll('input');
    let i = load.querySelector('i');

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
    btns[0].addEventListener('click', function() {

        if (loadFnSending == false) {
            loadFnSending = true;
            console.log('发送登录申请');
            var data = {
                password: "" + inputs[1].value + "",
                username: "" + inputs[0].value + ""
            };

            ajax("POST", "user/doLogin", data, 1, function() {
                loadFnSending = false;
                userData = ret;
                tokenValue = userData.data.tokenValue;
                console.log(userData);
                userDataPassword = inputs[1].value;
                userIsLogin = userData.data.isLogin;
                localStorage.setItem('userData', JSON.stringify(userData));
                localStorage.setItem('userIsLogin', userData.data.isLogin);
                loadSusseful();
                navFn();
            });
        }


    })
    btns[1].addEventListener('click', function() {
        if (loadFnSending == false) {
            loadFnSending = true;
            console.log('发送注册申请');

            var data = {
                password: "" + inputs[1].value + "",
                username: "" + inputs[0].value + ""
            };


            ajax("POST", "user/register", data, 1, function() {
                loadFnSending = false;
                if (ret.msg)
                    alert(ret.msg);
                else
                    alert(ret.data + '请点击登录按钮即可登录');
            });
        }

    })

    function loadSusseful() {
        if (userData.code == 1) {
            loadSuccessful.style.display = 'block';
            body.className = '';
            load.style.display = 'none';
            setTimeout(function() {
                loadSuccessful.style.display = 'none';
            }, 200)
        }
    }
    var em = load.querySelector('em');
    em.addEventListener('click', function() {
        body.className = '';
        load.style.display = 'none';
    })

}