window.onload = function() {
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
            reader.onload = function(e) {
                subImg.children[1].children[0].src = '' + this.result + '';
            }
        }
    }
}