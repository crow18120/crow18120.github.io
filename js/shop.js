$(function() {
    active_btn_dot_file_item('#e-voucher');
    active_btn_dot_file_item('#other-product');

    resize_dots('#e-voucher');
    resize_dots('#other-product');

    $(window).resize(function () {
        resize_dots('#e-voucher');
        resize_dots('#other-product');
    })
})