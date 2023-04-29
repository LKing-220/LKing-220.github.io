//封装ajax
let ret = null;

function ajax(pg, str, data, contentType, callback) {


    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.responseType = 'json';
    if (pg == "POST") {
        xhr.open("POST", "http://106.52.239.206:8081/" + str);
    } else if (pg == "GET") {
        xhr.open("GET", "http://106.52.239.206:8081/" + str)
    }
    if (contentType) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else {

        xhr.send();
    }

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            if (xhr.status / 100 === 2) {
                ret = xhr.response;
                callback && callback();
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

//获取元素函数
function acquire() {

    userinfor = document.querySelector('#userinfor');
    modifyinfor = document.querySelector('#modify_infor');

    nav = document.querySelector('nav');

    mainEssays = document.querySelector('#main_middleEssays');
    main = document.querySelector('main');
    essay = document.querySelector('#essay');

    addEssay = document.querySelector('#addEssay');
    userinforMy = document.querySelector('#userinfor_my');
    search = document.querySelector('#search');

}


//判断是否关注了该用户
function followJudge(id, obj) {
    ajax("GET", "follow/or/not?id=" + id + "&satoken=" + tokenValue, 0, 0,
        function() {
            console.log(id);
            console.log(ret);
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