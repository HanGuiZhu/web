$(function() {
    var layer = layui.layer;
    var form = layui.form;
    getArticleCategoryList();

    function getArticleCategoryList() {
        $.ajax({
            url: '/my/article/cates',
            method: '',
            data: '',
            success: function(res) {
                var htmlStr = template('tpl_table', res)
                $('tbody').html(htmlStr);
            }
        })
    }
    var addCate = null;
    $("#addCate").on('click', function(e) {
        addCate = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章类别',
            content: $("#add_cate_form").html()
        })
    })

    $('body').on('submit', '#add_cate', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/addcates',
            method: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增失败');
                }
                getArticleCategoryList();
                layer.msg('新增成功');
                layer.close(addCate);
            }
        })
    });
    var editCate = null;
    $('tbody').on('click', '.edit-cate', function(e) {
        e.preventDefault();
        editCate = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章类别',
            content: $("#edit_cate_form").html()
        })
        var id = $(this).attr('data-id');
        $.ajax({
            url: '/my/article/cates/' + id,
            method: 'get',
            success: function(res) {
                form.val('edit_form', res.data)
            }
        })
    })

    $('body').on('submit', '#edit_form', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/updatecate',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('编辑失败');
                }
                getArticleCategoryList();
                layer.msg('编辑成功');
                layer.close(editCate);
            }
        })
    })

    $('tbody').on('click', '.btn-delete', function(e) {
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                url: '/my/article/deletecate/' + id,
                method: 'get',
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败');
                    }
                    getArticleCategoryList();
                    layer.msg('删除成功');

                    layer.close(index);
                }
            })

        });

    })
})