$(function () {

    $("#tabs > label").click(function () {

        $("#tabs label ").removeClass('active-tab');
        $("#tabs label div").removeClass('active-tab');

        $(this).addClass('active-tab');
        $(this).children("div").addClass('active-tab');

    });

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
        navText: ["<img src='/img/icons/prev.png'>", "<img src='/img/icons/next.png'>"],
    });

    $('#menu').slicknav({
        label: '',
        duration: 1000,
    });

});