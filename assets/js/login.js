$(function() {
    $('#login_btn').click(function() {
        $('.login-inner').show();
        $('.register-inner').hide();
    });

    $('#register_btn').click(function() {
        $('.login-inner').hide();
        $('.register-inner').show();
    });

    // 获取layui对象
    var form = layui.form;
    // 通过form。verify 定义自定义规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.register-inner [name=password]').val();
            if (value != pwd) {
                return '两次输入密码不一致'
            }
        }
    })

    // 定义请求路径
    const commonApi = "http://api-breakingnews-web.itheima.net";
    // Layer 对象
    const layer = layui.layer;
    // 注册
    $("#register_form").on('submit', function(e) {
        e.preventDefault();
        var username = $("#register_form [name=username]").val();
        var pwd = $("#register_form [name=password]").val();
        $.ajax({
            url: '/api/reguser',
            data: { username: username, password: pwd },
            type: 'post',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功', function() {
                    $("#login_btn").click();
                    // 清空注册表单
                    $("#register_form [name=username]").val('');
                    $("#register_form [name=password]").val('');
                    $("#register_form [name=repassword]").val('');
                });

            }
        })

    })

    // 登录
    $("#login_form").on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            data: $(this).serialize(),
            method: 'post',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                window.location.href = '/index.html'
            }
        })
    })
});