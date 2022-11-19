import "../css/bootstrap-grid.min.css";
import "../scss/style.scss";
import * as $ from 'jquery';

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

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;
const timeout = 600;

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i];
        el.addEventListener("click", function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}
function bodyUnlock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}