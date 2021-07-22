$(function() {
    var layer = layui.layer;
    var form = layui.form;
    template.defaults.imports.dateFormate = function(date) {
        const dt = new Date(date);

        const y = dt.getFullYear();

        const m = padZero(dt.getMonth() + 1);

        const d = padZero(dt.getDate());

        const hh = padZero(dt.getHours());

        const mm = padZero(dt.getMinutes());

        const ss = padZero(dt.getSeconds());

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    function padZero(n) {
        return n > 10 ? n : '0' + n;
    }
    var query = {
        pagenum: 1,
        pagesize: 1,
        cate_id: '',
        state: ''
    }
    initArticleList();
    initCate();

    function initArticleList() {
        $.ajax({
            url: '/my/article/list',
            method: 'GET',
            data: query,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取列表失败');
                }
                var htmlStr = template('article_list', res)
                $('tbody').html(htmlStr);
                renderPage(res.total);
            }
        })
    }

    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'get',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('初始化分类失败');
                }
                var htmlStr = template('article_cate', res);
                $('[name=cate_id]').html(htmlStr);
                form.render();

            }
        })
    }

    $("#activity_search").on('submit', function(e) {
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        query.cate_id = cate_id;
        query.state = state;
        initArticleList();
    })

    function renderPage(total) {
        layui.use('laypage', function() {
            var laypage = layui.laypage;

            //执行一个laypage实例
            laypage.render({
                elem: 'article_page' //注意，这里的 test1 是 ID，不用加 # 号
                    ,
                count: total, //数据总数，从服务端得到
                limit: query.pagesize,
                curr: query.pagenum,
                limits: [1, 2, 3, 4, 5],
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                jump: function(obj, first) {
                    //首次不执行
                    if (!first) {
                        //do something
                        query.pagenum = obj.curr;
                        query.pagesize = obj.limit;
                        initArticleList();
                    }
                }
            });
        });
    }

    $('body').on('click', '.btn-delete', function() {
        var len = $('.btn-delete').length;
        var id = $(this).attr('data-id');
        //eg1
        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: '/my/article/delete/' + id,
                method: 'get',
                success: function(res) {
                    if (res.status !== 0) {
                        layer.msg('删除失败');
                    }
                    layer.msg('删除成功');
                    if (len == 1) {
                        query.pagenum = query.pagenum == 1 ? 1 : query.pagenum - 1;
                    }
                    initArticleList();
                    layer.close(index);
                }
            });

        });

    });

});