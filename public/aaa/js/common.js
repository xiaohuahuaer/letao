
$(function() {

    // 进度条
    $(document).ajaxStart(function() {
        NProgress.start();
    })


    $(document).ajaxStop(function() {
        setTimeout(function() {
        NProgress.done();            
        },500)
    })

    // 侧边栏二级菜单切换
    $('#category').click(function() {
        $(this).next().stop().slideToggle();
    })


    // 侧边栏菜单切换
    $('.topbar .icon_left').click(function() {
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');
        $('.topbar').toggleClass('hidemenu');
    })


    // 公共退出功能（模态框）
    $('.topbar .icon_right').click(function() {
        $('#logoutModal').modal('show');
    })

    $('#logoutBtn').click(function() {
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            dataType: "json",
            success: function(info) {
                console.log(info);

                if (info.success) {
                    location.href = "login.html";
                }
            }
        })
    })

})