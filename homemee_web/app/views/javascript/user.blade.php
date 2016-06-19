<script type="text/javascript">
    var isFormShow = false;
    var isFormDelShow = false;
    var isFormDetailShow = false;
    document.onkeydown = function (event) {
        if (event.keyCode === 13 && isFormShow) {
            $('#save-bt-update').focus();
        }
        if (event.keyCode === 13 && isFormDelShow) {
            $('#delete-bt').focus();
        }
        if (event.keyCode === 13 && isFormDetailShow) {
            isFormDetailShow = false;
            $('#viewModal').modal('hide')
        }
    };

    function operateFormatter(value, row, index) {
        var actions = [];

        if ("Admin" == user_type) {
            actions.push('<a class="setting ml10" href="javascript:void(0)" title="{{trans('lang.setting')}}" data-icon="x"/>');
            actions.push('<a class="apply_license ml10" href="javascript:void(0)" title="{{trans('lang.apply_license')}}" data-icon="$"/>');

        } else {
            actions.push('<a class="setting ml10" href="/users/' + row['id'] + '/setting" title="{{trans('lang.setting')}}" data-icon="x"/>');
        }

        actions.push('<a class="reset ml10" href="javascript:void(0)" title="{{trans('lang.reset_password')}}" data-icon="1"/>');
        {{--actions.push('<a class="detail ml10" href="javascript:void(0)" title="{{trans('lang.detail')}}" data-icon="i"/>');--}}
        actions.push('<a class="remove ml10" href="javascript:void(0)" title="{{trans('lang.remove')}}" data-icon="#"/>');

        return actions.join('');
    }

    function activatedFormatter(value, row, index) {
        var states = [];
        var label = '<label title="{{trans('lang.disable')}}" data-icon="U" style="color: #474747"/>';
        if (row['activated'] == 1) {
            label = '<label title="{{trans('lang.enable')}}" data-icon="U" style="color: #488DF0"/>';
        }
        states.push(label);
        return states.join('');
    }

    window.operateEvents = {
        'click .setting': function (e, value, row, index) {
            if ("Admin" == user_type) {
                $('#form-user')[0].reset();
                validate.resetForm();
                $('#editModal #page-title-edit').show();
                $('#editModal #page-title-create').hide();

                $("#editModal #method").val('EDIT');
                $("#editModal #userId").val(row['id']);

                $("#form-user #email_tmp").val(row['email']);
                $("#form-user #email").val(row['email']);
                $('#form-user #email').prop('disabled', true);
                $("#activated option").remove();

                $('#form-user #first_name').val(row['first_name']);
                $('#form-user #last_name').val(row['last_name']);

                $("#activated option").remove();
                $('#activated').append(
                        $("<option></option>") // Yes you can do this.
                                .text("{{trans('lang.on')}}")
                                .val(1)
                );
                $('#activated').append(
                        $("<option></option>") // Yes you can do this.
                                .text("{{trans('lang.off')}}")
                                .val(0)
                );
                if (row['activated'] == 1) {
                    $('#activated').val(1);
                } else {
                    $('#activated').val(0);
                }
                isFormShow = true;
                $('button, input[type=submit]').attr('disabled', false);
                $("#editModal").modal('show');
            }
        },

        'click .remove': function (e, value, row, index) {
            isFormDelShow = true;
            $("#delModal #id").val(row['id']);
            $('button, input[type=submit]').attr('disabled', false);
            $('#delModal').modal('show');
        },

        'click .reset': function (e, value, row, index) {
            $("#resetPassModal #id_reset").val(row['id']);
            $('button, input[type=submit]').attr('disabled', false);
            $('#resetPassModal').modal('show');
        },

        'click .detail': function (e, value, row, index) {
            visionone_ajax({
                url: "/users/" + row['id'] + "/detail",
                type: "GET",
                data: '',
                success: function (data, textStatus, jqXHR) {
                    showNotify(data, function () {
                        data = data.data;
                        $('#form-view-user #view_email').val(data.email);
                        if (data.activated == 1) {
                            $('#form-view-user #view_activated').val("{{trans('lang.on')}}");
                        } else {
                            $('#form-view-user #view_activated').val("{{trans('lang.off')}}");
                        }

                        $('#form-view-user #view_first_name').val(data.first_name);
                        $('#form-view-user #view_last_name').val(data.last_name);
                        $('#form-view-user #view_created_at').val(data.created_at);
                        $('#form-view-user #view_updated_at').val(data.updated_at);

                        $('#form-view-user #view_email').prop('disabled', true);
                        $('#form-view-user #view_activated').prop('disabled', true);
                        $('#form-view-user #view_first_name').prop('disabled', true);
                        $('#form-view-user #view_last_name').prop('disabled', true);
                        $('#form-view-user #view_created_at').prop('disabled', true);
                        $('#form-view-user #view_updated_at').prop('disabled', true);
                        isFormDetailShow = true;
                        $('button, input[type=submit]').attr('disabled', false);
                        $('#viewModal').modal('show');
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $.notify("{{trans('lang.error')}}", "error");
                }
            });
        }, 'click .apply_license': function (e, value, row, index) {
            $('#form-apply-license')[0].reset();
            $("#apply_license_id option").remove();
            $("#license_duration option").remove();
            tenant_id = row["id"];
            isFormApplyShow = true;
            $("#applyModal #manager_id").val(row['id']);
            $("#applyModal #name").val(row['email']);
            $("#applyModal #current_expire_date").val(row['expire_date']);
            $("#applyModal #license_data").val(row['license_data']);
            $("#applyModal #current_license_data").val(row['license_current_data']);

            $("#applyModal #name").prop('disabled', true);
            $("#applyModal #current_expire_date").prop('disabled', true);
            $("#applyModal #license_data").prop('disabled', true);
            $("#applyModal #current_license_data").prop('disabled', true);

            $("#license_duration").append(
                    $("<option></option>")
                            .text("")
                            .val(0)
            ).append(
                    $("<option></option>")
                            .text("{{trans('lang.one_week')}}")
                            .val(7)
            ).append(
                    $("<option></option>")
                            .text("{{trans('lang.one_month')}}")
                            .val(30)
            ).append(
                    $("<option></option>")
                            .text("{{trans('lang.three_months')}}")
                            .val(90)
            ).append(
                    $("<option></option>")
                            .text("{{trans('lang.six_months')}}")
                            .val(180)
            ).append(
                    $("<option></option>")
                            .text("{{trans('lang.one_year')}}")
                            .val(365)
            );
            $('button, input[type=submit]').attr('disabled', false);
            $('#applyModal').modal('show');
            visionone_ajax({
                url: "/licenses",
                type: "GET",
                data: null,
                success: function (data, textStatus, jqXHR) {
                    showNotify(data, function () {
                        $.each(data.data, function (index, item) { // Iterates through a collection
                            $("#apply_license_id").append( // Append an object to the inside of the select box
                                    $("<option></option>") // Yes you can do this.
                                            .text(item.name)
                                            .val(item.id)
                                            .attr("max_device", item.max_device)
                                            .attr("max_user", item.max_user)
                                            .attr("max_store_size", item.max_store_size)
                                            .attr("max_file_count", item.max_file_count)
                            );
                            if (item.id == row['license_id']) {
                                $("#applyModal #current_license_name").val(item.name);
                            }
                            $("#applyModal #current_license_name").prop('disabled', true);
                        });
                        $('#applyModal #loading-license').hide();
                        $('#apply_license_id').val(row['license_id']);
                        loadManagerInfo();
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $.notify("{{trans('lang.error')}}", "error");
                }
            });
        }
    };

    $("#form-delete_user").submit(function (e) {
        $('#delete-bt, input[type=submit]').attr('disabled', false);
        $('#delModal').modal('hide');
        isFormDelShow = false;

        visionone_ajax({
            url: "/users/" + $('#id').val() + "/delete",
            type: "POST",
            data: "",
            success: function (data, textStatus, jqXHR) {
                showNotify(data, function () {
                    $('#table-user').bootstrapTable('refresh', {
                        url: "/users/list"
                    });
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.notify("{{trans('lang.error')}}", "error");
            }
        });
        e.preventDefault(); //STOP default action
    });

    $("#form-reset-password").submit(function (e) {
        $('#reset-pass-bt, input[type=submit]').attr('disabled', false);
        $('#resetPassModal').modal('hide');
        isFormDelShow = false;

        visionone_ajax({
            url: "/users/" + $('#id_reset').val() + "/reset_password",
            type: "POST",
            data: "",
            success: function (data, textStatus, jqXHR) {
                showNotify(data, function () {
                    $('#table-user').bootstrapTable('refresh', {
                        url: "/users/list"
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
        validate = $("#form-user").validate({
            rules: {
                email: {
                    required: true,
                    maxlength: 100,
                    email: true
                },
                first_name: {
                    required: {
                        depends: function () {
                            clearTimeout(timer);
                            timer = setTimeout(function () {
                                $("#form-tenant #first_name").val($.trim($("#form-tenant #first_name").val()));
                            }, time_out);
                            return true;
                        }
                    },
                    maxlength: 100
                },
                last_name: {
                    required: {
                        depends: function () {
                            clearTimeout(timer);
                            timer = setTimeout(function () {
                                $("#form-tenant #last_name").val($.trim($("#form-tenant #last_name").val()));
                            }, time_out);
                            return true;
                        }
                    },
                    maxlength: 100
                }
            },
            messages: {
                email: {
                    required: '{{ trans('lang.error_required') }}',
                    maxlength: '{{ trans('lang.error_maxlength') }}',
                    email: '{{trans('lang.error_email')}}'
                },
                first_name: {
                    required: '{{ trans('lang.error_required') }}',
                    maxlength: '{{ trans('lang.error_maxlength') }}'
                },
                last_name: {
                    required: '{{ trans('lang.error_required') }}',
                    maxlength: '{{ trans('lang.error_maxlength') }}'
                }
            },

            submitHandler: function (form) {
                $('#save-bt-update, input[type=submit]').attr('disabled', true);
                $('#editModal').modal('hide');
                var postData = $("#form-user").serializeArray();
                var length = postData.length;
                var roles = [];
                for (var i = 0; i < length; i++) {
                    if (postData[i].name == 'list_roles') {
                        roles.push(postData[i].value);
                    }
                }

                var tmp = JSON.stringify(roles);
                //trim values
                for (var i = 0; i < postData.length; i++) {
                    postData[i].name = postData[i].name;
                    postData[i].value = $.trim(postData[i].value);
                }

                postData.push({name: 'role_ids', value: tmp});
                postData = $.param(postData);

                validate.resetForm();
                var notifyMsg = "";
                if ($("#form-user #method").val() == "CREATE") {
                    notifyMsg = '{{trans('lang.create_user')}}';
                } else {
                    notifyMsg = '{{trans('lang.edit_user')}}';
                }

                isFormShow = false;
                visionone_ajax({
                    url: "/users/save",
                    type: "POST",
                    data: postData,
                    success: function (data, textStatus, jqXHR) {
                        showNotify(data, function () {
                            $('#save-bt-update, input[type=submit]').attr('disabled', false);
                            $('#table-user').bootstrapTable('refresh', {
                                url: "/users/list"
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
        $('#editModal #page-title-edit').hide();
        $('#editModal #page-title-create').show();
        $('#form-user')[0].reset();
        validate.resetForm();
        $("#editModal #method").val('CREATE');
        $('#form-user #email').prop('disabled', false);
        $("#activated option").remove();

        $('#activated').append(
                $("<option></option>") // Yes you can do this.
                        .text("{{trans('lang.on')}}")
                        .val(1)
        );
        $('#activated').append(
                $("<option></option>") // Yes you can do this.
                        .text("{{trans('lang.off')}}")
                        .val(0)
        );
        @if(Session::get('user_type') == 'SubAdmin')
            $("#list_roles option").remove();
//            $.getJSON("/permissions/list", null, function (data) {
//                showNotify(data, function () {
//                    $.each(data.data, function (index, item) {
//                        $("#list_roles").append(
//                                $("<option></option>")
//                                        .text(item.name)
//                                        .val(item.id)
//                        );
//                    });
//                    $("#list_roles").selectpicker('refresh');
//                });
//            });

            visionone_ajax({
                url: "/permissions/list",
                type: "GET",
                data: "",
                success: function (data) {
                    showNotify(data, function () {
                        $.each(data.data, function (index, item) {
                            $("#list_roles").append(
                                    $("<option></option>")
                                            .text(item.name)
                                            .val(item.id)
                            );
                        });
                        $("#list_roles").selectpicker('refresh');
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $.notify("{{trans('lang.error')}}", "error");
                }
            });
        @endif
        isFormShow = true;
        $('button, input[type=submit]').attr('disabled', false);
        $("#editModal").modal('show');
    });

@if(Session::get('user_type') == 'Admin')

    $("#form-apply-license").submit(function (e) {
        $('#save-bt-update, input[type=submit]').attr('disabled', true);
        $('#applyModal').modal('hide');
        isFormApplyShow = false;
        var postData = $("#form-apply-license").serializeArray();
        var licenseId = null;
        for (var i = 0; i < postData.length; i++) {
            postData[i].name = postData[i].name;
            postData[i].value = $.trim(postData[i].value);
            if (postData[i].name == 'manager_id') {
                manager_id = $.trim(postData[i].value);
            }
        }
        visionone_ajax({
            url: "/manager/" + tenant_id + "/update_license",
            type: "POST",
            data: postData,
            success: function (data, textStatus, jqXHR) {
                showNotify(data, function () {
                    $('#table-user').bootstrapTable('refresh', {
                        url: "/users/list"
                    });
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.notify("{{trans('lang.error')}}", "error");
            }
        });
        e.preventDefault(); //STOP default action
    });

    $("#apply_license_id").on('change', function () {
        genManagerInfoChart();
    });

    function loadManagerInfo() {
        visionone_ajax({
            url: "/users/" + tenant_id + "/detail",
            type: "GET",
            data: null,
            success: function (data, textStatus, jqXHR) {
                showNotify(data, function () {
                    tenantInfo = data.data[0];
                    genManagerInfoChart();
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.notify("{{trans('lang.error')}}", "error");
            }
        });
    }

    function genManagerInfoChart() {
        if (tenantInfo != null && tenantInfo.current_license_data != null && tenantInfo.license_data != null) {
            var current_license_data = JSON.parse(tenantInfo.current_license_data);
            var license_data = JSON.parse(tenantInfo.license_data);
            var userUsed = 0, userFree = 0;
            var deviceUsed = 0, deviceFree = 0;
            var storeUsed = 0, storeFree = 0;
            var fileUsed = 0, fileFree = 0;
            var userUsedPer = 0, fileUsedPer = 0, deviceUsedPer = 0, storageUsedPer = 0;

            var current_license = $("#apply_license_id option:selected");

            userUsed = current_license_data.curr_user;
            userFree = Number(current_license.attr("max_user")) - userUsed;
            if (Number(current_license.attr("max_user")) != 0) {
                userUsedPer = userUsed / Number(current_license.attr("max_user")) * 100;
            }

            deviceUsed = current_license_data.curr_device;
            deviceFree = Number(current_license.attr("max_device")) - deviceUsed;
            if (Number(current_license.attr("max_device")) != 0) {
                deviceUsedPer = deviceUsed / Number(current_license.attr("max_device")) * 100;
            }

            storeUsed = current_license_data.curr_store_size;
            storeFree = Number(current_license.attr("max_store_size")) - storeUsed;
            if (Number(current_license.attr("max_store_size")) != 0) {
                storageUsedPer = storeUsed / Number(current_license.attr("max_store_size")) * 100;
            }

            fileUsed = current_license_data.curr_file_count;
            fileFree = Number(current_license.attr("max_file_count")) - fileUsed;
            if (Number(current_license.attr("max_file_count")) != 0) {
                fileUsedPer = fileUsed / Number(current_license.attr("max_file_count")) * 100;
            }

            $('#storage_used').css('width', '' + storageUsedPer + '%').prop('title', '' + storeUsed).removeClass()
                    .addClass("progress-bar").addClass(getClassForProgressBar(storageUsedPer));
            $('#storage_free').css('width', '' + (100 - storageUsedPer) + '%').prop('title', '' + storeFree);

            $('#file_used').css('width', '' + fileUsedPer + '%').prop('title', '' + fileUsed).removeClass()
                    .addClass("progress-bar").addClass(getClassForProgressBar(fileUsedPer));
            $('#file_free').css('width', '' + (100 - fileUsedPer) + '%').prop('title', '' + fileFree);

            $('#device_used').css('width', '' + deviceUsedPer + '%').prop('title', '' + deviceUsed).removeClass()
                    .addClass("progress-bar").addClass(getClassForProgressBar(deviceUsedPer));
            $('#device_free').css('width', '' + (100 - deviceUsedPer) + '%').prop('title', '' + deviceFree);

            $('#user_used').css('width', '' + userUsedPer + '%').prop('title', '' + userUsed).removeClass()
                    .addClass("progress-bar").addClass(getClassForProgressBar(userUsedPer));
            $('#user_free').css('width', '' + (100 - userUsedPer) + '%').prop('title', '' + userFree);
        }
    }

    function getClassForProgressBar(value) {
        if (value > 80) {
            return "progress-bar-danger";
        } else if (value > 60) {
            return "progress-bar-warning";
        } else {
            return "progress-bar-info";
        }
    }

    @endif
</script>