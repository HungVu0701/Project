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

    function operateFormatter(value, row, index) {
        var actions = [];
        if (row['state'] == 'new') {
            actions.push('<a class="publish ml10" href="javascript:void(0)" title="{{trans('lang.publish')}}"><i class="fa fa-check" aria-hidden="true"></i> </a>');
        } else if (row['state'] == 'publish') {
            actions.push('<a class="sms ml10" href="javascript:void(0)" title="{{trans('lang.send_sms')}}"><i class="fa fa-paper-plane" aria-hidden="true"></i> </a>');
        }
        return actions.join('');
    }

    function setFocus() {
        document.form - license.save - bt - update.focus();
    }

    window.operateEvents = {
        'click .publish': function (e, value, row, index) {
            isFormSmsShow = true;
            console.log(row);
            console.log(row['id']);
            $("#publishModal #id").val(row['id']);
            $('button, input[type=submit]').attr('disabled', false);
            $('#publishModal').modal('show');
        },
        'click .sms': function (e, value, row, index) {
            isFormSmsShow = true;
            $("#smsModal #id").val(row['id']);
            $('button, input[type=submit]').attr('disabled', false);
            $('#smsModal').modal('show');
        }
    };

    $("#form-publish-inform").submit(function (e) {
        var postData = $(this).serializeArray();
        $('#publish-bt, input[type=submit]').attr('disabled', true);
        $('#publishModal').modal('hide');
        isFormDelShow = false;
        visionone_ajax({
            url: "/fees/" + $('#publishModal #id').val() + "/publish",
            type: "POST",
            data: postData,
            success: function (data, textStatus, jqXHR) {
                showNotify(data, function () {
                    $('#table-fees').bootstrapTable('refresh', {
                        url: "/fees"
                    });
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.notify("{{trans('lang.error')}}", "error");
            }
        });
        e.preventDefault(); //STOP default action
    });

    $("#form-sms-inform").submit(function (e) {
        var postData = $(this).serializeArray();
        $('#send-sms-bt, input[type=submit]').attr('disabled', true);
        $('#smsModal').modal('hide');
        isFormDelShow = false;
        visionone_ajax({
            url: "/fees/" + $('#smsModal #id').val() + "/sms",
            type: "POST",
            data: postData,
            success: function (data, textStatus, jqXHR) {
                showNotify(data, function () {
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.notify("{{trans('lang.error')}}", "error");
            }
        });
        e.preventDefault(); //STOP default action
    });

    $('#upload_fee_list_id').click(function () {
        $('button, input[type=submit]').attr('disabled', false);
        $('#form_upload_list_fee')[0].reset();
//        validate1.resetForm();
        $("#uploadFeeListModal").modal('show');
    });
    $(document).ready(function () {
        validate1 = $('#form_upload_list_fee').validate({
            rules: {
                fee_list: {
                    required: true
                }
            },
            messages: {
                fee_list: {
                    required: '{{ trans('lang.error_required') }}'
                }
            },

            submitHandler: function (form) {
//                $('button, input[type=submit]').attr('disabled', true);
                $('#uploadFeeListModal').modal('hide');
                var postData = new FormData($("#form_upload_list_fee")[0]);
                visionone_ajax({
                    url: "/fees/postFees",
                    type: "POST",
                    data: postData,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data, textStatus, jqXHR) {
                        showNotify(data, function () {
                            $('#table-fees').bootstrapTable('refresh', {
                                url: "/fees"
                            });
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $.notify("{{trans('lang.error')}}", "error");
                    }
                });
            }
        });

    });
</script>