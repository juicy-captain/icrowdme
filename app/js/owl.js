$(function () {

    $(".owl-carousel").owlCarousel({
        nav: true,
        dots: false,
        loop: true,
        autoplay: true,
        slideSpeed: 900,
        paginationSpeed: 400,
        items: 1,
        autoHeight: true,
        rewindSpeed: 500,
        navText: ["<img src='img/icons/prev.png'>", "<img src='img/icons/next.png'>"],
    });

});