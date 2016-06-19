// Fallback for location.origin missing on IE.
if (!window.location.origin) {
    window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port)  : '');
}
jQuery.extend({
    postJSON: function (url, data, success, error) {
        return jQuery.ajax({
            type: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            contentType: 'application/json',
            context: this,
            data: JSON.stringify(data),
            url: url,
            success: success || function () {
            },
            error: function (xhr, error_name, error_code) {
                var data = {
                    'error': error_code
                };
                try {
                    data = JSON.parse(xhr.responseText);
                } catch (e) {
                }
                error(data);
            }
        });
    },
    throttle: function (func, wait, options) {
        var context,
        args,
        result;
        var timeout = null;
        var previous = 0;
        if (!options) options = {
        };
        var later = function () {
            previous = options.leading === false ? 0 : Date.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };
        return function () {
            var now = Date.now();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    },
    debounce: function (func, wait, immediate) {
        var timeout,
        args,
        context,
        timestamp,
        result;
        var later = function () {
            var last = Date.now() - timestamp;
            if (last < wait) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    context = args = null;
                }
            }
        };
        return function () {
            context = this;
            args = arguments;
            timestamp = Date.now();
            var callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
            return result;
        };
    }
});
$(function () {
    $('.message .dismiss').on('click', function () {
        $(this).parents('.message').remove();
    });
    $('body').on('click', '.ga-track-event', function () {
        var $this = $(this);
        var opt = {
            'hitType': 'event',
            'eventCategory': $this.data('ga-category'),
            'eventAction': $this.data('ga-action')
        };
        var label = $this.data('ga-optlabel');
        if (label) opt.eventLabel = label;
        ga('send', opt);
    });
    $(document).on('click', '.remove-rule', function () {
        if (confirm(gettext('Are sure you want to unpublish this item?'))) {
            $.postJSON($(this).attr('href'), {
            }, function () {
                location.reload();
            });
        }
        return false;
    });
    $('.toggle-popover').on('click', function (event) {
        var $popover = $(this).next('.pop-over');
        if ($popover.is(':visible')) {
            $popover.css({
                visibility: 'hidden',
                display: 'none'
            });
        } else {
            // Fix jQuery not calculating position correctly on load.
            if ($popover.css('top') != 'auto') {
                event.pageY -= 15;
            }
            $popover.css({
                top: 0,
                left: 0,
                display: 'block',
                visibility: 'hidden'
            }).position({
                of: event,
                my: 'center bottom',
                at: 'center top',
                collision: 'none',
            });
            setTimeout(function () {
                $popover.css('visibility', 'visible');
            }, 10);
        }
        $(this).toggleClass('active');
        return false;
    });
    $('.enable-ftp > input[type="checkbox"]').on('change', function () {
        var disabled = $(this).is(':checked') ? false : true;
        var $controls = $(this).parents('h3').siblings('.box').find('.controls');
        if (disabled) {
            $controls.addClass('disabled');
        } else {
            $controls.removeClass('disabled');
        }
    });
    if ($('.enable-ftp')) {
        $('.enable-ftp > input[type="checkbox"]').trigger('change');
    }
    $('a[data-trigger="dropdown"]').on('click', function () {
        if (!$(this).is('.active')) {
            $('ul.dropdown').removeClass('open').siblings('a[data-trigger="dropdown"]').removeClass('active');
        }
        $(this).toggleClass('active').siblings('.dropdown').add($(this).parent()).toggleClass('open');
        return false;
    });
    $('body').on('click', function () {
        if ($('ul.dropdown').is('.open')) {
            $('ul.dropdown').removeClass('open').siblings('a[data-trigger="dropdown"]').removeClass('active').parent().removeClass('open');
        } else if ($('.pop-over').is('.in')) {
            $('.toggle-popover').removeClass('active');
            $('.pop-over').removeClass('in');
            setTimeout(function () {
                $('.pop-over.cloned').remove();
            }, 200);
        }
    });
    $('.btn-filter').on('click', function (e) {
        e.preventDefault();
        if ($(this).is('.active')) {
            $('#filter-media').blur();
            $('#filter-media').val('').trigger('keyup');
        } else {
            setTimeout(function () {
                $('#filter-media').focus();
            }, 20);
        };
        $(this).toggleClass('active');
        $('#filter-media').toggleClass('opened');
    });
    $('.button.download-link').on('click', function () {
        if ($(this).attr('href') === '#') {
            alert(gettext('Player for this platform is not yet available.\nWe\'ll notify you as soon as it\'s done.'));
            return false;
        }
    })
    $('form').on('submit', function () {
        if (!$(this).data('disabled-on-submit')) {
            $(this).data('disabled-on-submit', true).find('input[type=submit], input[type=button]').attr('disabled', 'disabled');
        }
        return true;
    });
});
