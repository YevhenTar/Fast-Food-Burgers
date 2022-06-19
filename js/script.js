"use-strict";

window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
        document.body.classList.remove('body-blocked');
    }, 700);
}

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
for (let i = 0; i < burgers.length; i++) {
    burgers[i].addEventListener("click", function () {
        this.classList.remove("animate");

        var bars = this.querySelectorAll('.burger-menu__line');
        for (let i = 0; i < bars.length; i++) {
            // Reset span animations - https://css-tricks.com/restart-css-animation/
            void bars[i].offsetWidth;
        }

        if (this.classList.contains("open")) {
            this.classList.remove("open");
            this.classList.add("close");
            this.setAttribute('aria-expanded', 'false');
        } else {
            this.classList.remove("close");
            this.classList.add("open");
            this.setAttribute('aria-expanded', 'true');
        }
        this.classList.add("animate");
    });
};

