var submitUser = document.querySelector('#submitUser');

submitUser.addEventListener('click', function() {

    var inform = document.querySelector('#infor_right').querySelectorAll('.inform');
    var num = 0;
    for (var i = 0; i < inform.length; i++) {
        if (inform[i].value || inform[i].src) {
            num++;
        }
    }
    var data = {
        "intro": inform[3].value,
        "nickname": inform[0].value,
        "tel": inform[1].value,
        "avator": inform[4].src,
        "email": inform[2].value,
        "satoken": userData.data.tokenValue
    };
    if (num === inform.length) {
        console.log(data);
        ajax("POST", "userInfo?satoken=" + userData.data.tokenValue, data, 1, function() {

            alert(ret.data);
        })
    } else {
        console.log(num);
        alert('你还有' + (inform.length - num) + '个信息未填写，请把信息填写完整');
    }
})
var input = document.getElementById("uploadfile"); //获取input
var subImg = document.getElementById('subImg');
// 当用户上传时触发事件
input.addEventListener('change', function() {
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
            var data = 12;
            console.log(fileList[0]);
            upImg(fileList, function() {
                subImg.children[1].children[0].src = '' + img + '';
            })

        }
    }
}