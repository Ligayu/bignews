$(function () {

    console.log(window.location.search);
    var str = window.location.search;
    var articleId = utils.convertToObj(str.slice(1)).id;

    //富文本插件
    var E = window.wangEditor
    var editor = new E('#editor')
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create()



    //获取文章信息
    $.ajax({
        url: BigNew.article_search,
        type: 'get',
        headers: {
            "Authorization": localStorage.getItem('token')
        },
        data: {
            id: articleId
        },
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                $('#form input[name=id]').val(res.data.id)
                $('#inputTitle').val(res.data.title);
                $('.article_cover').attr('src', res.data.cover);
                //这里要在html页面上的类别模板的option中添加seleted属性才可把对应的类别渲染
                // $('#form select[name=categoryId]').val(res.data.categoryId)
                editor.txt.html(res.data.content)
                $('#testico').val(res.data.date);

                var categoryId = res.data.categoryId;
                //发送ajax请求获取文章所有的分类 
                $.ajax({
                    type: 'get',
                    url: BigNew.category_list,
                    headers: {
                        "Authorization": localStorage.getItem('token')
                    },
                    success: function (res) {
                        // console.log(res);
                        if (res.code == 200) {
                            res.categoryId = categoryId;//给查询回来的信息添加一个键值对
                            var htmlStr = template('categoryList', res)
                            $('#selCategory').html(htmlStr)
                        }

                    }
                })
            }

        }
    })

    //日期插件
    jeDate("#testico", {
        format: "YYYY-MM-DD",
        isTime: false,
        zIndex: 20999,  //修改日期插件的弹出层级
        isToday: true, // 是否显示本月或今天
        minDate: "2014-09-19 00:00:00"
    })

    //生成图片预览
    $('#inputCover').on('change', function () {
        var file = this.files[0];
        var addStr = URL.createObjectURL(file);
        $('.article_cover').attr('src', addStr);
    })


    //点击修改时，使文章状态变成已发布
    $('#form').on('click', '.btn', function (e) {
        e.preventDefault();
        var formData = new FormData($('#form')[0]);
        formData.append('content', editor.txt.html());
        // console.log(formData);
        if ($(e.target).hasClass('btn-edit'))
            formData.append('state', '已发布');
        else
            formData.append('state', '草稿');
        $.ajax({
            url: BigNew.article_edit,
            type: 'post',
            data: formData,
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.code == 200) {
                    window.history.back();
                }
            }
        })

    })
})