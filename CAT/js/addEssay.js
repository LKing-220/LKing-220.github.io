window.addEventListener('load', function() {

    addEssay.style.height = document.documentElement.clientHeight + 'px';

    var timer = null;
    window.addEventListener('resize', function() {
        if (timer) {
            this.clearTimeout(timer);
        }
        timer = setInterval(function() {
            addEssay.style.height = document.documentElement.clientHeight + 'px';
        }, 300)
        fn();
    });
    fn();

    function fn() {
        if (document.documentElement.clientWidth < 730 && document.documentElement.clientHeight < 712) {
            addEssay.querySelector('#addessay_head').style.overflow = 'hidden';
        } else {
            addEssay.querySelector('#addessay_head').style.overflow = '';
        }
    }
    var lis = addEssay.querySelector('.user').querySelectorAll('li');
    for (var i = 0; i < lis.length; i++)
        lis[i].addEventListener('click', function() {
            none();
            nav.style.display = 'block';
            userinfor.style.display = 'block';
        })


    var openPublish = this.document.querySelector('.publish');
    var publish = this.document.querySelector('#publish');
    openPublish.addEventListener('click', function() {
        publish.style.display = 'block';
    })
    publish.addEventListener('click', function() {
        publish.style.display = 'block';
    }, true)
    this.document.addEventListener('click', function() {
        publish.style.display = 'none';
    }, true)
    var btns = this.document.querySelector('#publish_sure').querySelectorAll('button');
    btns[0].addEventListener('click', function() {
        publish.style.display = 'none';
    })
    btns[1].addEventListener('click', function() {
        success();
    })

    var addEssaySuccessful = document.querySelector('#addEssaySuccessful');

    function success() {
        if (userData.code == 1) {
            console.log('发布成功');
            addEssaySuccessful.style.display = 'block';
            setTimeout(function() {
                addEssaySuccessful.style.display = 'none';
                none();
                main.style.display = 'block';
                nav.style.display = 'block';
            }, 400)
        }
    }
})