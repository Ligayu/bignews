$(function () {
    render();
    function render() {
        $.ajax({
            type: 'get',
            url: BigNew.category_list,
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            success: function (res) {
                if (res.code == 200) {
                    var htmlStr = template('categoryList', res);
                    $('.container-fluid tbody').html(htmlStr);
                }
            }
        });
    }


    //有id时更新，否则添加功能
    $('#xinzengfenlei').on('click', function () {
        $('.addModal').modal('show');
    })
    $('.addModal .btn-sure').on('click', function () {
        var categoryId = $('#myForm input[name=id]').val();
        $.ajax({
            url: categoryId ? BigNew.category_edit : BigNew.category_add,
            type: 'post',
            data: $('#myForm').serialize(),
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            success: function (res) {

                if (res.code == 201 || res.code == 200) {
                    $('.addModal').modal('hide');
                    render();
                }
            }
        })
    })


    //更新功能
    $('.common_con tbody').on('click', '.btn-edit', function () {
        $('.addModal').modal('show');
        $('.addModal h4').text('更新文章分类')
        console.log($(this).data('id'));
        // window.categoryId = $(this).data('id');
        $.ajax({
            url: BigNew.category_search,
            type: 'get',
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            data: {
                id: $(this).data('id')
            },
            success: function (res) {
                console.log(res);
                $('#myForm input[name=id]').val(res.data[0].id);
                $('#myForm input[name=name]').val(res.data[0].name);
                $('#myForm input[name=slug]').val(res.data[0].slug);
            }
        })
    })

})