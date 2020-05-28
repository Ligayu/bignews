$(function () {
    // 1. 发送ajax请求获取文章所有的分类 
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        headers: {
            "Authorization": localStorage.getItem('token')
        },
        success: function (res) {
            // console.log(res);
            var htmlStr = template('categoryList', res)
            $('#selCategory').html(htmlStr)
        }
    })
    //将获取的数据渲染到页面上
    function getParams(page, callback) {
        $.ajax({
            url: BigNew.article_query,
            type: 'get',
            data: {
                key: null,
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: page,
                perpage: 2
            },
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    var htmlStr = template('articleList', res.data)
                    $('tbody').html(htmlStr)

                    if (res.data.totalPage != 0 && res.data.data.length == 0) {
                        currentPage -= 1;
                        $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, currentPage)
                    } else if (res.data.totalPage != 0 && callback != null) {
                        $('#pagination-demo').show();
                        callback(res.data.totalPage);
                    }
                }
            }
        })
    }

    getParams(1, pagination);

    var currentPage = 1
    //分页功能
    function pagination(totalPage) {
        $('#pagination-demo').twbsPagination({
            totalPages: totalPage,
            visiblePages: 7,
            first: '首页',
            prev: "上一页",
            next: '下一页',
            last: '尾页',
            loop: 'true',
            initiateStartPageClick: false, // 不要默认点击
            onPageClick: function (event, page) {
                //点击下一页时才会执行
                currentPage = page;
                getParams(currentPage, pagination);
            }
        })
    }



    //根据条件筛选
    $('#btnSearch').on('click', function (e) {
        e.preventDefault()
        $.ajax({
            url: BigNew.article_query,
            type: 'get',
            data: {
                key: null,
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: 1,
                perpage: 7
            },
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    var htmlStr = template('articleList', res.data);
                    $('.table tbody').html(htmlStr);
                    $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
                }
            }
        })
    })

    //删除功能
    var articleId
    $('#myModal').on('show.bs.modal', function (e) {
        console.log(e.relatedTarget);
        articleId = $(e.relatedTarget).data('id')
    })

    $('#myModal .btn-dele').on('click', function () {
        console.log(123);

        // 5.3 发送ajax请求 
        $.ajax({
            type: 'post',
            url: BigNew.article_delete,
            data: {
                id: articleId
            },
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            success: function (res) {
                // 5.4 请求成功后要隐藏模态框 
                $('#myModal').modal('hide')
                // 5.5 刷新当前页面
                // getDataByParams(currentPage, null)
                getParams(currentPage, null);
            }
        })
    })

    $('#release_btn').on('click', function () {
        parent.$('.level02 li:eq(1)').addClass('active').siblings().removeClass('active');
    })
});