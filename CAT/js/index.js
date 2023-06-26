// 获取第二个盒子的divs，然后利用循环给其添加背景图片
var secondBoxDivs = document.querySelector('.secondBox_main').querySelectorAll('div');
for (var i = 0; i < secondBoxDivs.length; i++) {
    if (i < 9)
        secondBoxDivs[i].style.backgroundImage = 'url(img/' + (i + 5) + '.webp)';
    else //因为有三个盒子是重复的所以这里要进行特殊处理一下
        secondBoxDivs[i].style.backgroundImage = 'url(img/' + (i - 4) + '.webp)';
}
//将一些数据储存在datas字符串数组里面
var datas = ['关于', '联系方式', '招贤纳士', '合作伙伴开发实验室', '网络隐私政策', '产品隐私政策', 'COOKIE 设置', '网站地图', '投资者', '使用条款',
    '回收', '官方商城', '电子邮件首选项', '沪ICP备12002604号-2', '电子邮件注册页面', ''
];
//获取底部的tbody标签
var footerTbody = document.querySelector('.footer').querySelector('tbody');
for (var i = 0; i < 4; i++) {
    //利用循环产生四个tr标签
    var tr = document.createElement('tr');
    footerTbody.appendChild(tr);
    for (var j = 0; j < 4; j++) {
        //利用循环产生4个td标签
        var td = document.createElement('td');
        //将字符串数组里面的字符串按照顺序赋值给td
        td.innerHTML = '<a href="javascript:;">' + datas[i * 4 + j] + '</a>';
        tr.appendChild(td);
    }
}


//获取navSecond的标签
var navSecond = document.querySelector('.navSecond');
var pro = navSecond.querySelector('.pro');
var p = 0;
//屏幕上下滑动时触发
document.addEventListener('scroll', function() {
    if (p > 500) {
        //屏幕下滑超过500px时才能触发以下效果
        pro.style.display = 'none';
        if (p > window.pageYOffset) {
            //当屏幕往顶部拉动时
            navSecond.parentNode.className = 'relative fixed iconfont';
            //添加fixed类
            clearInterval(window.animate);
            // 防止因为一直下滑而导致速度过快，因此下滑的时候都会停止计时器
            var i = -80;
            window.animate = setInterval(function() {
                if (i < 0) {
                    i++; //i进行自增运算
                    navSecond.parentNode.style.top = i + 'px';
                } else {
                    clearInterval(window.animate);
                    // 当i大于等于0的时候就停止
                }
                //每10毫秒下降5像素，产生延迟逐渐出现的效果
            }, 10)
        } else {
            //当屏幕往底部拉动时
            navSecond.parentNode.className = 'relative iconfont';
        }
    } else {
        navSecond.parentNode.className = 'relative iconfont';
        pro.style.display = 'block';
    }
    p = window.pageYOffset;
})