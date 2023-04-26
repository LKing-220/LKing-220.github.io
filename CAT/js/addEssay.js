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
            userinfo.style.display = 'block';
        })
})