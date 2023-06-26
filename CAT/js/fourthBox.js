// 获取li跟div标签
var lis = document.querySelector('.fourthBox').querySelectorAll('li');
var divs = document.querySelector('.fourthBox').querySelector('.w').querySelectorAll('div');
// 利用循环进行初始化
for (var j = 1; j < divs.length; j++) {
    divs[j].style.display = 'none';
    lis[j].className = '';
}
// 利用循环给lis添加触发效果
for (var i = 0; i < lis.length; i++) {
    //给每一个li都添加 index 属性 并且储存其的下标
    lis[i].index = i;
    lis[i].addEventListener('click', function() {
        //利用循环将之前其他的盒子的display样式先修改为none让所以div都消失
        for (var j = 0; j < divs.length; j++) {
            divs[j].style.display = 'none';
            lis[j].className = '';
        }
        //将下标与点击的li的下标一致的div盒子的display样式修改为block让其出现
        divs[this.index].style.display = 'block';
        this.className = 'liBlue';
    })
}
// use strict

for (var i = 0; i < 5; i++) {
    console.log(i);
}