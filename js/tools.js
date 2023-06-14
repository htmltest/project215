$(document).ready(function() {

    $('body').on('focus', '.form-input input, .form-input textarea', function() {
        $(this).parent().addClass('focus');
    });

    $('body').on('blur', '.form-input input, .form-input textarea', function() {
        $(this).parent().removeClass('focus');
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        } else {
            $(this).parent().removeClass('full');
        }
    });

    $('body').on('change', '.form-file input', function() {
        var curInput = $(this);
        var curField = curInput.parents().filter('.form-file');
        var curName = curInput.val().replace(/.*(\/|\\)/, '');
        if (curName != '') {
            var curNameArray = curName.split('.');
            var curExt = curNameArray[curNameArray.length - 1];
            curNameArray.pop();
            var curNameText = curNameArray.join('.');
            if (curNameText.length > 5) {
                curNameText = curNameText.substring(0, 5) + '...' + curNameText.slice(-1);
            }

            curField.find('.form-file-input span').html('<svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#input-file"></use></svg>' + '<em>' + curNameText + '.' + curExt + '<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#input-file-remove"></use></svg></a></em>');
            curField.addClass('full');
        } else {
            curField.find('.form-file-input span').html('<svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#input-file"></use></svg>' + curField.find('.form-file-input span').attr('data-placeholder'));
            curField.removeClass('full');
        }
    });

    $('body').on('click', '.form-file-input span em a', function(e) {
        var curField = $(this).parents().filter('.form-file');
        curField.find('input').val('');
        curField.find('.form-file-input span').html('<svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#input-file"></use></svg>' + curField.find('.form-file-input span').attr('data-placeholder'));
        curField.removeClass('full');
        e.preventDefault();
    });

    $('form').each(function() {
        initForm($(this));
    });

    $('body').on('click', '.window-link', function(e) {
        var curLink = $(this);
        windowOpen(curLink.attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('.header-search-link').click(function(e) {
        $('.header-search').addClass('open');
        $('.header-search-input input').trigger('focus');
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            $('.header-search').removeClass('open');
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-search').length == 0) {
            $('.header-search').removeClass('open');
        }
    });

    $('.mobile-menu-link').click(function(e) {
        var curWidth = $(window).width();
        if (curWidth < 480) {
            curWidth = 480;
        }
        var curScroll = $(window).scrollTop();
        $('html').addClass('mobile-menu-open');
        $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
        $('html').data('scrollTop', curScroll);
        $('.wrapper').css('margin-top', -curScroll);
        e.preventDefault();
    });

    $('.mobile-menu-close').click(function(e) {
        $('html').removeClass('mobile-menu-open');
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        $('.wrapper').css('margin-top', 0);
        $(window).scrollTop($('html').data('scrollTop'));
        e.preventDefault();
    });

    $('.nav > ul > li').each(function() {
        var curItem = $(this);
        if (curItem.find('ul').length == 1) {
            curItem.append('<span class="nav-mobile-sublink"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#nav-mobile-sublink"></use></svg></span>');
        }
    });

    $('body').on('click', '.nav-mobile-sublink', function() {
        $(this).parent().toggleClass('open');
    });

    $('.header-lang-link-mobile').click(function(e) {
        $('.header-lang').toggleClass('open');
    });

    $('.footer-menu > ul > li').each(function() {
        var curItem = $(this);
        if (curItem.find('ul').length == 1) {
            curItem.append('<span class="footer-menu-mobile-sublink"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#nav-mobile-sublink"></use></svg></span>');
        }
    });

    $('body').on('click', '.footer-menu-mobile-sublink', function() {
        $(this).parent().toggleClass('open');
    });

    $('.slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnFocus: false,
        pauseOnHover: false,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#slider-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#slider-next"></use></svg></button>',
        dots: true,
        responsive: [
            {
                breakpoint: 1399,
                settings: {
                    arrows: false
                }
            },
            {
                breakpoint: 1219,
                settings: {
                    autoplay: false,
                    arrows: true,
                    prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#main-about-reviews-prev"></use></svg></button>',
                    nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#main-about-reviews-next"></use></svg></button>',
                    adaptiveHeight: true
                }
            }
        ]
    });

    $('.main-about-reviews-list').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#main-about-reviews-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#main-about-reviews-next"></use></svg></button>',
        dots: true,
        responsive: [
            {
                breakpoint: 1219,
                settings: {
                    adaptiveHeight: true
                }
            }
        ]
    });

    $('.main-more-link a').click(function(e) {
        $(this).parent().parent().toggleClass('more-open');
        e.preventDefault();
    });

    $('.faq-item-title').click(function(e) {
        $(this).parent().toggleClass('open');
        e.preventDefault();
    });

    $('.integrations-side').each(function() {
        var newHTML =   '<ul>';
        $('.integrations-group').each(function() {
            newHTML +=      '<li><a href="#">' + $(this).find('.integrations-group-title').html() + '</a></li>';
        });
        newHTML +=      '</ul>';
        $('.integrations-side-inner').html(newHTML);
    });

    $('.integrations-side-inner a').click(function(e) {
        var curIndex = $('.integrations-side-inner a').index($(this));
        $('html, body').animate({'scrollTop': $('.integrations-group').eq(curIndex).offset().top - $('header').height()});
        e.preventDefault();
    });

    $('.articles-search-link .btn-border').click(function(e) {
        $('.articles-search').addClass('open');
        $('.articles-search-form .form-input input').trigger('focus');
        e.preventDefault();
    });

    $('.articles-filter form').each(function() {
        var curForm = $(this);
        var validator = curForm.validate();
        if (validator) {
            validator.destroy();
        }
        curForm.find('.form-input input').attr('autocomplete', 'off');
        curForm.validate({
            ignore: '',
            submitHandler: function(form) {
                updateArticles();
            }
        });
    });

    $('.articles-filter-tag input').change(function() {
        updateArticles();
    });

    $('body').on('click', '.articles-list .pager a', function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('active')) {
            $('.pager a.active').removeClass('active');
            curLink.addClass('active');
            updateArticles();
            $('html, body').animate({'scrollTop': $('.articles-list').offset().top - $('header').outerHeight()});
        }
        e.preventDefault();
    });

    $('.article-header-read-link .btn').click(function(e) {
        $('.article-header-read').toggleClass('open');
        e.preventDefault();
    });

    $('.automation-menu-inner').on('scroll', function() {
        var curLeft = $('.automation-menu-inner').scrollLeft();
        if (curLeft == 0) {
            $('.automation-menu').removeClass('with-left');
        } else {
            $('.automation-menu').addClass('with-left');
        }
        if (curLeft + $('.automation-menu-inner').outerWidth() >= Math.round($('.automation-menu-inner ul').outerWidth())) {
            $('.automation-menu').removeClass('with-right');
        } else {
            $('.automation-menu').addClass('with-right');
        }
    });

    $('.automation-submenu-inner').on('scroll', function() {
        var curLeft = $('.automation-submenu-inner').scrollLeft();
        if (curLeft == 0) {
            $('.automation-submenu').removeClass('with-left');
        } else {
            $('.automation-submenu').addClass('with-left');
        }
        if (curLeft + $('.automation-submenu-inner').outerWidth() >= Math.round($('.automation-submenu-inner ul').outerWidth())) {
            $('.automation-submenu').removeClass('with-right');
        } else {
            $('.automation-submenu').addClass('with-right');
        }
    });

    $('body').on('click', '.automation-menu li a', function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.automation-menu li.active').removeClass();
            curItem.addClass('active');
            var curIndex = $('.automation-menu li').index(curItem);
            var childMenu =    '<ul>';
            $('.automation-content-parent').eq(curIndex).find('.automation-content-child').each(function() {
                var curBlock = $(this);
                childMenu += '<li><a href="#">' + curBlock.attr('data-title') + '</a></li>';
            });
            childMenu +=       '</ul>';
            $('.automation-content-parent.active').removeClass('active');
            $('.automation-content-parent').eq(curIndex).addClass('active');
            var countChild = $('.automation-content-parent').eq(curIndex).find('.automation-content-child').length;
            $('.automation-content-parent').eq(curIndex).find('.automation-prev').addClass('disabled');
            $('.automation-content-parent').eq(curIndex).find('.automation-next').removeClass('disabled');
            if (countChild == 1) {
                $('.automation-content-parent').eq(curIndex).find('.automation-next').addClass('disabled');
            }
            $('.automation-content-parent').eq(curIndex).find('.automation-parent-ctrl-text span').html('1');
            $('.automation-content-parent').eq(curIndex).find('.automation-parent-ctrl-text strong').html(countChild);
            $('.automation-submenu-inner').html(childMenu);
            $('.automation-submenu li a').eq(0).trigger('click');
            $('.automation-submenu-inner').animate({'scrollLeft': 0});
            if ($(window).width() < 1220) {
                var curItemLeft = curItem.offset().left;
                var curItemWidth = curItem.outerWidth();
                if (curItemLeft + curItemWidth > $('.automation-menu').outerWidth() + $('.automation-menu').offset().left) {
                    var newScroll = $('.automation-menu-inner').scrollLeft() + ((curItemLeft + curItemWidth) - ($('.automation-menu').outerWidth() + $('.automation-menu').offset().left));
                    $('.automation-menu-inner').animate({'scrollLeft': newScroll + 40});
                } else if (curItemLeft < $('.automation-menu').offset().left) {
                    var newScroll = $('.automation-menu-inner').scrollLeft() - ($('.automation-menu').offset().left - curItemLeft);
                    $('.automation-menu-inner').animate({'scrollLeft': newScroll - 40});
                }
            }
        }
        $('.automation-submenu-inner').trigger('scroll');
        e.preventDefault();
    });

    $('body').on('click', '.automation-prev', function(e) {
        var curIndex = $('.automation-submenu li').index($('.automation-submenu li.active'));
        $('.automation-submenu li a').eq(curIndex - 1).trigger('click');
        e.preventDefault();
    });

    $('body').on('click', '.automation-next', function(e) {
        var curIndex = $('.automation-submenu li').index($('.automation-submenu li.active'));
        $('.automation-submenu li a').eq(curIndex + 1).trigger('click');
        e.preventDefault();
    });

    $('body').on('click', '.automation-submenu li a', function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.automation-submenu li.active').removeClass();
            curItem.addClass('active');
            var curIndex = $('.automation-submenu li').index(curItem);
            $('.automation-content-parent.active .automation-content-child.active').removeClass('active');
            $('.automation-content-parent.active .automation-content-child').eq(curIndex).addClass('active');
            $('.automation-content-parent.active .automation-parent-ctrl-text span').html(curIndex + 1);
            if (curIndex == 0) {
                $('.automation-content-parent.active .automation-prev').addClass('disabled');
            } else {
                $('.automation-content-parent.active .automation-prev').removeClass('disabled');
            }
            if (curIndex == $('.automation-submenu li').length - 1) {
                $('.automation-content-parent.active .automation-next').addClass('disabled');
            } else {
                $('.automation-content-parent.active .automation-next').removeClass('disabled');
            }
            if ($(window).width() < 1220) {
                var curItemLeft = curItem.offset().left;
                var curItemWidth = curItem.outerWidth();
                if (curItemLeft + curItemWidth > $('.automation-submenu').outerWidth() + $('.automation-submenu').offset().left) {
                    var newScroll = $('.automation-submenu-inner').scrollLeft() + ((curItemLeft + curItemWidth) - ($('.automation-submenu').outerWidth() + $('.automation-submenu').offset().left));
                    $('.automation-submenu-inner').animate({'scrollLeft': newScroll + 40});
                } else if (curItemLeft < $('.automation-submenu').offset().left) {
                    var newScroll = $('.automation-submenu-inner').scrollLeft() - ($('.automation-submenu').offset().left - curItemLeft);
                    $('.automation-submenu-inner').animate({'scrollLeft': newScroll - 40});
                }
            }
        }
        e.preventDefault();
    });

    $('.automation').each(function() {
        var parentMenu =    '<ul>';
        $('.automation-content-parent').each(function() {
            var curBlock = $(this);
            parentMenu += '<li><a href="#">' + curBlock.attr('data-title') + '</a></li>';
        });
        parentMenu +=       '</ul>';
        $('.automation-menu-inner').html(parentMenu);
        $('.automation-menu li a').eq(0).trigger('click');
        $('.automation-menu-inner').trigger('scroll');
    });

    $('.bottom-message-close').click(function(e) {
        $(this).parents().filter('.bottom-messages-item').fadeOut(500);
        e.preventDefault();
    });

    $('.deployment-item-detail-header .deployment-item-btn a').click(function(e) {
        var curHeader = $(this).parents().filter('.deployment-item-detail-header');
        curHeader.toggleClass('open');
        var curID = curHeader.attr('data-id');
        $('.deployment-item-detail-item[data-parent="' + curID + '"]').toggleClass('open');

        $('.deployment-item').removeClass('visible odd even');
        $('.deployment-item:visible').addClass('visible');
        $('.deployment-item:visible:odd').addClass('odd');
        $('.deployment-item:visible:even').addClass('even');

        e.preventDefault();
    });

    $('.deployment-item').removeClass('visible odd even');
    $('.deployment-item:visible').addClass('visible');
    $('.deployment-item:visible:odd').addClass('odd');
    $('.deployment-item:visible:even').addClass('even');

});

function initForm(curForm) {
	curForm.find('.form-input input').each(function() {
		if ($(this).val() != '') {
			$(this).parent().addClass('full');
		} else {
			$(this).parent().removeClass('full');
		}
	});

    curForm.find('.form-input input:focus, .form-input textarea:focus').each(function() {
        $(this).trigger('focus');
    });

    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        var options = {
            minimumResultsForSearch: 20
        }

        options['dropdownParent'] = curForm;

        curSelect.select2(options);

        curSelect.parent().find('.select2-container').attr('data-placeholder', curSelect.attr('data-placeholder'));
        curSelect.parent().find('.select2-selection').attr('data-placeholder', curSelect.attr('data-placeholder'));
        curSelect.on('select2:select', function(e) {
            $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full');
            if (typeof curSelect.attr('multiple') !== 'undefined') {
                $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full-multiple');
            }
            curSelect.parent().find('select.error').removeClass('error');
            curSelect.parent().find('label.error').remove();
            curSelect.parent().find('select').addClass('valid');
        });

        curSelect.on('select2:unselect', function(e) {
            if (curSelect.find('option:selected').length == 0) {
                curSelect.parent().find('.select2-container').removeClass('select2-container--full select2-container--full-multiple');
                curSelect.parent().find('select').removeClass('valid');
            }
        });

        if (curSelect.val() != '' && curSelect.val() !== null) {
            curSelect.trigger({type: 'select2:select'})
            curSelect.parent().find('.select2-container').addClass('select2-container--full');
            curSelect.parent().find('select').addClass('valid');
            if (typeof curSelect.attr('multiple') !== 'undefined') {
                $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full-multiple');
            }
        }
    });


    curForm.find('.captcha-container').each(function() {
        if ($('script#smartCaptchaScript').length == 0) {
            $('body').append('<script src="https://captcha-api.yandex.ru/captcha.js?render=onload&onload=smartCaptchaLoad" defer id="smartCaptchaScript"></script>');
        } else {
            if (window.smartCaptcha) {
                var curID = window.smartCaptcha.render(this, {
                    sitekey: smartCaptchaKey,
                    callback: smartCaptchaCallback,
                    invisible: true,
                    hideShield: true,
                    hl: 'en'
                });
                $(this).attr('data-smartid', curID);
            }
        }
    });

    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            var curForm = $(form);

            var smartCaptchaWaiting = false;
            curForm.find('.captcha-container').each(function() {
                if (curForm.attr('form-smartcaptchawaiting') != 'true') {
                    var curBlock = $(this);
                    var curInput = curBlock.find('input[name="smart-token"]');
                    curInput.removeAttr('value');
                    smartCaptchaWaiting = true;
                    $('form[form-smartcaptchawaiting]').removeAttr('form-smartcaptchawaiting');
                    curForm.attr('form-smartcaptchawaiting', 'false');

                    if (!window.smartCaptcha) {
                        alert('The service is temporarily unavailable, try again later.');
                        return;
                    }
                    var curID = $(this).attr('data-smartid');
                    window.smartCaptcha.execute(curID);
                } else {
                    curForm.removeAttr('form-smartcaptchawaiting');
                }
            });

            if (!smartCaptchaWaiting) {

                if (curForm.hasClass('ajax-form')) {
                    curForm.addClass('loading');
                    var formData = new FormData(form);

                    if (curForm.find('[type=file]').length != 0) {
                        var file = curForm.find('[type=file]')[0].files[0];
                        formData.append('file', file);
                    }

                    $.ajax({
                        type: 'POST',
                        url: curForm.attr('action'),
                        processData: false,
                        contentType: false,
                        dataType: 'json',
                        data: formData,
                        cache: false
                    }).fail(function(jqXHR, textStatus, errorThrown) {
                        curForm.find('.message').remove();
                        curForm.append('<div class="message message-error"><div class="message-title">Wrong!</div><div class="message-text">The service is temporarily unavailable, try again later.</div></div>')
                        curForm.removeClass('loading');
                    }).done(function(data) {
                        curForm.find('.message').remove();
                        if (data.status) {
                            curForm.html('<div class="message message-success"><div class="message-title">' + data.title + '</div><div class="message-text">' + data.message + '</div></div>')
                        } else {
                            curForm.append('<div class="message message-error"><div class="message-title">' + data.title + '</div><div class="message-text">' + data.message + '</div></div>')
                        }
                        curForm.removeClass('loading');
                    });
                } else {
                    form.submit();
                }
            }
        }
    });
}

var smartCaptchaKey = 'uahGSHTKJqjaJ0ezlhjrbOYH4OxS6zzL9CZ47OgY';

function smartCaptchaLoad() {
    $('.captcha-container').each(function() {
        if (!window.smartCaptcha) {
            return;
        }
        var curID = window.smartCaptcha.render(this, {
            sitekey: smartCaptchaKey,
            callback: smartCaptchaCallback,
            invisible: true,
            hideShield: true,
            hl: 'en'
        });
        $(this).attr('data-smartid', curID);
    });
}

function smartCaptchaCallback(token) {
    $('form[form-smartcaptchawaiting]').attr('form-smartcaptchawaiting', 'true');
    $('form[form-smartcaptchawaiting] [type="submit"]').trigger('click');
}

function windowOpen(linkWindow, dataWindow) {
    if ($('.window').length == 0) {
        var curPadding = $('.wrapper').width();
        var curWidth = $(window).width();
        if (curWidth < 480) {
            curWidth = 480;
        }
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
        $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
    } else {
        $('.window').append('<div class="window-loading"></div>')
        $('.window-container').addClass('window-container-preload');
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window-container').length == 0) {
            $('.window').html('<div class="window-container window-container-preload">' + html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');
        } else {
            $('.window-container').html(html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
            $('.window .window-loading').remove();
        }

        window.setTimeout(function() {
            $('.window-container-preload').removeClass('window-container-preload');
        }, 100);

        $('.window form').each(function() {
            initForm($(this));
        });

    });
}

function windowClose() {
    if ($('.window').length > 0) {

        var isEmptyForm = true;
        $('.window .form-input input, .window .form-input textarea, .window .form-select select').each(function() {
            if ($(this).val() != '') {
                isEmptyForm = false;
            }
        });
        if (isEmptyForm) {
            $('.window').remove();
            $('html').removeClass('window-open');
            $('body').css({'margin-right': 0});
            $('.wrapper').css({'top': 0});
            $('meta[name="viewport"]').attr('content', 'width=device-width');
            $(window).scrollTop($('.wrapper').data('curScroll'));
        } else {
            if (confirm('Close the form?')) {
                $('.window .form-input input, .window .form-input textarea, .window .form-select select').val('');
                windowClose();
            }
        }
    }
}

$(window).on('load resize', function() {

    $('.info-block').each(function() {
        var curBlock = $(this);
        curBlock.find('.info-block-item-row').css({'min-height': '0'});
        if ($(window).width() > 1219) {
            curBlock.find('.info-block-item').eq(0).find('.info-block-item-row').each(function() {
                var curRow = $(this);
                var curMax = 0;
                var curIndex = curBlock.find('.info-block-item').eq(0).find('.info-block-item-row').index(curRow);
                curBlock.find('.info-block-item').each(function() {
                    var curItem = $(this);
                    var curHeight = curItem.find('.info-block-item-row').eq(curIndex).outerHeight();
                    if (curHeight > curMax) {
                        curMax = curHeight;
                    }
                });
                curBlock.find('.info-block-item').each(function() {
                    var curItem = $(this);
                    curItem.find('.info-block-item-row').eq(curIndex).css({'min-height': curMax + 'px'});
                });
            });
        }
    });

    $('.more-open').removeClass('more-open');
    $('.main-more-link').removeClass('visible');

    $('.main-prefs-group').each(function() {
        var count = 4;
        if ($(window).width() < 1220) {
            count = 3;
        }
        var curGroup = $(this);
        if (curGroup.find('.main-prefs-item').length > count) {
            curGroup.find('.main-more-link').addClass('visible');
        }
    });

    $('.main-events').each(function() {
        var count = 1;
        var curGroup = $(this);
        if (curGroup.find('.main-events-item').length > count) {
            curGroup.find('.main-more-link').addClass('visible');
        }
    });

    $('.integrations-group').each(function() {
        var count = 3;
        if ($(window).width() < 1220) {
            count = 2;
        }
        var curGroup = $(this);
        if (curGroup.find('.integrations-group-item').length > count || curGroup.find('.integrations-group-all').length > 0) {
            curGroup.find('.main-more-link').addClass('visible');
        }
    });

});

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();
    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    $('.integrations-side').each(function() {
        if (windowScroll > $('.integrations-side').offset().top - $('header').outerHeight() - 10) {
            $('.integrations-side').addClass('fixed');
            if (windowScroll + $('header').outerHeight() + 10 + $('.integrations-side-inner').outerHeight() > $('.integrations').offset().top + $('.integrations').outerHeight()) {
                $('.integrations-side-inner').css({'margin-top': ($('.integrations').offset().top + $('.integrations').outerHeight()) - (windowScroll + $('header').outerHeight() + 10 + $('.integrations-side-inner').outerHeight())});
            } else {
                $('.integrations-side-inner').css({'margin-top': 0});
            }
        } else {
            $('.integrations-side').removeClass('fixed');
            $('.integrations-side-inner').css({'margin-top': 0});
        }

        $('.integrations-side li.active').removeClass('active');
        $('.integrations-side li').each(function() {
            var curIndex = $('.integrations-side li').index($(this));
            var curBlock = $('.integrations-group').eq(curIndex);
            if (curBlock.length > 0) {
                if (windowScroll + windowHeight / 2 > curBlock.offset().top) {
                    $('.integrations-side li.active').removeClass('active');
                    $(this).addClass('active');
                }
            }
        });
    });

});

function updateArticles() {
    $('.articles-list').addClass('loading');
    var curForm = $('.articles-filter form');
    var curData = curForm.serialize();
    curData += '&page=' + $('.pager a.active').attr('data-value');
    $.ajax({
        type: 'POST',
        url: curForm.attr('action'),
        dataType: 'html',
        data: curData,
        cache: false
    }).done(function(html) {
        $('.articles-list').html(html);
        $('.articles-list').removeClass('loading');
    });
}