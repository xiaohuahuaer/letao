
$(function() {


    var currentPage = 1;
    var pageSize = 3;

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

// 接口文档、、、

    // $('tbody').on('click','.btn',function() {
    //     $('#productModal').modal('show');

    //     currentId = $(this).parent().data('id');
    //
    //
    //
    // });

    // $('#submitBtn').click(function() {
    //     $.ajax({
    //         type: 'post',
    //         url: '/product/updateProduct',
    //         data: {
    //             id: currentId,
    //             proName:
    //
    //
    //
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

        $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
    });


    $('#fileupload').fileupload({
        dataType: 'json',
        done: function(e,data) {
            console.log(data);

            var picObj = data.result;
            picArr.unshift(picObj);

            var picUrl = picObj.picAddr;
            $('#imgBox').prepend('<img src="'+ picUrl +'" style="width: 100px">');

            if (picArr.length > 3) {
                picArr.pop();
                $('#imgBox img:last-of-type').remove();
            }
            console.log(picArr);

            if(picArr.length === 3) {
                $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
            }
        }
    });


    $('#form').bootstrapValidator({
        excluded: [],

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },

            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },

            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },

            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存必须是非零数字开头'
                    }
                }
            },

            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '商品尺码格式为xx-xx，xxwei两位数字。例：32-42'
                    }
                }
            },

            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品原价'
                    }
                }
            },

            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品现价'
                    }
                }
            },

            picStatus: {
                validators: {
                    notEmpty: {
                        message: '请上传3张图片'
                    }
                }
            }
        }
    });


    $('#form').on('success.form.bv',function(e) {
        e.preventDefault();

        var paramsStr = $('#form').serialize();

        paramsStr += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
        paramsStr += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
        paramsStr += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;

        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data:  paramsStr,
            dataType: 'json',
            success: function(info) {
                console.log(info);

                if (info.success) {
                    $('#addModal').modal('hide');
                    currentPage = 1;
                    render();

                    $('#form').data('bootstrapValidator').resetForm(true);
                    $('#dropdownText').text('请选择二级分类');
                    $('#imgBox img').remove();
                    picArr = [];
                }
            }
        })
    });


})