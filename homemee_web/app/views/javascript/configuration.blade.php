<script type="text/javascript">
    function loadData() {
        $('button, input[type=submit]').attr('disabled', false);
        visionone_ajax({
            // get field trong audit
            url: "/configurations/list",
            type: "GET",
            data: null,
            success: function (data, textStatus, jqXHR) {
                showNotify(data, function () {
                    var screen1 = document.getElementById("screen1");
                    var screen2 = document.getElementById("screen2");
                    var screen3 = document.getElementById("screen3");
                    screen1.src = "{{asset('img/visionone_home_page.png')}}";
                    screen2.src = "{{asset('img/visionone_home_page.png')}}";
                    screen3.src = "{{asset('img/visionone_home_page.png')}}";
                    var timepickiTim = 0;
                    var timepickiMini = 0;
                    var timepickiMeri = 0;
                    $.each(data.data, function (index, item) {
                        if (item.config_key == 'vertical_screen_url' && item.config_value != null) {
                            var verticalScreenJson = JSON.parse(item.config_value);
                            screen1.src = verticalScreenJson.thumb_uri;     // screen saver

                        } else if (item.config_key == 'horizontal_screen_url' && item.config_value != null) {
                            var horizontalScreenJson = JSON.parse(item.config_value);
                            screen2.src = horizontalScreenJson.thumb_uri;     // screen saver

                        } else if (item.config_key == 'default_content_url' && item.config_value != null) {
                            var defaultContentJson = JSON.parse(item.config_value);
                            screen3.src = defaultContentJson.thumb_uri;     // screen saver

                        } else if (item.config_key == 'download_time' && item.config_value != null) {
                            var download_time = JSON.parse(item.config_value);
                            timepickiTim = download_time.timepickiTim;
                            timepickiMini = download_time.timepickiMini;
                            timepickiMeri = download_time.timepickiMeri;

                            $('.download_time').attr('data-timepicki-tim', timepickiTim)
                                    .attr('data-timepicki-mini', timepickiMini)
                                    .attr('data-timepicki-meri', timepickiMeri)
                                    .val(timepickiTim + " : " + timepickiMini + " : " + timepickiMeri);

                        } else if (item.config_key == 'reboot_time' && item.config_value != null) {
                            var reboot_time = JSON.parse(item.config_value);
                            timepickiTim = reboot_time.timepickiTim;
                            timepickiMini = reboot_time.timepickiMini;
                            timepickiMeri = reboot_time.timepickiMeri;

                            $('.reboot_time').attr('data-timepicki-tim', timepickiTim)
                                    .attr('data-timepicki-mini', timepickiMini)
                                    .attr('data-timepicki-meri', timepickiMeri)
                                    .val(timepickiTim + " : " + timepickiMini + " : " + timepickiMeri);
                        } else {

                            $("#configuration-form #" + item.config_key).val(item.config_value);
                        }

                    });
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.notify("{{trans('lang.error')}}", "error");
                // show default
            }
        });
    }
    $(document).ready(function () {
        $(".download_time").timepicki();
        $(".reboot_time").timepicki();
        loadData();
    });

    $('#bt-save').click(function () {
        $('#bt-save-configuration').attr('disabled',false);
        $('#saveModal').modal('show');
    });

    $('#bt-save-configuration').click(function () {
        $('#bt-save-configuration, input[type=submit]').attr('disabled', true);
        $('#saveModal').modal('hide');
        if ($('#download_interval').val() != "" && $('#download_interval').val() <= 0) {
            $.notify("{{trans('lang.download_interval_error')}}", "error");
            return;
        }
        if ($('#event_logger_interval').val() < 30) {
            $.notify("{{trans('lang.event_logger_interval_error')}}", "error");
            return;
        }
        if ($('#play_logger_interval').val() < 30) {
            $.notify("{{trans('lang.play_logger_interval_error')}}", "error");
            return;
        }
        if ($('#statistic_logger_fast_mode_interval').val() < 30) {
            $.notify("{{trans('lang.statistic_logger_fast_mode_interval_error')}}", "error");
            return;
        }
        if ($('#statistic_logger_low_mode_interval').val() < 30) {
            $.notify("{{trans('lang.statistic_logger_low_mode_interval_error')}}", "error");
            return;
        }

        if ($('#screenshot_interval').val() < 30) {
            $.notify("{{trans('lang.screenshot_interval_error')}}", "error");
            return;
        }

        var formData = new FormData($("#configuration-form")[0]);
        formData.append('download_time', JSON.stringify($('.download_time').data()));
        formData.append('reboot_time', JSON.stringify($('.reboot_time').data()));
        formData.append('download_interval', $('#download_interval').val());
        formData.append('event_logger_interval', $('#event_logger_interval').val());
        formData.append('play_logger_interval', $('#play_logger_interval').val());
        formData.append('statistic_logger_fast_mode_interval', $('#statistic_logger_fast_mode_interval').val());
        formData.append('statistic_logger_low_mode_interval', $('#statistic_logger_low_mode_interval').val());
        formData.append('screenshot_interval', $('#screenshot_interval').val());
        visionone_ajax({
            url: "/configurations/save",
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data, textStatus, jqXHR) {
                showNotify(data, function () {
//                    loadData();
//                    location.reload(true);
                });
                location.reload(true);
            },
            error: function () {
                $('#bt-save-configuration, input[type=submit]').attr('disabled', false);
                $.notify("{{trans('lang.error')}}", "error");
            }
        });
    });
</script>