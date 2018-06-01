"use strict";

$(document).ready(function () {
    setTimeout(function () {
        $('header').addClass('visible');
    }, 500);
    $('.container.gallery').mixItUp({
        animation: {
            duration: 400,
            effects: 'fade translateZ(-360px) stagger(34ms)',
            easing: 'ease'
        }
    });

    $('.popup').css({'height':$(window).height()-130 + 'px'});

    $('.item').on('click', function(){
        $('.popup').addClass('active');
        $('.return').on('click', function(){
            $('.popup').removeClass('active');
        });
    });

    $(window).on('change', function(){
        $('.popup').css({'height':$(window).height()-130 + 'px'});
    });

    $(window).on('scroll',function(){
        var scroll=$(window).scrollTop(),
            off = 100;
        var tmp;
        if($(".gallery").offset().top-off <= scroll){
            tmp = 0;
        }
        if($(".about").offset().top-off <= scroll){
            tmp = 1;
        }
        if($(".students").offset().top-off <= scroll){
            tmp = 2;
        }
        if($(".contact").offset().top-off <= scroll){
            tmp = 3;
        }
        $('nav li.active').removeClass('active');
        $("nav li:eq("+tmp+")").addClass('active');
    });


    $('.nav li').on('click', function () {
        $('.bc-students, .mag-students, .abs-students').removeClass('active');
        $('.' + $(this).data('block')).addClass('active');
    });
    $('nav li').on('click', function () {
        $(document).scrollTo('.container.' + $(this).data('page'), 1000, {offset: -80});
    });

    $('.link-arrow').on('click', function () {
        $(document).scrollTo('.container.' + $(this).data('page'), 1000, {offset: -80});
    });

    $(document).on('scroll', function () {
        if (($(this).scrollTop() + 81) > $(window).height()) {
            $('header').addClass('active');
        }
        else {
            $('header').removeClass('active');
        }
    });
});