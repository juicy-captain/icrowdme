$(function () {

$("#tabs > label").click(function () {

    $("#tabs label ").removeClass('active-tab');
    $("#tabs label div").removeClass('active-tab');

    $(this).addClass('active-tab');
    $(this).children("div").addClass('active-tab');

});

});