import ScrollOut from "scroll-out";


ScrollOut({
    targets: '.scroll-animate',
    once: true,
    onShown(el) {
        el.classList.add("new-animate");
    }
});