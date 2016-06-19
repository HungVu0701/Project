<script type="text/javascript">
    var table_data = "";
    var url_load_data = "";
    var resource_type = "";
    function operateFormatterTable2(value, row, index) {
        if (row['folder_type'] == 'home' || row['folder_type'] == 'public') {
            return;
        }
        return [
            '<a class="edit ml10" href="javascript:void(0)" title="{{trans('lang.edit')}}" data-icon="p"/>'
        ].join('');
    }

    window.operateEvents = {
        'click .edit': function (e, value, row, index) {
            tab = 'project';
            isFormEditShow = true;
            $('button, input[type=submit]').attr('disabled', false);
            $("#editModal").modal('show');
            $("#resource_roles option").remove();

            var seleced_role = [];
            var role_ids = row['roleIds'];
            var arrayRoleIds = role_ids.split(',');
            for (var i = 0; i < arrayRoleIds.length; i++) {
                seleced_role.push(arrayRoleIds[i]);
            }
            resource_type = row['type'];
            if (resource_type == "text_ticker") {
                table_data = "#tb_ticker_permission";
            } else if (resource_type == "campaign") {
                table_data = "#tb_campaign_permission";
            } else if (resource_type == "layout") {
                table_data = "#tb_layout_permission";
            } else if (resource_type == "device") {
                table_data = "#tb_device_permission";
            } else if (resource_type == "content") {
                table_data = "#tb_content_permission";
            }
            $("#editModal #resource_id").val(row['resource_id']);
            visionone_ajax({
                url : "/roles/list?resource_type=" +row['type'],
                type: "GET",
                data: "",
                success: function (data) {
                    showNotify(data, function () {
                        $.each(data.data, function (index, item) {
                            $("#resource_roles").append(
                                    $("<option></option>")
                                            .text(item.name)
                                            .val(item.id)
                            );
                        });
                        $('#resource_roles').selectpicker('val', seleced_role);
                        $("#resource_roles").selectpicker('refresh');
                    });
                }
            });
        }
    };

    visionone_ajax({
        url: "/users/{{$items['user_id']}}/detail",
        type: "GET",
        data: '',
        success: function (data, textStatus, jqXHR) {
            showNotify(data, function () {
                data = data.data[0];
                $('#form-user #email').val(data.email);
                $('#form-user #first_name').val(data.first_name);
                $('#form-user #last_name').val(data.last_name);
                $('#form-user #email').prop('disabled', true);
                var seleced_role = [];
                var role_ids = data.roleIds;
                var arrayRoleIds = null;
                if (role_ids != null) {
                    arrayRoleIds = role_ids.split(',');
                    for (var i = 0; i < arrayRoleIds.length; i++) {
                        seleced_role.push(arrayRoleIds[i]);
                    }
                }
                $("#form-user #list_roles option").remove();

                visionone_ajax({
                    url : "/permissions/list",
                    type: "GET",
                    data: "",
                    success: function (data) {
                        showNotify(data, function () {
                            $.each(data.data, function (index, item) {
                                $("#form-user #list_roles").append(
                                        $("<option></option>")
                                                .text(item.name)
                                                .val(item.id)
                                );
                            });
                            $('#form-user #list_roles').selectpicker('val', seleced_role).selectpicker('refresh');
                        });
                    }
                });

                $('#form-user #activated').append(
                        $("<option></option>") // Yes you can do this.
                                .text("{{trans('lang.on')}}")
                                .val(1)
                ).append(
                        $("<option></option>") // Yes you can do this.
                                .text("{{trans('lang.off')}}")
                                .val(0)
                );
                if (data.activated == 1) {
                    $('#activated').val(1);
                } else {
                    $('#activated').val(0);
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $.notify("{{trans('lang.error')}}", "error");
        }
    });

    $(document).ready(function () {

        refreshTable("#tb_device_permission", "/users/{{$items['user_id']}}/permission?resource_type=device");
        refreshTable("#tb_content_permission", "/users/{{$items['user_id']}}/permission?resource_type=content");
        refreshTable("#tb_layout_permission", "/users/{{$items['user_id']}}/permission?resource_type=layout");
        refreshTable("#tb_campaign_permission", "/users/{{$items['user_id']}}/permission?resource_type=campaign");
        refreshTable("#tb_ticker_permission", "/users/{{$items['user_id']}}/permission?resource_type=text_ticker");

        $('#roles').change(function () {
            var roles = $('#roles').selectpicker('val');
            if (roles != null) {
                for (var i = 0; i < roles.length; i++) {
                    var q = $("#roles option[value=" + roles[0] + "]").text();
                    if (q == "Write Folder") {
                        $('#roles').selectpicker('selectAll');
                    }
                }
            }
        });

        $('#resource_roles').change(function () {
            var roles = $('#resource_roles').selectpicker('val');
            if (roles != null) {
                for (var i = 0; i < roles.length; i++) {
                    var q = $("#resource_roles option[value=" + roles[0] + "]").text();
                    if (q == "Write Folder") {
                        $('#resource_roles').selectpicker('selectAll');
                    }
                }
            }
        });

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
                var postData = $("#form-user").serializeArray();
                var length = postData.length;
                var roles = [];
                for (var i = 0; i < length; i++) {
                    if (postData[i].name == 'list_roles') {
                        roles.push(postData[i].value);
                    }

                }

                var tmp = JSON.stringify(roles);
                console.log(tmp);
                //trim values
                for (var i = 0; i < postData.length; i++) {
                    postData[i].name = postData[i].name;
                    if (postData[i].name == 'userId') {
                        postData[i].value = {{$items['user_id']}};
                    } else if (postData[i].name == 'method') {
                        postData[i].value = 'EDIT';
                    } else {
                        postData[i].value = $.trim(postData[i].value);
                    }
                }

                postData.push({name: 'role_ids', value: tmp});
                postData = $.param(postData);

                validate.resetForm();
                var notifyMsg = '{{trans('lang.edit_user')}}';

                isFormShow = false;
                visionone_ajax({
                    url: "/users/save",
                    type: "POST",
                    data: postData,
                    success: function (data, textStatus, jqXHR) {
                        showNotify(data, function () {
                            $('#save-bt-update, input[type=submit]').attr('disabled', false);
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $.notify("{{trans('lang.error')}}", "error");
                        $('#save-bt-update, input[type=submit]').attr('disabled', false);
                    }
                });
            }
        });
    });

    $('#btn_add_device_permission').click(function () {
        $('#title_select_resource').html("{{trans('lang.devices')}}");
        table_data = "#tb_device_permission";
        resource_type = "device";
        prepareAddRole('device');
    });

    $('#btn_add_content_permission').click(function () {
        $('#title_select_resource').html("{{trans('lang.contents')}}");
        table_data = "#tb_content_permission";
        resource_type = "content";
        prepareAddRole('content');
    });

    $('#btn_add_layout_permission').click(function () {
        $('#title_select_resource').html("{{trans('lang.layouts')}}");
        table_data = "#tb_layout_permission";
        resource_type = "layout";
        prepareAddRole('layout');
    });

    $('#btn_add_campaign_permission').click(function () {
        $('#title_select_resource').html("{{trans('lang.campaigns')}}");
        table_data = "#tb_campaign_permission";
        resource_type = "campaign";
        prepareAddRole('campaign');
    });

    $('#btn_add_ticker_permission').click(function () {
        $('#title_select_resource').html("{{trans('lang.tickers')}}");
        table_data = "#tb_ticker_permission";
        resource_type = "text_ticker";
        prepareAddRole('text_ticker');
    });

    function refreshTable($idTable, $url) {
        $($idTable + ' tbody').html('');
        $($idTable).bootstrapTable('refresh', {
            url: $url
        });
    }

    function prepareAddRole(resource_type) {
        form_add_role.resetForm();
        isFormAddShow = true;
        $("#resource_name option").remove();
        $("#roles option").remove();
        $(".hide-role").show();

        visionone_ajax({
            url : "/roles/list?resource_type=" + resource_type,
            type: "GET",
            data: "",
            success: function (data) {
                showNotify(data, function () {
                    $.each(data.data, function (index, item) {
                        $("#roles").append(
                                $("<option></option>")
                                        .text(item.name)
                                        .val(item.id)
                        );
                    });
                    $("#roles").selectpicker('refresh');
                });
            }
        });

        visionone_ajax({
            url : "/users/{{$items['user_id']}}/not_permission?resource_type=" + resource_type,
            type: "GET",
            data: "",
            success: function (data) {
                showNotify(data, function () {
                    $.each(data.data, function (index, item) {
                        $("#resource_name").append(
                                $("<option></option>")
                                        .text(item.name)
                                        .val(item.id)
                        );
                    });
                    $("#resource_name").selectpicker('refresh');
                });
            }
        });

        $('button').attr('disabled', false);
        $("#addModal").modal('show');
    }

    $(document).ready(function () {
        form_add_role = $("#form-add-role").validate({
            ignore: [],
            rules: {
                resource_name: {required: true},
                roles: {required: true}
            },
            messages: {
                resource_name: {
                    required: '{{ trans('lang.error_required') }}'
                },
                roles: {
                    required: '{{ trans('lang.error_role_required') }}'
                }
            },

            submitHandler: function (form) {
                $('#bt-save-new').attr('disabled', true);
                $('#addModal').modal('hide');
                $('#editModal').modal('hide');
                isFormAddShow = false;
                isFormEditShow = false;
                var postData = $("#form-add-role").serializeArray();
                var length = postData.length;
                var role_is = [];
                var resource_ids = [];
                for (var i = 0; i < length; i++) {
                    if (postData[i].name == 'roles') {
                        role_is.push(postData[i].value);
                    }
                    if (postData[i].name == 'resource_name') {
                        resource_ids.push(postData[i].value);
                    }
                }

                var data_permission = [{name: "user_id", value: {{$items['user_id']}}},
                    {name: "resource_ids", value: JSON.stringify(resource_ids)},
                    {name: "role_ids", value: JSON.stringify(role_is)},
                    {name: "resource_type", value: resource_type}
                    ];
                url_load_data = "/users/{{$items['user_id']}}/permission?resource_type=" + resource_type;
                visionone_ajax({
                    url: "/roles/add_permission",
                    type: "POST",
                    data: data_permission,
                    success: function (data, textStatus, jqXHR) {
                        showNotify(data, function () {
                            refreshTable(table_data, url_load_data);
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $.notify("{{trans('lang.error')}}", "error");
                    }
                });
            }
        });

        form_edit_role = $("#form-edit-role").validate({
            ignore: [],
            rules: {},
            messages: {},

            submitHandler: function (form) {
                $('#bt-save-edit').attr('disabled', true);
                $('#addModal').modal('hide');
                $('#editModal').modal('hide');
                isFormAddShow = false;
                isFormEditShow = false;
                var postData = $("#form-edit-role").serializeArray();
                var length = postData.length;
                var role_is = [];
                var resource_ids = [];
                for (var i = 0; i < length; i++) {
                    if (postData[i].name == 'resource_roles') {
                        role_is.push(postData[i].value);
                    }
                    if (postData[i].name == 'resource_id') {
                        resource_ids.push(postData[i].value);
                    }
                }

                var data_permission = [{name: "user_id", value: {{$items['user_id']}}},
                    {name: "resource_ids", value: JSON.stringify(resource_ids)},
                    {name: "role_ids", value: JSON.stringify(role_is)},
                    {name: "resource_type", value: resource_type}
                    ];
                url_load_data = "/users/{{$items['user_id']}}/permission?resource_type=" + resource_type;
                visionone_ajax({
                    url: "/roles/add_permission",
                    type: "POST",
                    data: data_permission,
                    success: function (data, textStatus, jqXHR) {
                        showNotify(data, function () {
                            refreshTable(table_data, url_load_data);
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