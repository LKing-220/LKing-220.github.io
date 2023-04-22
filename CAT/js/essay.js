;
let essay = null;

function essayFn() {
    main = document.querySelector('main');
    essay = document.querySelector('#essay');
    essayContent = essay.querySelector('#essay_content');
    essayUser = essay.querySelector('#essay_user');
    essayLeft = essay.querySelector('#essay_left');
    mainXhrEssay.addEventListener("readystatechange", function() {
        for (var i = 0; i < mainEssays.children.length; i++) {
            mainEssays.children[i].addEventListener('click', function() {

                if (userDataPassword == null) {
                    console.log('未登录');
                    loadFn();
                } else {
                    fn(this.index);
                }
            })
        }
    });

    var essayXhrEssay = new XMLHttpRequest();

    function fn(num) {
        essayXhrEssay.withCredentials = true;
        essayXhrEssay.responseType = 'json';

        essayXhrEssay.open("GET", "http://106.52.239.206:8081/article/detail?id=" + num + "");

        essayXhrEssay.send();

        essayXhrEssay.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                isSending = false;

                var datas = essayXhrEssay.response.data;

                if (datas.img == null) {
                    datas.img = 'https://dummyimage.com/400x400';
                }

                if (mainXhrEssay.status / 100 === 2) {

                    essayContent.children[0].innerHTML = datas.title;
                    essayContent.children[3].innerHTML = datas.content;
                    essayContent.children[2].src = datas.img;
                    essayContent.children[1].children[1].innerHTML = datas.userDto.nickname;
                    essayContent.children[1].children[2].innerHTML = datas.updateTime;
                    essayContent.children[1].children[3].innerHTML = datas.viewed;
                    fu(datas.userDto.userId)
                } else {}
            }
        })
    }


    function fu(id) {

        var userXhr = new XMLHttpRequest();
        userXhr.withCredentials = true;
        userXhr.responseType = 'json';

        userXhr.open("GET", "http://106.52.239.206:8081/user/id?id=" + id + "");

        userXhr.send();

        userXhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                isSending = false;

                var datas = userXhr.response.data;
                console.log(datas);
                if (datas.img == null) {
                    datas.img = 'https://dummyimage.com/400x400';
                }

                if (mainXhrEssay.status / 100 === 2) {
                    essayContent.children[1].children[0].children[0].src = datas.img;
                    essayUser.querySelector('img').src = datas.img;
                    essayUser.children[1].innerHTML = datas.nickname;

                    main.style.display = 'none';
                    essay.style.display = 'block';
                } else {}
            }
        })
    }
}