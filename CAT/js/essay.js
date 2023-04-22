;
let essayCF = null;

function essayFn() {
    main = document.querySelector('main');
    essay = document.querySelector('#essay');
    essayContent = essay.querySelector('#essay_content');
    essayUser = essay.querySelector('#essay_user');
    essayLeft = essay.querySelector('#essay_left');


    essayCF = function(num) {

        ajax("GET", "article/detail?id=" + num + "", 0, 0, function() {
            console.log(ret);
            var datas = ret.data;
            if (datas.img == null) {
                datas.img = 'https://dummyimage.com/400x400';
            }
            essayContent.children[0].innerHTML = datas.title;
            essayContent.children[3].innerHTML = datas.content;
            essayContent.children[2].src = datas.img;
            essayContent.children[1].children[1].innerHTML = datas.userDto.nickname;
            essayContent.children[1].children[2].innerHTML = datas.updateTime;
            essayContent.children[1].children[3].innerHTML = datas.viewed;
            fu(datas.userDto.userId)
        });
    }


    function fu(id) {
        ajax("GET", "/user/id?id=" + id + "", 0, 0, function() {
            console.log(ret);

            var datas = ret.data;
            if (datas.img == null) {
                datas.img = 'https://dummyimage.com/400x400';
            }
            essayContent.children[1].children[0].children[0].src = datas.img;
            essayUser.querySelector('img').src = datas.img;
            essayUser.children[1].innerHTML = datas.nickname;

            main.style.display = 'none';
            essay.style.display = 'block';
        });

    }
}