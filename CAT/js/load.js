function loadFn() {
    load.style.display = 'flex'
    body.className = 'bodyHidden';
    btns = load.querySelectorAll('button');
    inputs = load.querySelectorAll('input');

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    btns[0].addEventListener('click', function() {
        console.log('发送登录申请');
        var data = {
            password: "" + inputs[1].value + "",
            username: "" + inputs[0].value + ""
        };

        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                isSending = false;

                if (mainXhrEssay.status / 100 === 2) {
                    userData = xhr.response;
                    console.log(userData);
                    userDataPassword = inputs[1].value;
                    loadSusseful();
                } else {}
            }
        })

        xhr.open("POST", "http://106.52.239.206:8081/user/doLogin");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(JSON.stringify(data));

    })
    btns[1].addEventListener('click', function() {
        console.log('发送注册申请');


        var data = {
            password: "" + inputs[1].value + "",
            username: "" + inputs[0].value + ""
        };

        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                console.log(this.response);
            }
        });

        xhr.open("POST", "http://106.52.239.206:8081/user/doLogin");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(JSON.stringify(data));

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

}