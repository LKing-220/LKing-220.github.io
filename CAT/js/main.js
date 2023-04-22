let mainEssays = null;
let mainXhrEssayEssay = null;
let main = null;

function mainFn() {
    mainEssays = document.querySelector('#main_middleEssays');

    mainXhrEssay = new XMLHttpRequest();
    mainXhrEssay.responseType = 'json';

    function mainContent() {
        //标识变量
        let isSending = false; //是否正在发送AJAX请求

        //判断标识变量
        if (isSending) {
            mainXhrEssay.abort(); //如果正在发送，则取消该请求创建新的请求
        }

        //修改  标识变量的值
        isSending = true;

        mainXhrEssay.open("GET", "http://106.52.239.206:8081/article/list/page?page=1&pageSize=10");
        mainXhrEssay.send();

        mainXhrEssay.onreadystatechange = function() {
            if (mainXhrEssay.readyState === 4) {
                let datas = mainXhrEssay.response.data.records;
                isSending = false;
                if (mainXhrEssay.status / 100 === 2) {
                    for (var i = 0; i < datas.length; i++) {
                        console.log(datas[i]);
                        var div = document.createElement('div');
                        div.className = 'main_essay';
                        if (datas[i].img == null) {
                            datas[i].img = 'https://dummyimage.com/400x400';
                        }
                        div.index = datas[i].id;
                        div.innerHTML = '<a href="javascript:;"><img src="' + datas[i].img + '" alt="" class="main_essayImg"><span class="main_writer">' + datas[i].userDto.nickname + '</span><span class="main_timer">' + datas[i].createTime + '</span><h4>' + datas[i].title + '</h4><p>' + datas[i].summary + '</p></a><ul><li>&#xe8bf;' + datas[i].viewed + '</li><li>&#xe61b;' + datas[i].liked + '</li><li>&#xe618;' + datas[i].shared + '</li></ul>';
                        mainEssays.appendChild(div);
                    }
                } else {}
            }
        }
    }
    mainContent();
}