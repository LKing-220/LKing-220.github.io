//修改用户信息
var submitUser = document.querySelector('#submitUser');
var modifies = document.querySelectorAll('.modify');
for (var i = 0; i < modifies.length; i++) {
    modifies[i].addEventListener('click', function() {
        //转跳修改用户信息页面
        none();
        nav.style.display = 'block';
        modifyinfor.style.display = 'block';
        document.querySelector('#subImg').querySelector('img').src = userDatas.avator;
        document.querySelector('#infor_form').children[1].querySelector('input').value = userDatas.nickname;
    })
}
// 点击修改按钮
submitUser.addEventListener('click', function() {
    var inform = document.querySelector('#infor_right').querySelectorAll('.inform');
    var num = 0;
    for (var i = 0; i < inform.length; i++) {
        if (inform[i].value || inform[i].src) {
            num++;
        }
    }
    //获取所需要的内容
    var data = {
        "intro": inform[3].value,
        "nickname": inform[0].value,
        "tel": inform[1].value,
        "avator": inform[4].src,
        "email": inform[2].value,
        "satoken": userData.data.tokenValue
    };
    if (num === inform.length) {
        console.log(data);
        ajax("POST", "userInfo?satoken=" + tokenValue, data, 1, function() {
            alert(ret.data);
            console.log('修改我的信息', ret);
        })
    } else {
        console.log(num);
        alert('你还有' + (inform.length - num) + '个信息未填写，请把信息填写完整');
    }
})

//获取input
var input = document.getElementById("uploadfile");
var subImg = document.getElementById('subImg');
// 当用户上传时触发事件
input.addEventListener('change', function() {
    readFile(this);
});
//处理图片并添加都dom中的函数
var readFile = function(obj) {
    // 获取input里面的文件组
    var fileList = obj.files;

    for (var i = 0; i < fileList.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(fileList[i]);
        // 当文件读取成功时执行的函数
        reader.onload = function() {
            console.log(fileList[0]);
            upImg(fileList, function() {
                subImg.children[1].children[0].src = '' + img + '';
            })
        }
    }
}


let changePwdSending = false;
var changePwd = document.querySelector('#changePwd');
var changePwdWin = document.querySelector('#changePwd_win');
var changePwdIs = changePwdWin.querySelectorAll('i');
//密码是否看见
for (var i = 0; i < changePwdIs.length; i++) {
    changePwdIs[i].close = true;
    changePwdIs[i].addEventListener('click', function() {
        if (this.close) {
            this.innerHTML = '&#xe8bf;';
            this.parentNode.children[0].type = "text";
            this.close = false;
        } else {
            this.innerHTML = '&#xe69e;';
            this.parentNode.children[0].type = "password";
            this.close = true;
        }
    })
}

//点击账号设置
changePwd.addEventListener('click', function() {
    changePwdWin.style.display = 'flex';
    body.className = 'bodyHidden';
    var inputs = changePwdWin.querySelectorAll('input');
    inputs[1].parentNode.children[2].innerHTML = '密码最长为16个字符';
    //判断两次密码是否输入一致
    inputs[2].addEventListener('change', function() {
        if (inputs[2].value != inputs[1].value) {
            this.parentNode.children[2].innerHTML = '两次密码输入不一样!';
            this.parentNode.children[2].style.color = 'red';
        } else {
            this.parentNode.children[2].innerHTML = '两次密码输入一样';
            this.parentNode.children[2].style.color = 'green';
        }
    })

    //取消修改密码
    var btns = changePwdWin.querySelectorAll('button');
    btns[0].addEventListener('click', function() {
        changePwdWin.style.display = 'none';
        body.className = '';
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].parentNode.children[2].innerHTML = '';
            inputs[i].parentNode.children[2].style.color = '';
        }
        closeAll();
    })

    //确认修改密码
    btns[1].addEventListener('click', function() {
        if (changePwdSending == false) {
            if (inputs[2].value == inputs[1].value && (inputs[0].value == userDataPassword || inputs[0].value == '忘记密码')) {

                changePwdSending = true;
                inputs[0].parentNode.children[2].innerHTML = '旧密码输入正确';
                inputs[0].parentNode.children[2].style.color = 'green';

                ajax("POST", "user/updatePwd?pwd=" + inputs[2].value + "&satoken=" + tokenValue, 0, 0,
                    function() {
                        console.log('修改我的信息', ret);
                        alert(ret.data);
                        if (ret.data == '修改成功') {
                            userDataPassword = inputs[2].value;
                            localStorage.setItem('userDataPassword', inputs[2].value);
                        }
                        changePwdWin.style.display = 'none';
                        body.className = '';
                        changePwdSending = false;
                        for (var i = 0; i < inputs.length; i++) {
                            inputs[i].parentNode.children[2].innerHTML = '';
                            inputs[i].parentNode.children[2].style.color = '';
                        }
                        closeAll();
                    })
            } else if (inputs[0].value != userDataPassword) {
                inputs[0].parentNode.children[2].innerHTML = '旧密码输入错误，请重新输入';
                inputs[0].parentNode.children[2].style.color = 'red';
            }
        }
    })
})

//清除修改密码部分的所有内容
function closeAll() {
    for (var i = 0; i < changePwdIs.length; i++) {
        changePwdIs[i].innerHTML = '&#xe69e;';
        changePwdIs[i].parentNode.children[0].type = "password";
        changePwdIs[i].parentNode.children[0].value = "";
        changePwdIs[i].close = true;
    }
}