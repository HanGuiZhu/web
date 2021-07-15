$(function() {
    getuserInfo();
    var layer = layui.layer;
    $(".login-out").on('click', function() {
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token');

            location.href = '/login.html'
            layer.close(index);
        });
        //eg2
    })
})

/**
 * 获取用户信息
 */
function getuserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }

            assignAvatar(res.data);
            console.log(res);
        }
    })
}

function assignAvatar(userinfo) {
    var username = userinfo.nickname ? userinfo.nickname : userinfo.username
    $('.welcome').html('欢迎&nbsp;&nbsp;' + username);

    if (userinfo.user_pic !== null) {
        $('.userinfo img').attr('src', userinfo.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.userinfo img').hide();
        var first = username[0].toUpperCase();
        $('.text-avatar').html(first).show;
    }
}