// 隐藏的盒子
//获取元素
var body = document.querySelector('body');
var block = document.querySelector('.block');
var hidden = document.querySelector('.hidden');
var hiddenLis = hidden.querySelectorAll('li');
var first = document.querySelector('.hiddenBox_first');
var second = document.querySelector('.hiddenBox_second');
var secondAs = second.querySelectorAll('a');
var arrive = document.querySelector('.arrive');
//点击block盒子时，隐藏的盒子出现
block.addEventListener('click', function() {
        hidden.style.display = 'block';
        body.style.overflowY = 'hidden';
        body.querySelector('main').className = 'bodyBg';
        arrive.style.display = 'none';
    })
    //点击hiddenLis[0]（X号）时，关闭隐藏的盒子
hiddenLis[0].addEventListener('click', function() {
        hidden.style.display = 'none';
        first.style.display = 'none';
        second.style.display = 'none';
        body.style.overflowY = 'auto';
        body.querySelector('main').className = '';
        arrive.style.display = 'block';
    })
    //鼠标到hiddenLis[1]（产品）上面时，hiddenBox_first盒子出现，hiddenBox_second消失
hiddenLis[1].addEventListener('mouseover', function() {
        first.style.display = 'block';
        second.style.display = 'none';
    })
    //鼠标到hiddenLis[2]（创新）上面时，hiddenBox_second盒子出现，hiddenBox_first消失
hiddenLis[2].addEventListener('mouseover', function() {
        first.style.display = 'none';
        second.style.display = 'block';
    })
    //鼠标到hiddenLis[2~6]（电子竞技  COMMUNITY 支持…）上面时，hiddenBox_second和hiddenBox_first消失
for (var i = 3; i < hiddenLis.length; i++) {
    hiddenLis[i].addEventListener('mousemove', function() {
        first.style.display = 'none';
        second.style.display = 'none';
    })
}
//鼠标移动到hiddenBox_second盒子的其中一个div上面时，其他div蒙上白色透明的背景，当前div解除白色透明背景
for (var i = 0; i < secondAs.length; i++) {
    secondAs[i].addEventListener('mouseover', function() {
        for (var j = 0; j < secondAs.length; j++) {
            secondAs[j].className = 'afterBg';
        }
        this.className = '';
    })
}
//当鼠标离开hiddenBox_second盒子时，所有div都解除白色透明背景
second.addEventListener('mouseout', function() {
    for (var j = 0; j < secondAs.length; j++) {
        secondAs[j].className = '';
    }
})