$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.lenght < 6) {
                return '昵称必须在6个字符之间';
            }
        }

    })

    getInitUserInfo();

    // 获取用户基本信息
    function getInitUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: "GET",
            data: '',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                }
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置信息
    $('#reset_btn').on('click', function(e) {
        e.preventDefault();
        getInitUserInfo();
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息更新失败');
                }
                layer.msg('用户信息更新成功');
                // 调用父类的api
                window.parent.getuserInfo();
            }
        })
    })
})