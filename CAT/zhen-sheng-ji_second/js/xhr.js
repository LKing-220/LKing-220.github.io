let ret = null;

function ajax(pg, str, data, contentType, callback) {

    //标识变量
    let isSending = false; //是否正在发送AJAX请求

    //判断标识变量
    if (isSending) {
        mainXhrEssay.abort(); //如果正在发送，则取消该请求创建新的请求
    }

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
            isSending = false;
            if (xhr.status / 100 === 2) {
                ret = xhr.response;
                callback && callback();
            } else {
                alert('error');
            }
        }
    });
}