$(function () {

    // 1. 一跳转到这个页面，就要向服务器发送请求，获取评论的数据 
    // 1.1 发送ajax请求
    getDataByParams(1, function (res) {
        // 启用分页功能
        pagination(res)
    })


    // 2. 封装了一个分页的插件
    var currentPage = 1//这样其他函数也能使用
    function pagination(res) {
        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage,
            visiblePages: 7,
            first: '首页',
            last: '尾页',
            next: '下一页',
            prev: '上一页',
            loop: 'true',
            onPageClick: function (event, page) {
                currentPage = page

                // 根据当前页码获取对应的数据渲染到页面当中
                getDataByParams(page, null)
            }
        })
    }


    // 3. 封装了一个根据当前页码获取数据的函数
    function getDataByParams(myPage, callback) {
        $.ajax({
            type: 'get',
            url: BigNew.comment_list,
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            data: {
                page: myPage,
                perpage: 7
            },
            success: function (res) {
                // console.log(res)
                // 1.2 将数据渲染到页面当中
                if (res.code == 200) {
                    var htmlStr = template('commentList', res.data)
                    $('tbody').html(htmlStr)

                    // 1.4 应该根据服务器端响应回来的数据，来确定是否启用分页
                    if (res.data.totalPage != 0 && callback != null) {
                        $('#pagination-demo').show().next().hide()
                        callback(res) // 启用分页
                    } else if (res.data.totalPage == 0 && myPage == 1) {
                        //  如果第1页都没有数据,则分页控件隐藏 p标签显示
                        $('#pagination-demo').hide().next().show()
                    } else if (res.data.totalPage != 0 && res.data.data.length == 0) {
                        // 就说明当前那一页已经没有数据了，应该要显示前一页
                        currentPage -= 1
                        // 更新分页控件
                        $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, currentPage)
                    }

                }
            }
        })
    }

    //删除功能
    $('tbody').on('click', '.btn-dele', function () {
        $.ajax({
            url: BigNew.comment_delete,
            type: 'post',
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            data: {
                id: $(this).data('id')
            },
            success: function (res) {
                if (res.code == 200) {
                    // console.log(this);
                    // 更新当前页码中的页面数据
                    console.log(currentPage);

                    getDataByParams(currentPage, null)
                }
            }
        })
    })
})