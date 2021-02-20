$(document).ready(function(){
	console.log('Học thành công Gulp !');

    //back to top
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('header').addClass('stick');
            // $("#back-to-top").fadeIn(300);
        } else {
            $('header').removeClass('stick');
            // $("#back-to-top").fadeOut(300);
        }
    });
    if ($('#back-to-top').length) {
        $("#back-to-top").on('click', function() {
            $('html, body').animate({
                scrollTop: $('html, body').offset().top,
            }, 1000);
        });
    }
    //click readmore faq
    // $('.faq-list .faq-list-content .item .info .read-more-section').click(function(){
    //     $(this).parent().find('.faq-admin-rep').css("max-height", "100%");
    //     $(this).parent().find('span').css("display", "none");
    // });

    //menu
    $('.main-menu').meanmenu({
        meanScreenWidth: "1200",
        meanMenuContainer: ".mobile-menu",
    });

    //teams
    // $('.venobox').venobox({
    //     numeratio  : true,  //phân trang
    //     infinigall : true, //lặp vô hạn
    //     share      : ['facebook', 'twitter', 'linkedin', 'pinterest', 'download']
    // });
    
    //slick
    if ($('.home-banner-content').length > 0) {
	    $('.home-banner-content').slick({
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        dots: true,
	        arrows: false,
	        pauseOnHover: true
	    });
	}
});