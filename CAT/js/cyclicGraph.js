//轮播图
//获取元素
var secondLis = document.querySelector('.secondBox').querySelectorAll('li');
var secondEms = document.querySelector('.secondBox').querySelectorAll('em');
var secondBox = document.querySelector('.secondBox').querySelector('.secondBox_main');
var secondNUm = 0;
var secondCount = 0;
// 利用循环给secondLis添加触发效果
for (var i = 0; i < secondLis.length; i++) {
    secondLis[i].index = i;
    secondLis[i].addEventListener('click', function() {
        //给每一个li都添加 index 属性 并且储存其的下标
        secondNUm = this.index;
        //保证secondCount与secondNUm成3：1的关系
        secondCount = 3 * secondNUm;
        //一次移动三个盒子
        secondBox.style.transform = 'translate(-' + (secondNUm * 908) + 'px)';
        for (var j = 0; j < 3; j++) {
            secondLis[j].className = '';
        }
        this.className = 'liBlack'; //使点击的那个li添加黑色的边框
    })
}
for (var i = 0; i < secondEms.length; i++) {
    //给每一个em都添加 index 属性 并且储存其的下标
    secondEms[i].index = i;
    secondEms[i].addEventListener('click', function() {
        if (this.index == 0) {
            secondCount++;
            //secondCount大于8的赋值为0，保证可以持续循环
            if (secondCount > 8) {
                secondCount = 0;
            }
        } else {
            secondCount--;
            //secondCount小于0的赋值为8，保证可以持续循环
            if (secondCount < 0) {
                secondCount = 8;
            }
        }
        //一次移动一个盒子
        secondBox.style.transform = 'translate(-' + (secondCount * 302.6) + 'px)';
        //保证secondCount与secondNUm成3：1的关系
        secondNUm = parseInt(secondCount / 3);
        //删除所有li的类
        for (var j = 0; j < 3; j++) {
            secondLis[j].className = '';
        }
        //对固定比例对应的li添加黑色的边框
        secondLis[secondNUm].className = 'liBlack';
    })
}