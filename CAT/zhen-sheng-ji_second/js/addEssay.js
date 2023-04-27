window.addEventListener('load', function() {

    let addEssay = null;
    //
    console.log(11);
    addEssay = this.document.querySelector('#addEssay');
    addEssay.style.height = document.documentElement.clientHeight + 'px';

    var timer = null;
    window.addEventListener('resize', function() {
        if (timer) {
            this.clearTimeout(timer);
            console.log(1);
        }
        timer = setInterval(function() {
            addEssay.style.height = document.documentElement.clientHeight + 'px';
        }, 300)
    });



})