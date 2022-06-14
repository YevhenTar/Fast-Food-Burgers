"use-strict";

$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 10) {
            $('.main-header').addClass('stickytop');
        } else {
            $('.main-header').removeClass('stickytop');
        }
    });
});