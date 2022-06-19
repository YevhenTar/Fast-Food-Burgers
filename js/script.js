"use-strict";

window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
        document.body.classList.remove('body-blocked');
    }, 700);
}

$(document).ready(function () {
    $('.menu-list__link').on('click', function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500, 'linear');
    });
});

$('.logo-link').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 500, 'linear');
});

$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 10) {
            $('.main-header').addClass('stickytop');
        } else {
            $('.main-header').removeClass('stickytop');
        }
    });
});


let burgers = document.querySelectorAll('.burger-menu');
let hiddenMenu = document.querySelector('.hidden-menu');
for (let i = 0; i < burgers.length; i++) {
    burgers[i].addEventListener("click", function () {

        this.classList.remove("animate");

        var bars = this.querySelectorAll('.burger-menu__line');
        for (let i = 0; i < bars.length; i++) {
            // Reset span animations - https://css-tricks.com/restart-css-animation/
            void bars[i].offsetWidth;
        }

        if (this.classList.contains("open")) {
            document.body.classList.remove('body-blocked');
            this.classList.remove("open");
            this.classList.add("close");
            hiddenMenu.style.display = "none";
            this.setAttribute('aria-expanded', 'false');
        } else {
            document.body.classList.add('body-blocked');
            this.classList.remove("close");
            this.classList.add("open");
            hiddenMenu.style.display = "flex";
            this.setAttribute('aria-expanded', 'true');
        }
        this.classList.add("animate");
    });
};

$(document).ready(function () {
    $('.hidden-menu__link').on('click', function (e) {
        e.preventDefault();
        $('.burger-menu').removeClass('animate').removeClass('open').addClass('close');
        $('body').removeClass('body-blocked');
        $(".hidden-menu").fadeToggle(300);
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500, 'linear');
        $('.burger-menu').addClass("animate");
        $('.burger-menu').attr('aria-expanded', 'false');
    });
});
