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
        return [
            '<a class="remove ml10" href="javascript:void(0)" title="{{trans('lang.remove')}}" data-icon="#"/>',
            '<a class="using ml10" href="javascript:void(0)" title="{{trans('lang.tenant_using')}}" data-icon="i"/>'
        ].join('');
    }

    function setFocus() {
        document.form - license.save - bt - update.focus();
    }

    window.operateEvents = {
        'click .remove': function (e, value, row, index) {
            isFormDelShow = true;
            $("#delModal #id").val(row['id']);
            $('button, input[type=submit]').attr('disabled', false);
            $('#delModal').modal('show');
        },

        'click .using': function (e, value, row, index) {
            $('#table-tenant-using').bootstrapTable('refresh', {
                url: '/licenses/' + row['id'] + '/using'
            });
            isFormUsingShow = true;
            $('button, input[type=submit]').attr('disabled', false);
            $('#usingModal').modal('show');
        }
    };

    $("#form-delete-license").submit(function (e) {
        var postData = $(this).serializeArray();
        $('#delete-bt, input[type=submit]').attr('disabled', true);
        $('#delModal').modal('hide');
        isFormDelShow = false;
        visionone_ajax({
            url: "/licenses/" + $('#id').val() + "/delete",
            type: "POST",
            data: postData,
            success: function (data, textStatus, jqXHR) {
                showNotify(data, function () {
                    $('#table-license').bootstrapTable('refresh', {
                        url: "/licenses"
                    });
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.notify("{{trans('lang.error')}}", "error");
            }
        });
        e.preventDefault(); //STOP default action
    });


    $(document).ready(function () {
        validateForm = $("#form-license").validate({
            rules: {
                name: {
                    required: {
                        depends: function () {
                            clearTimeout(timer);
                            timer = setTimeout(function () {
                                $("#form-license #name").val($.trim($("#form-license #name").val()));
                            }, time_out);
                            return true;
                        }
                    },
                    maxlength: 100,

                },
                max_device: {
                    required: {
                        depends: function () {
                            return true;
                        }
                    },
                    maxlength: 100,
                    max: 100000,
                    min: 1
                },
                max_user: {
                    required: {
                        depends: function () {
                            return true;
                        }
                    },
                    maxlength: 100,
                    max: 100000,
                    min: 1
                },
                max_project: {
                    required: {
                        depends: function () {
                            return true;
                        }
                    },
                    maxlength: 100,
                    max: 100000,
                    min: 1
                },
                max_store_size: {
                    required: {
                        depends: function () {
                            return true;
                        }
                    },
                    maxlength: 100,
                    max: 100000,
                    min: 1
                },
                max_file_count: {
                    required: {
                        depends: function () {
                            return true;
                        }
                    },
                    maxlength: 100,
                    max: 100000,
                    min: 1
                }
            },
            messages: {
                name: {
                    required: '{{ trans('lang.error_required') }}',
                    maxlength: '{{ trans('lang.error_maxlength') }}'
                },
                max_device: {
                    required: '{{ trans('lang.error_required') }}',
                    max: '{{ trans('notify.visionone_max_device_100000') }}',
                    min: '{{ trans('notify.visionone_max_device_1') }}',
                    maxlength: '{{ trans('lang.error_maxlength') }}'
                },
                max_user: {
                    required: '{{ trans('lang.error_required') }}',
                    max: '{{ trans('notify.visionone_max_user_100000') }}',
                    min: '{{ trans('notify.visionone_max_user_1') }}',
                    maxlength: '{{ trans('lang.error_maxlength') }}'
                },
                max_project: {
                    required: '{{ trans('lang.error_required') }}',
                    max: '{{ trans('notify.visionone_max_project_100000') }}',
                    min: '{{ trans('notify.visionone_max_project_1') }}',
                    maxlength: '{{ trans('lang.error_maxlength') }}'
                },
                max_store_size: {
                    required: '{{ trans('lang.error_required') }}',
                    max: '{{ trans('notify.visionone_max_store_size_100000') }}',
                    min: '{{ trans('notify.visionone_max_store_size_1') }}',
                    maxlength: '{{ trans('lang.error_maxlength') }}'
                },
                max_file_count: {
                    required: '{{ trans('lang.error_required') }}',
                    max: '{{ trans('notify.visionone_max_file_count_100000') }}',
                    min: '{{ trans('notify.visionone_max_file_count_1') }}',
                    maxlength: '{{ trans('lang.error_maxlength') }}'
                }
            },
            submitHandler: function (form) {
                $('#save-bt-update, input[type=submit]').attr('disabled', true);
                $('#editModal').modal('hide');
                var postData = $("#form-license").serializeArray();
                //trim values
                for (var i = 0; i < postData.length; i++) {
                    postData[i].name = postData[i].name;
                    postData[i].value = $.trim(postData[i].value);
                }
                postData = $.param(postData);
                isFormShow = false;
                visionone_ajax({
                    url: "/licenses",
                    type: "POST",
                    data: postData,
                    success: function (data, textStatus, jqXHR) {
                        showNotify(data, function () {
                            $('#table-license').bootstrapTable('refresh', {
                                url: "/licenses"
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

    $('#create-bt').click(function () {
        $('#page-title-edit').hide();
        $('#page-title-create').show();
        validateForm.resetForm();
        $('#form-license')[0].reset();
        $('#max_device').val({{\Config::get('visionone.license_max_device')}});
        $('#max_user').val({{\Config::get('visionone.license_max_user')}});
        $('#max_store_size').val({{\Config::get('visionone.license_max_store_size')}});
        $('#max_file_count').val({{\Config::get('visionone.license_max_file_count')}});
        isFormShow = true;
        $('button, input[type=submit]').attr('disabled', false);
        $("#editModal").modal('show');
    });
</script>