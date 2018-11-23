
$(function() {


    var currentPage = 1;
    var pageSize = 2;

    var picArr = [];

    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            datatype: 'json',
            success: function(info) {
                console.log(info);

                var htmlStr = template('productTpl',info);
                $('tbody').html(htmlStr);


                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total/info.size),
                    onPageClicked: function(a,b,c,page) {
                        currentPage = page;

                        render();
                    }
                })
            }
        })
    }

// 无接口文档、、

    // $('tbody').on('click','.btn',function() {
    //     $('#productModal').modal('show');

    //     currentId = $(this).parent().data('id');
    //     isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    // });

    // $('#submitBtn').click(function() {
    //     $.ajax({
    //         type: 'post',
    //         url: '/product/updateProduct',
    //         data: {
    //             id: currentId,
    //             isDelete: isDelete
    //         },
    //         datatype: 'json',
    //         success: function(info) {
    //             console.log(info);

    //             if(info.success) {
    //                 $('#productModal').modal('hide');

    //                 render();
    //             }
    //         }
    //     })
    // })


    $('#addBtn').click(function() {
        $('#addModal').modal('show');

        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            datatype: 'json',
            success: function(info) {
                console.log(info);

                var htmlStr = template('dropdownTpl',info);
                $('.dropdown-menu').html(htmlStr);
            }
        })
    });

    $('.dropdown-menu').on('click','a',function() {
        var txt = $(this).text();
        var id = $(this).data('id');

        $('#dropdownText').text(txt);
        $('[name="brandId"]').val(id);
    });


    $('#fileupload').fileupload({
        type: 'json',
        done: function(e,data) {
            console.log(data);

            var picObj = data.result;
            var picAddr = picObj.picAddr;

            
        }
    })


})