// 返回顶部的js代码
var arrive = document.querySelector('.arrive');
//获取返回按钮
document.addEventListener('scroll', function() {
    if (window.pageYOffset > 500) {
        // 当下滑到500像素时返回按钮出现
        arrive.style.display = 'block';
        arrive.children[0].innerHTML = '<img src="img/arrive.png" title="返回顶部" width="50px">';
    } else {
        // 当下滑小于500像素时返回按钮消失
        arrive.style.display = 'none';
        arrive.children[0].innerHTML = 'top';
    }
})
arrive.children[0].addEventListener('click', function() {
    // 第一次点击返回按钮时调用返回顶部函数
    animation(window, 0), true;
});

function animation(obj, target) {
    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(window.animate);
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        if (window.pageYOffset == target) {
            // 停止动画 本质是停止定时器
            clearInterval(obj.timer);
        }
        document.addEventListener('click', function() {
            // 如果点击返回按钮以为的地方则暂停返回
            clearInterval(obj.timer);
        }, true);
        arrive.addEventListener('click', function() {
            animation(window, 0);
            //如果再次点的返回按钮则继续返回顶部
        }, true);
        window.scroll(0, window.pageYOffset - 5)
            // 每 1 毫秒返回顶部的速率为 5 像素
    }, 1);
}