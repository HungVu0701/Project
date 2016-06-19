<script type="application/javascript">
    function render() {
        visionone_ajax({
            url: "/tenants/" + {{Session::get('tenant_id')}} + "/detail",
            type: "GET",
            data: '',
            success: function (data, textStatus, jqXHR) {
                showNotify(data, function () {
                    data = data.data[0];
                    $('#form-view-tenant #manager_name').text(data.manager_name);
                    $('#form-view-tenant #alias').text(data.alias);
                    $('#form-view-tenant #license').text(data.license);
                    $('#form-view-tenant #expire_date').text(data.expire_date);
                    $('#form-view-tenant #description').text(data.description);
                    $('#form-view-tenant #name').text(data.name);
                    if (data.state == 1) {
                        $('#form-view-tenant #state').text("{{trans('lang.on')}}");
                    } else {
                        $('#form-view-tenant #state').text("{{trans('lang.off')}}");
                    }
                    $('#form-view-tenant #created_at').text(data.created_at);
                    $('#form-view-tenant #updated_at').text(data.updated_at);

                    var projectUsed = 0, projectFree = 0;
                    var userUsed = 0, userFree = 0;
                    var deviceUsed = 0, deviceFree = 0;
                    var storeUsed = 0, storeFree = 0;
                    var fileUsed = 0, fileFree = 0;
                    var projectClass = "progress-bar-info";
                    var userClass = "progress-bar-info";
                    var deviceClass = "progress-bar-info";
                    var storeClass = "progress-bar-info";
                    var fileClass = "progress-bar-info";

                    var projectUsedPer = 0, userUsedPer = 0, fileUsedPer = 0, deviceUsedPer = 0, storageUsedPer = 0;

                    if (data.current_license_data != null && data.license_data != null) {
                        var current_license_data = JSON.parse(data.current_license_data);
                        var license_data = JSON.parse(data.license_data);

                        projectUsed = current_license_data.curr_project;
                        projectFree = license_data.max_project - projectUsed;
                        if (license_data.max_project != 0) {
                            projectUsedPer = projectUsed / license_data.max_project * 100;
                            if (projectUsedPer > 80) {
                                projectClass = "progress-bar-danger";
                            } else if (projectUsedPer > 60) {
                                projectClass = "progress-bar-warning";
                            }
                        }

                        userUsed = current_license_data.curr_user;
                        userFree = license_data.max_user - userUsed;
                        if (license_data.max_user != 0) {
                            userUsedPer = userUsed / license_data.max_user * 100;
                            if (userUsedPer > 80) {
                                userClass = "progress-bar-danger";
                            } else if (userUsedPer > 60) {
                                userClass = "progress-bar-warning";
                            }
                        }

                        deviceUsed = current_license_data.curr_device;
                        deviceFree = license_data.max_device - deviceUsed;
                        if (license_data.max_device != 0) {
                            deviceUsedPer = deviceUsed / license_data.max_device * 100;
                            if (deviceUsedPer > 80) {
                                deviceClass = "progress-bar-danger";
                            } else if (deviceUsedPer > 60) {
                                deviceClass = "progress-bar-warning"
                            }
                        }

                        storeUsed = current_license_data.curr_store_size;
                        storeFree = license_data.max_store_size - storeUsed;
                        if (license_data.max_store_size != 0) {
                            storageUsedPer = storeUsed / license_data.max_store_size * 100;
                            if (storageUsedPer > 80) {
                                storeClass = "progress-bar-danger";
                            } else if (storageUsedPer > 60) {
                                storeClass = "progress-bar-warning";
                            }
                        }

                        fileUsed = current_license_data.curr_file_count;
                        fileFree = license_data.max_file_count - fileUsed;
                        if (license_data.max_file_count != 0) {
                            fileUsedPer = fileUsed / license_data.max_file_count * 100;
                            if (fileUsedPer > 80) {
                                fileClass = "progress-bar-danger";
                            } else if (fileUsedPer > 60) {
                                fileClass = "progress-bar-warning";
                            }
                        }

                        $('#project_used').css('width', ''+projectUsedPer+'%').prop('title',''+projectUsed).removeClass().addClass("progress-bar").addClass(projectClass);
                        $('#project_free').css('width', ''+(100-projectUsedPer)+'%').prop('title',''+projectFree);
                        $('#file_used').css('width', ''+fileUsedPer+'%').prop('title',''+fileUsed).removeClass().addClass("progress-bar").addClass(fileClass);
                        $('#file_free').css('width', ''+(100 - fileUsedPer)+'%').prop('title',''+fileFree);
                        $('#device_used').css('width', ''+deviceUsedPer+'%').prop('title',''+deviceUsed).removeClass().addClass("progress-bar").addClass(deviceClass);
                        $('#device_free').css('width', ''+(100 - deviceUsedPer)+'%').prop('title',''+deviceFree);
                        $('#user_used').css('width', ''+userUsedPer+'%').prop('title',''+userUsed).removeClass().addClass("progress-bar").addClass(userClass);
                        $('#user_free').css('width', ''+(100 - userUsedPer)+'%').prop('title',''+userFree);
                        $('#storage_used').css('width', ''+storageUsedPer+'%').prop('title',''+storeUsed+' GB').removeClass().addClass("progress-bar").addClass(storeClass);
                        $('#storage_free').css('width', ''+(100 - storageUsedPer)+'%').prop('title',''+storeFree+' GB');
                        $('#chart').show();
                    } else {
                        $('#chart').hide();
                    }
                    $('button, input[type=submit]').attr('disabled',false);
                    $('#viewModal').modal('show');
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.notify("{{trans('lang.error')}}", "error");
            }
        });
    }

    render();
</script>