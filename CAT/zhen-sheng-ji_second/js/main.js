window.addEventListener('load', function() {
    const mainEssays = document.querySelector('#main_middleEssays');

    function mainContent() {
        let xhr = null;
        //标识变量
        let isSending = false; //是否正在发送AJAX请求

        //判断标识变量
        if (isSending) {
            xhr.abort(); //如果正在发送，则取消该请求创建新的请求
        }

        xhr = new XMLHttpRequest();
        //修改  标识变量的值
        isSending = true;
        let dtats = null;
        xhr.responseType = 'json';
        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                datas = xhr.response.data.records;
            }
        });
        xhr.open("GET", "http://106.52.239.206:8081/article/list/page?page=1&pageSize=10");
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                isSending = false;
                if (xhr.status / 100 === 2) {
                    for (var i = 0; i < datas.length; i++) {
                        console.log(datas[i]);
                        var div = document.createElement('div');
                        div.className = 'main_essay';
                        if (datas[i].img == null) {
                            console.log(1);
                            datas[i].img = 'https://dummyimage.com/400x400';
                            console.log(datas[i].img);
                        }
                        div.innerHTML = '<a href="javascript:;"><img src="' + datas[i].img + '" alt="" class="main_essayImg"><span class="main_writer">' + datas[i].userDto.nickname + '</span><span class="main_timer">' + datas[i].createTime + '</span><h4>' + datas[i].title + '</h4><p>' + datas[i].summary + '</p></a><ul><li>&#xe8bf;' + datas[i].viewed + '</li><li>&#xe61b;' + datas[i].liked + '</li><li>&#xe618;' + datas[i].shared + '</li></ul>';
                        mainEssays.appendChild(div);
                    }
                } else {}
            }
        }
    }
    mainContent();
})