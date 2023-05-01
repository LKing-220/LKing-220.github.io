window.addEventListener('load', function() {

    addEssay.style.height = document.documentElement.clientHeight + 'px';

    var addEHtimer = null;
    //设置文本域的高度
    window.addEventListener('resize', function() {
        if (addEHtimer) {
            this.clearTimeout(addEHtimer);
        }
        addEHtimer = setInterval(function() {
            addEssay.style.height = document.documentElement.clientHeight + 'px';
        }, 300)
        addEHeader();
    });

    //调节页面的导航栏的变化效果
    function addEHeader() {
        if (document.documentElement.clientWidth < 730 && document.documentElement.clientHeight < 712) {
            addEssay.querySelector('#addessay_head').style.overflow = 'hidden';
        } else {
            addEssay.querySelector('#addessay_head').style.overflow = '';
        }
    }



    //发布表单
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

    //获取发布文章必需元素
    var addInputs = addEssay.querySelectorAll('.addInput');
    var addBtns = addEssay.querySelector('.addBtns').querySelectorAll('button');
    var addBtnum = null;
    for (var i = 0; i < addBtns.length; i++) {
        addBtns[i].index = i;
        addBtns[i].addEventListener('click', function() {
            if (addBtnum != null) {
                addBtns[addBtnum].style.backgroundColor = '';
                addBtns[addBtnum].style.color = '';
            }
            this.style.backgroundColor = '#4896fd';
            this.style.color = '#fff';
            addBtnum = this.index;
        })
    }

    var publishinput = document.getElementById("publishfile");
    //获取input
    var publishImg = document.getElementById('publishImg');
    // 当用户上传时触发事件
    publishinput.addEventListener('change', function() {
        readFile(this);
    });
    //处理图片并添加都dom中的函数
    var readFile = function(obj) {
        // 获取input里面的文件组
        var fileList = obj.files;

        for (var i = 0; i < fileList.length; i++) {
            var reader = new FileReader();
            reader.readAsDataURL(fileList[i]);
            // 当文件读取成功时执行的函数
            reader.onload = function() {
                console.log(fileList[0]);
                upImg(fileList, function() {
                    publishImg.src = '' + img + '';
                })
            }
        }
    }

    // 发布键
    btns[1].addEventListener('click', function() {

        var num = 0;
        for (var i = 0; i < addInputs.length; i++) {
            if (addInputs[i].value || (addInputs[i].src != 'https://dummyimage.com/130x73' && addInputs[i].src)) {
                num++;
            }
        }
        var data = {
            "content": addInputs[1].value,
            "summary": addInputs[3].value,
            "title": addInputs[0].value,
            "typeId": addBtnum + 1,
            "img": addInputs[2].src
        };
        if (num == 4 && addBtnum != null) {
            ajax("POST", "/article?satoken=" + tokenValue, data, 1, function() {
                console.log(ret);
                success();
            })
        } else if (addInputs[2].src == 'https://dummyimage.com/130x73') {
            alert('请上传文章封面');
        } else if (num < 4) {
            alert('请将必填项填满');
        } else {
            alert('选择类型');
        }

    })




    var addEssaySuccessful = document.querySelector('#addEssaySuccessful');

    //发布成功后进行的操作
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