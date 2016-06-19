<script type="text/javascript">
    var isFormShow = false;
    var isFormDelShow = false;
    var isFormUsingShow = false;
    document.onkeydown = function (event) {
        if (event.keyCode === 13 && isFormShow) {
            $('#save-bt-update').focus();
        }
        if (event.keyCode === 13 && isFormDelShow) {
            $('#delete-bt').focus();
        }
        if (event.keyCode === 13 && isFormUsingShow) {
            isFormUsingShow = false;
            $('#viewModal').modal('hide')
        }
    };

    $("#description").keypress(function () {
        isFormShow = false;
    });

    $("#description").blur(function () {
        isFormShow = true;
    });

    function operateFormatterForType(value, row, index) {
        if (row['type'] == 'apartment_member') {
            return '<i class="fa fa-home" aria-hidden="true"></i>';
        } else if (row['type'] == 'resident') {
            return '<i class="fa fa-user" aria-hidden="true"></i>';
        }
    }

    function operateFormatter(value, row, index) {
        var actions = [];
        actions.push('<a class="detail ml10" href="javascript:void(0)" title="{{trans('lang.detail')}}"><i class="fa fa-tasks" aria-hidden="true"></i> </a>');
        return actions.join('');
    }

    function setFocus() {
        document.form - license.save - bt - update.focus();
    }

    window.operateEvents = {
        'click .detail': function (e, value, row, index) {
            $.notify("{{trans('lang.coming_soon')}}", "success");
        }
    };
</script>