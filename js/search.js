let navSearch = document.querySelector('.nav_search');
let sub = document.querySelector('#search_userBosy');
let seb = document.querySelector('#search_essayBody');
let searchSending = false;
navSearch.children[1].addEventListener('click', function() {
    if (search.style.display != 'block') {
        none();
        search.style.display = 'block';
    }
    sub.innerHTML = '';
    seb.innerHTML = '<div id="search_essayNav"><span class="blue">综合排序</span><span>最新优先</span><span>最热优先</span></div>'
    if (searchSending == false) {
        searchSending = true;
        ajax("GET", "search/user/list/page?key=" + navSearch.children[0].value + "&page=1&pageSize=20", 0, 0,
            function() {
                console.log('搜索用户');
                var data = ret.data.records;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].avator == null) {
                        data[i].avator = 'https://dummyimage.com/400x400';
                    }
                    var div = document.createElement('div');
                    div.index = data[i].userId;
                    div.className = 'search_user';
                    div.innerHTML = '<img src="' + data[i].avator + '" alt="" class="search_userImg"><h3 class="search_userName">' + data[i].nickname + '</h3><p class="search_userFollow">' + data[i].follows + '个关注者</p>'
                    sub.appendChild(div);
                    div.addEventListener('click', function() { otherIfu(this.index) })
                }
                searchSending = false;
            })
        ajax("GET", "search/article/list/page?key=" + navSearch.children[0].value + "&page=1&pageSize=20", 0, 0,
            function() {
                console.log('搜索文章');
                var data = ret.data.records;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].img == null) {
                        data[i].img = 'https://dummyimage.com/400x400';
                    }
                    var div = document.createElement('div');
                    div.index = data[i].id;
                    div.className = 'search_essay';
                    div.innerHTML = '<div><img src="' + data[i].img + '" alt="" class="search_essayImg"><span class="search_writer">' + data[i].userDto.nickname + '</span><span class="search_timer">' + data[i].createTime + '</span><h4>' + data[i].title + '</h4><p>' + data[i].summary + '</p></div><ul><li>&#xe61c;' + data[i].liked + '</li><li>&#xe618;' + data[i].shared + '</li></ul>'
                    seb.appendChild(div);
                    div.addEventListener('click', function() {
                        if (userIsLogin == false) {
                            console.log('未登录');
                            loadFn();
                        } else {
                            essayCF(this.index);
                        }
                    })
                }
                searchSending = false;
            })
    }
})
let searchNav = document.querySelector('#search_nav').querySelectorAll('span');

searchNav[0].addEventListener('click', function() {
    searchNav[1].className = '';
    searchNav[4].className = '';
    this.className = 'blue';
    seb.style.display = 'block';
    sub.style.display = 'none'
})

searchNav[1].addEventListener('click', function() {
    searchNav[0].className = '';
    searchNav[4].className = '';
    this.className = 'blue';
    seb.style.display = 'block';
    sub.style.display = 'none'
})

searchNav[4].addEventListener('click', function() {
    this.className = 'blue';
    searchNav[0].className = '';
    searchNav[1].className = '';
    seb.style.display = 'none';
    sub.style.display = 'block'
})