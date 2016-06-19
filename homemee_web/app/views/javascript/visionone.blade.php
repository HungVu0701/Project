<script type="text/javascript">
    api_token = "{{\Session::get('token')}}";

    function responseHandler(response) {
        if (response == null) {
            $.notify("{{trans('lang.response_is_empty')}}", "error");
        } else {
            var msg = response.msg;
            var msgType = response.msgType;
            if (msg != null && msgType != null) {
                $.notify(msg, msgType);
            }
            var status = response.status;
            if (status == 200 || status == 201) {
                return response.data;
            }
        }
        return [];
    }

    function showNotify(response, callback) {
        if (response == null) {
            $.notify("{{trans('lang.response_is_empty')}}", "error");
        } else {
            var msg = response.msg;
            var msgType = response.msgType;
            if (msg != null && msgType != null) {
                $.notify(msg, msgType);
            }

            var status = response.status;
            if (status == 200 || status == 201) {
                if (callback != null) {
                    callback();
                }
            }
        }
    }

    $('body').on('hidden.bs.modal', '.modal', function () {
        $('video').trigger('pause');
    });

    function visionone_ajax(options) {
        options.headers = {"Api-Token": api_token};
        return $.ajax(options);
    }

    function indexFormatter(value, row, index){
        return index + 1;
    }

    var iconSelect;

    window.onload = function () {
        {{--iconSelect = new IconSelect("icon-language-select",--}}
                {{--{--}}
                    {{--'selectedIconWidth': 24,--}}
                    {{--'selectedIconHeight': 18,--}}
                    {{--'selectedBoxPadding': 1,--}}
                    {{--'iconsWidth': 24,--}}
                    {{--'iconsHeight': 18,--}}
                    {{--'boxIconSpace': 1,--}}
                    {{--'vectoralIconNumber': 1,--}}
                    {{--'horizontalIconNumber': 1--}}
                {{--});--}}
        {{--var icons = [];--}}
        {{--icons.push({'iconFilePath': '/img/icon/vi.png', 'iconValue': 0});--}}
        {{--icons.push({'iconFilePath': '/img/icon/en.png', 'iconValue': 1});--}}
        {{--iconSelect.refresh(icons);--}}
        {{--iconSelect.setSelectedIndex({{\Session::get('language',1)}});--}}
        $( "#en_selected" ).click(function() {
            var postData = {
                "lang": 1
            };
            visionone_ajax({
                url: "/language/change",
                type: "POST",
                data: postData,
                success: function (data, textStatus, jqXHR) {
                    showNotify(data, function () {
                        location.reload();
                    })
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $.notify("{{trans('lang.error')}}", "error");
                }
            });
        });
        $( "#vi_selected" ).click(function() {
            var postData = {
                "lang": 0
            };
            visionone_ajax({
                url: "/language/change",
                type: "POST",
                data: postData,
                success: function (data, textStatus, jqXHR) {
                    showNotify(data, function () {
                        location.reload();
                    })
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $.notify("{{trans('lang.error')}}", "error");
                }
            });
        });
    };
</script>