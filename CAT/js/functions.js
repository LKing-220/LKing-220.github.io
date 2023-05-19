//获取元素函数
let body = document.querySelector('body');
let load = document.querySelector('#load');
let essay = document.querySelector('#essay');
let nav = document.querySelector('nav');
let addEssay = document.querySelector('#addEssay');
let search = document.querySelector('#search');
let mainEssays = document.querySelector('#main_middleEssays');
let main = document.querySelector('main');
let userinfor = document.querySelector('#userinfor');
let modifyinfor = document.querySelector('#modify_infor');
let userinforMy = document.querySelector('#userinfor_my');
let loadSuccessful = null;
let ID = null;
let essayID = null;
let isFollow = 1;

//封装ajax
let ret = null;

function ajax(pg, url, data, contentType, callback) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.responseType = 'json';
    xhr.open(pg, "http://106.52.239.206:8081/" + url);
    if (contentType) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            if (xhr.status / 100 === 2) {
                ret = xhr.response; //ret储存返回的数据
                callback && callback(); //回调函数
            } else {
                alert('error');
            }
        }
    });
}

//上传图片函数
let img = null;

function upImg(fileList, callback) {
    var data = new FormData();
    data.append("file", fileList[0], "a.png");
    data.append("satoken", userData.data.tokenValue)
    var xhrr = new XMLHttpRequest();
    xhrr.withCredentials = true;
    xhrr.responseType = 'json';
    xhrr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            if (xhrr.status / 100 === 2) {
                img = this.response.data;
                callback && callback();
            } else {
                alert('error');
            }
        }
    });
    console.log('上传图片');
    xhrr.open("POST", "http://106.52.239.206:8081/img/upload");
    xhrr.send(data);
}

//清除页面函数
function none() {
    main.style.display = 'none';
    essay.style.display = 'none';
    modifyinfor.style.display = 'none';
    userinfor.style.display = 'none';
    addEssay.style.display = 'none';
    userinforMy.style.display = 'none';
    search.style.display = 'none';
}



//判断一个字符串是否是图片
function checkURL(URL) {
    var str = URL;
    //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
    //下面的代码中应用了转义字符"\"输出一个字符"/"
    var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    var objExp = new RegExp(Expression);
    if (objExp.test(str) == true) {
        return true;
    } else {
        return false;
    }
}


//判断是否关注了该用户
function followJudge(obj) {
    console.log(followID);
    ajax("GET", "follow/or/not?id=" + followID + "&satoken=" + tokenValue, 0, 0,
        function() {
            console.log('判断是否关注了该用户', ret);
            if (ret.data) {
                isFollow = 0;
                obj.innerHTML = '已关注';
                obj.style.backgroundColor = '#cdcdcd';
            } else {
                isFollow = 1;
                obj.innerHTML = '关注';
                obj.style.backgroundColor = '';
            }
        })
};


//判断是否在进行关注操作
let followSending = false;
let followID = null;
//关注操作
let followBtns = document.querySelectorAll('.follow');
for (var i = 0; i < followBtns.length; i++) {
    followBtns[i].index = i;
    followBtns[i].addEventListener('click', function() {
        console.log(followID);
        if (ID == userDatas.userId) {} else {
            var obj = this;
            if (followSending == false) {
                followSending = true;
                ajax("POST", "follow?id=" + followID + "&isFollow=" + isFollow + "&satoken=" + tokenValue, 0, 0,
                    function() {
                        console.log('关注操作', ret);
                        if (isFollow && ret.data == '关注成功') {
                            isFollow = 0;
                            obj.innerHTML = '已关注';
                            obj.style.backgroundColor = '#cdcdcd';
                        } else {
                            isFollow = 1;
                            obj.innerHTML = '关注';
                            obj.style.backgroundColor = '';
                        }
                        followSending = false;
                    })
            }
        }
    })
}